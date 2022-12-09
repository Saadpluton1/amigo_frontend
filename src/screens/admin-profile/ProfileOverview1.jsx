import React from "react";
import { AdminSideBar ,Loader} from "../../components";
import imageUrl from "../../utils/ImageUrl";
import _api from "../../services/_api"
import { useQuery } from "@tanstack/react-query";

function AdminProfileOverview1() {

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
          <div class="container px-4">
            <div class="row my-5">
              <div class="col-lg-1">
              </div>
              <div class="col-lg-3">
                <div class="api-box box-admin">
                  <h2>{record?.totalUser}</h2>
                  <p>Total Users</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="users-box box-admin">
                  <h2>{record?.totalTrack}</h2>
                  <p>Total Track</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="api-box box-admin">
                  <h2>{record?.totalListeners}</h2>
                  <p>Total Listeners</p>
                </div>
              </div>
              <div class="row my-5 mx-1">
              <div class="col-lg-1">
              </div>
              <div class="col-lg-3">
                <div class="api-box box-admin">
                  <h2>{record?.totalPlaylist}</h2>
                  <p>Total Playlist</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="api-box box-admin">
                  <h2>{record?.totalAlbum}</h2>
                  <p>Total Album</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="api-box box-admin">
                  <h2>{record?.totalArtist}</h2>
                  <p>Total Artist</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
</>}
      </section>
    </>
  );
}

export default AdminProfileOverview1;
