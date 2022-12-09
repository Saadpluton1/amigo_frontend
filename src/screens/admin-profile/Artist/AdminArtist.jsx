import React from "react";
import { AdminSideBar, Loader } from "../../../components";
import imageUrl from "utils/ImageUrl";
import _api from "../../../services/_api"
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function AdminArtist() {
    const { data, isLoading, error, isFetching, refetch } = useQuery(['getUser'], () => _api.getArtists())
    const artist = data?.data?.artist || [];
    const { mutate, isLoading: isLoadingSuspend } = useMutation(_api.artistSuspend, {
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
    const { mutate : mutateFeature, isLoading: isLoadingFeature } = useMutation(_api.featureArtist, {
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
    const suspendArtist = (id) => {
        mutate(id)
    }
    const featureArtist = (id) => {
        mutateFeature(id)
    }
    return (
        <>
            <AdminSideBar />
            <section
                id="artist-profile"
                style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
            >
                <h1 style={{ marginLeft: 520 }}>Artist Managements</h1>
                <div style={{ paddingLeft: 630 }}>
                    <Button as={Link} to={`/admin-addArtist`} variant="outline-light">Add Artist</Button>
                </div>
                <div style={{ marginLeft: 300, marginRight: 100,marginTop : 14, overflow: "auto", maxHeight: "410px" }} >

                    {isLoading ? <><h1 style={{ marginLeft: 10, marginTop: 100 }}><Loader></Loader></h1></> : <>
                        <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
                            <thead>
                                <tr >

                                    <th>No.</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>CreatedAt</th>
                                    <th>Suspend</th>
                                    <th>Home View Feature</th>
                                    <th>View Details</th>
                               
                                </tr>
                            </thead>
                            <tbody>

                                {artist.length > 0 ? (
                                    artist.map((item, i) => (
                                        <>
                                            <tr key={item.id} style={{ textAlign: 'center' }}>
                                                <td  >{i + 1}</td>
                                                <td  >{item.email}</td>
                                                <td >{item.name}</td>
                                                <td >{item.createdAt}</td>
                                                <td>
                                                    {item.isSuspend === true ? <><Button variant="outline-success" onClick={() => { suspendArtist(item._id) }}>Disabled</Button>{'  '}</> 
                                                    : <>  <Button variant="outline-danger" onClick={() => { suspendArtist(item._id) }}>Enabled</Button>{'  '}
                                                    </>}

                                                </td>
                                                <td>
                                                    {item.isFeatured === true ? <><Button variant="outline-success" onClick={() => { featureArtist(item._id) }}>Disabled</Button>{'  '}</> : 
                                                    <>
                                                      <Button variant="outline-danger" onClick={() => { featureArtist(item._id) }}>Enabled</Button>{'  '}
                                                    </>}
                                                </td>
                                                <td>
                                                   <Button as={Link} to={`/admin-artistprofile/${item._id}`} variant="outline-info">
                                                        View
                                                    </Button>
                                                </td>
                                                
                                            </tr>
                                        </>
                                    ))
                                ) : (
                                    <tr style={{ textAlign: 'center' }} >
                                        <td colSpan={7}>No Artist</td>
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

export default AdminArtist;
