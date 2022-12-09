import React from "react";
import { AdminSideBar , Loader } from "../../../components";
import imageUrl from "utils/ImageUrl";
import _api from "../../../services/_api"
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";

function AdminUser() {

    const { data, isLoading, error, isFetching, refetch } = useQuery(['getUser'], () => _api.getUser())
    useEffect(()=>{
        refetch()
      },[])
    const { mutate, isLoading: isLoadingSuspend } = useMutation(_api.userSuspend, {
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

    const users = data?.data || [];

    const suspendUser = (id) => {
        mutate(id)
    }
    return (
        <>
            <AdminSideBar />
            <section
                id="artist-profile"
                style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
            >
                <h1 style={{ marginLeft: 520 }}>User Managements</h1>
                <div style={{ paddingLeft: 630 }}>
                    <Button as={Link} to={`/admin-addUser`} variant="outline-light">Add User</Button>
                </div>
                <div style={{ marginLeft: 300, marginRight: 100,marginTop :15, overflow: "auto", maxHeight: "410px" }} >

                    {isLoading ? <><h1 style={{ marginLeft: 10, marginTop: 100 }}><Loader></Loader></h1></> : <>
                        <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
                            <thead>
                                <tr >

                                    <th>No.</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>CreatedAt</th>
                                    <th>Suspend</th>
                                </tr>
                            </thead>
                            <tbody>

                            {users.length > 0 ? (
                                users.map((item, i) => (
                                    <>
                                        <tr key={item.id} style = {{textAlign : "center"}}>
                                            <td>{i + 1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.name}</td>
                                            <td>{item.createdAt}</td>
                                            <td>
                                            {item.isSuspend === true ? <><Button variant="outline-success"onClick={() => { suspendUser(item._id) }}>Disabled</Button>{'  '}</> : 
                                            <>  <Button variant="outline-danger" onClick={() => { suspendUser(item._id) }}>Enabled</Button>{'  '}
                                                    </>}
                                                <Button as={Link} to={`/admin-userprofile/${item._id}`}  variant="outline-info">View</Button>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            ) : (
                                <tr style={{ textAlign: 'center' }} >
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

export default AdminUser;
