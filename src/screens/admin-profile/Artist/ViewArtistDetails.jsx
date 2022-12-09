import React from "react";
import { AdminSideBar, Loader } from "../../../components";
import imageUrl from "utils/ImageUrl";
import _api from "../../../services/_api"
import { useQuery } from "@tanstack/react-query";
import {useParams} from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { useEffect } from "react";

function ViewArtist() {

    const param = useParams();
    const artistId = param.id;

    const { data, isLoading, error, isFetching, refetch } = useQuery(['getArtist'], () => _api.getOneArtists(artistId))
    const artist = data?.data?.artist || [];    
    const apiLoading = isLoading || isFetching;

    useEffect(()=>{
        refetch()
      },[])


    return (
        <>
        <AdminSideBar />
        <section
            id="artist-profile"
            style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
        >
            <h1 style={{ marginLeft: 540 }}>View Artist Details</h1>
            <div style={{ marginLeft: 300, marginRight: 100, overflow: "auto", maxHeight: "410px" }} >

                {apiLoading ? <><h1 style={{ paddingLeft: 10, paddingTop: 100 }}><Loader></Loader></h1></> : <>
                    <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Profile</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Country</th>
                                <th>Description</th>
                                <th>totalLikes</th>
                                <th>totalComments</th>
                                <th>totalShares</th>
                                <th>CreatedAt</th>
                            </tr>
                        </thead>
                        <tbody>

                        {artist ? (
                                     <>
                                        <tr style={{ textAlign: 'center' }}>
                                            <td>{1}</td>
                                            <td>
                  <img src={artist?.image == null ? imageUrl('noimage.png') : artist?.image} height="60px" width="110px" alt={artist?.name} />
                  </td>
                                            <td >{artist?.email}</td>
                                            <td>{artist?.name}</td>
                                            <td>{artist?.gender}</td>
                                            <td>{artist?.country}</td>
                                            <td>{artist?.description}</td>
                                            <td>{artist?.totalLikes}</td>
                                            <td>{artist?.totalComments}</td>
                                            <td>{artist?.totalShares}</td>
                                            <td>{artist?.createdAt}</td>
                                        </tr>
                                    </>
                            
                            ) : (
                                <tr>
                                    <td colSpan={7}>No User</td>
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

export default ViewArtist;
