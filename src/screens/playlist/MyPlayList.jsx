import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link ,useLocation} from "react-router-dom";
import { Sidebar, Header, AddPlayListModal, Loader  } from "../../components";
import imageUrl from "../../utils/ImageUrl";
import _api from '../../services/_api'
import useAuth from "hooks/useAuth";

function MyPlayList() {
  const location = useLocation();
  const [modelOpen, setModalOpen] = useState(false);
  const user = useAuth();
  const req =  user?.role === "artist" ? {artistId:user?._id} : {userId:user?._id}
  
  const { data : playlistData, isLoading : playlistIsLoading,isRefetching, error : playlistError } = useQuery(['getPlaylistByUser'], () => _api.getPlaylistByUser(req))
  const playlists = playlistData?.data?.playLists || [];
  const isPlaylistFetching = playlistIsLoading || isRefetching;

  return (
    <section className="playlist"
    style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
  >
      <Header />
      <Sidebar />
      {
        isPlaylistFetching ?
        <>
        <div className="h-100vh">
        <Loader/>
        </div>
        </>
        :
        <>
        {
        playlists?.length > 0 ? 
        <>
        <div className="songs-list">
        <div className="blank-div"></div>
        <div className="custom-set playlist-custom-set">

         <div className="table-artist playlist-table custom-playlist">
              {playlists.map((list, ind) => (
                  <div className="play-box">
                    <div className="artist-title-main">
                      <div className="set-artist">
                        <Link to={"/playlist-inside/"+list?._id}>
                        <img src={list?.image == null ? imageUrl('noimage.png') : list?.image} alt={list?.title} className="box-img"/>
                        </Link>

                        <span>{list?.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          </div>
          </div>


        </>
        :
        <div class="find-songs">
        <div class="inside-songs">
          <img src={imageUrl("find.png")} alt="find.png" />
          <p className="mb-4">
            You haven't created any playlists. Create your own playlists here .
          </p>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
            onClick={() => setModalOpen(!modelOpen)}
          >
            Add Playlist
          </a>
        </div>
      </div>
      }
        </>
      }
      
      
      <AddPlayListModal open={modelOpen} close={() => setModalOpen(false)} />
    </section>
  );
}

export default MyPlayList;
