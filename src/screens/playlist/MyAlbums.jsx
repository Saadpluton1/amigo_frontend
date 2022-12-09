import React, { useEffect } from "react";
import imageUrl from "../../utils/ImageUrl";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Header, Footer, Sidebar, AddPlayListModal, Loader, AddAlbumModal, DashboardSidebar } from "../../components/index";
import _api from '../../services/_api'
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "hooks/useAuth";

function MyAlbum() {
  const [modelOpen, setModalOpen] = useState(false);

  const user = useAuth();

  const { data : albumData, isLoading : albumIsLoading,isRefetching, error : albumError,refetch } = useQuery(['getAlbums'], () => _api.getAlbums(user._id))
  
  const albums = albumData?.data?.album || [];
   const isAlbumFetching = albumIsLoading || isRefetching;

  return (
    <section
      className="playlist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <Header />
      <DashboardSidebar/>
      <div className="songs-list">
        <div className="blank-div"></div>

        <div className="custom-set album-custom-set">
          {
        isAlbumFetching ?
        <>
        <div className="h-100vh">
        <Loader/>
        </div>
        </>
        :
        <>
        {
          albums?.length > 0 ? 
          <>
          <div className="table-artist album-table custom-playlist" style={{ overflowY: 'auto' }}>
              {albums.map((list, ind) => (
                  <div className="play-box">
                    <div className="artist-title-main">
                      <div className="set-artist">
                        <Link to={"/album-inside/"+list?._id}>
                          <img src={list?.image == null ? imageUrl('noimage.png') : list?.image} alt={list?.title} className="box-img"/>
                        </Link>
                        <span className="mt-1">{list?.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          </>
          :
          <div class="find-songs">
          <div class="inside-songs">
            <p className="mb-4">
              Album not found.
            </p>
            <a
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              onClick={() => setModalOpen(!modelOpen)}
            >
              Add album
            </a>
          </div>
          </div>
          }
        </>
        }
          
      
      <AddAlbumModal open={modelOpen} close={() => setModalOpen(false)} />
        </div>
      </div>
    </section>
  );
}

export default MyAlbum;
