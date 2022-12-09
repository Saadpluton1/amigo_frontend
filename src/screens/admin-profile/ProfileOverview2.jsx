import React from "react";
import { AdminSideBar, AdminProfileChart , Loader } from "components";
import imageUrl from "utils/ImageUrl";
import _api from "../../services/_api"
import { useQuery } from "@tanstack/react-query";

function AdminProfileOverview2() {
  
  
  const { data, isLoading, error, isFetching, refetch } = useQuery(['getUser'], () => _api.getTotal())
  const record = data?.data || [];
  const apiLoading = isLoading || isFetching;



  return (
    <>
      <AdminSideBar />
      <section
        id="artist-profile"
        style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
      >
        
{ apiLoading ? <><h1 style={{ paddingLeft: 10, paddingTop: 100 }}><Loader></Loader></h1></> : <>

<div class="profile-list">
          <div class="blank-div"></div>
          <div class="container px-5">
            <div class="row my-5">
              <div class="col-lg-3">
              </div>
              <div class="col-lg-3">
                <div class="api-box box-admin">
                  <h2>{record?.totalLikes}</h2>
                  <p>Total Likes</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="users-box box-admin">
                  <h2>{record?.totalComments}</h2>
                  <p>Total Comments</p>
                </div>
              </div>
            </div>
            <div class="graph-box">
              <div id="chart">
                <AdminProfileChart />
              </div>
            </div>
          </div>
        </div>

</>}        
      </section>
    </>
  );
}

export default AdminProfileOverview2;
