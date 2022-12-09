import React from "react";
import { AdminSideBar, Loader, AddPlayListModal } from "../../../components";
import imageUrl from "utils/ImageUrl";
import { useState } from "react";
import _api from "../../../services/_api"
import { useQuery } from "@tanstack/react-query";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";

function AdminPlaylist() {
    const { data, isLoading, error, isRefetching, refetch } = useQuery(['getPlaylist'], () => _api.getPlaylistAdmin())
    const playlist = data?.data.playLists || [];
    const [userId, setUserId] = useState('');
    const [modelOpen, setModalOpen] = useState(false);
    const openModal = (userId) => {
        setModalOpen(true)
        setUserId(userId)
    }
    const { mutate, isLoading: isLoadingSuspend } = useMutation(_api.playlistSuspend, {
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
    const suspendPlaylist = (id) => {
        mutate(id)
    }
    return (
        <>
            <AdminSideBar />
            <section
                id="artist-profile"
                style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
            >
                <h1 style={{ marginLeft: 500 }}>Playlist Managements</h1>

                <div style={{ paddingLeft: 630, paddingBottom: 10 }}>
                    <Button variant="outline-light" onClick={() => { openModal(!modelOpen) }}>Add Playlist</Button>
                </div>
                <div style={{ marginLeft: 300, marginRight: 100, overflowY: "auto", maxHeight: "410px" }} >

                    {isLoading ? <><h1 style={{ marginLeft: 10, marginTop: 100 }}><Loader></Loader></h1></> : <>
                        <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
                            <thead>
                                <tr>
                                    <th >No.</th>
                                    <th >Suspend</th>
                                    <th >Image</th>
                                    <th >Title</th>
                                    <th >Artist Name</th>
                                    <th >totalLikes</th>
                                    <th >totalComments</th>
                                    <th >totalShares</th>
                                    <th >Genre</th>
                                    <th >CreatedAt</th>
                                    
                                </tr>
                            </thead>
                            <tbody>

                                {playlist.length > 0 ? (
                                    playlist.map((item, i) => {
                                        return (
                                            <>
                                                <tr key={item.id} style={{ textAlign: 'center' }} >
                                                    <td  >{i + 1}</td>
                                                    <td >
                                                        {item.isSuspend === true ? <><Button variant="outline-success" onClick={() => { suspendPlaylist(item._id) }}>Disabled</Button>{'  '}</> 
                                                        : 
                                                        <>  <Button variant="outline-danger" onClick={() => { suspendPlaylist(item._id) }}>Enabled</Button>{'  '}
                                                        </>}
                                                    </td>
                                                    <td>
                                                        <img src={item?.image == null ? imageUrl('noimage.png') : item?.image} height="60px" width="110px" alt="" />
                                                    </td>
                                                    
                                                    <td  >{item.title}</td>
                                                    <td  >{item.artistName}</td>
                                                    <td  >{item?.totalLikes}</td>
                                                    <td  >{item?.totalComments}</td>
                                                    <td  >{item?.totalShares}</td>
                                                    <td  >{item?.genre}</td>
                                                    <td  >{item?.createdAt}</td>
                                                    </tr>
                                            </>
                                        )
                                    })
                                ) : (
                                    <tr style={{ textAlign: 'center' }}>
                                        <td colSpan={11}>No Playlist</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </>}
                </div>
            </section>
            <AddPlayListModal open={modelOpen} close={() => setModalOpen(false)} />
                                     
        </>
    );

}

export default AdminPlaylist;
