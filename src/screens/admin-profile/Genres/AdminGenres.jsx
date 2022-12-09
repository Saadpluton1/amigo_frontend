import React from "react";
import { Header, AdminSideBar, Loader } from "../../../components";
import imageUrl from "utils/ImageUrl";
import { useState } from "react";
import _api from "../../../services/_api"
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function AdminGenres() {

    const { data: genreData, isLoading, error: genreError, refetch } = useQuery(['getGenre'], () => _api.getGenreAdmin())
    const genres = genreData?.data || [];
    const { mutate, isLoading: isLoadingSuspend } = useMutation(_api.genreSuspend, {
        onError: function (error) {
            toast.error(error.toString())
        },
        onSuccess: ({ data }) => {
            if (data.status) {
                toast.success(data.message)
                refetch()
            } else {
            }
        },
    });
    const suspendGenre = (id) => {
        mutate(id)
    }
    return (
        <>
            <AdminSideBar />
            <section
                id="artist-profile"
                style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
            >
                <h1 style={{ paddingLeft: 530 }} >Genres Management</h1>

                <div style={{ paddingLeft: 650 }}>
                    <Button as={Link} to={`/admin-addgenres`} variant="outline-light">Add Genres</Button>
                </div>
                <div style={{ marginTop: 20, marginLeft: 300, marginRight: 100, overflow: "auto", maxHeight: "410px" }} >

                    {isLoading ? <><h1 style={{ marginLeft: 10, marginTop: 100 }}><Loader></Loader></h1></> : <>
                        <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
                            <thead>
                                <tr >

                                    <th>No.</th>
                                    <th>Image</th>
                                    <th>Genre</th>
                                    <th>CreatedAt</th>
                                    <th>Suspend</th>
                                </tr>
                            </thead>
                            <tbody>

                                {genres.length > 0 ? (
                                    genres.map((item, i) => (
                                        <>
                                            <tr key={item.id} style={{ textAlign: 'center' }}>
                                                <td  >{i + 1}</td>
                                                <td>
                                                    <img src={item?.image == null ? imageUrl('noimage.png') : item?.image} height="60px" width="110px" alt={"Image"} />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.createdAt}</td>
                                                <td>
                                                    {item.isSuspend === true ? <><Button variant="outline-success" onClick={() => { suspendGenre(item._id) }}>Disabled</Button>{'  '}</> : <>  <Button variant="outline-danger" onClick={() => { suspendGenre(item._id) }}>Enabled</Button>{'  '}
                                                    </>}

                                                </td>
                                            </tr>
                                        </>
                                    ))
                                ) : (
                                    <tr  style={{ textAlign: 'center' }} >
                                        <td colSpan={7}>No Genre</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </>}
                </div>
            </section>

        </>
    );

}

export default AdminGenres;
