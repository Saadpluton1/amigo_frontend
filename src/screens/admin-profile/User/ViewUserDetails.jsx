import React from "react";
import { AdminSideBar , Loader } from "../../../components";
import imageUrl from "utils/ImageUrl";
import _api from "../../../services/_api"
import { useQuery } from "@tanstack/react-query";
import {useParams} from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function CreateUser() {

    const param = useParams();
    const userId = param.id;

    const { data, isLoading, error, isFetching, refetch } = useQuery(['getUser'], () => _api.getOneUser(userId))
    const user = data?.data || [];

    const apiLoading = isLoading || isFetching;

    return (
        <>
        <AdminSideBar />
        <section
            id="artist-profile"
            style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
        >
            <h1 style={{ marginLeft: 540 }}>View User Details</h1>
            <div style={{ marginLeft: 300, marginRight: 100, overflow: "auto", maxHeight: "410px" }} >

                {apiLoading ? <><h1 style={{ marginLeft: 10, marginTop: 100 }}><Loader></Loader></h1></> : <>
                    <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
                        <thead>
                            <tr >
                                <th>No.</th>
                                <th>Profile</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Country</th>
                                <th>Discription</th>
                                <th>CreatedAt</th>
                            </tr>
                        </thead>
                        
                        <tbody>

                            {user ? (
                                     <>
                                        <tr style={{ textAlign: 'center' }}>
                                            <td>{1}</td>
                                            <td>
                  <img src={user?.image == null ? imageUrl('noimage.png') : user?.image} height="60px" width="110px" alt={user?.name} />
                  </td>
                                            <td >{user?.email}</td>
                                            <td>{user?.name}</td>
                                            <td>{user?.gender}</td>
                                            <td>{user?.country}</td> 
                                            <td>{user?.description}</td>
                                            <td>{user?.createdAt}</td>
                                        </tr>
                                    </>
                            
                            ) : (
                                <tr>
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

export default CreateUser;
