import React, { useEffect } from "react";
import imageUrl from "../../utils/ImageUrl";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Header, Sidebar, AddPlayListModal, Loader } from "../../components/index";
import _api from '../../services/_api'
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
function PlayList() {
  let [searchParams, setSearchParams] = useSearchParams();
  
  const [search, setSearch] = useState();
  
  const params = Object.fromEntries([...searchParams]);
  const [modelOpen, setModalOpen] = useState(false);
  const [searchGenre,setSearchGenre] = useState(params.genre || 'All');
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery(['getGenre'], () => _api.getGenre())
  const genres = data?.data || [];
  const req = {userId:'',genre:searchGenre}
  const { data : playlistData, isLoading : playlistIsLoading,isRefetching, error : playlistError,refetch } = useQuery(['getPlaylist'], () => _api.getPlaylist(req),{enabled:true})
  
  const playlists = playlistData?.data?.playLists || [];
   const isPlaylistFetching = playlistIsLoading || isRefetching;

  const genreFilter = (gen) =>{
    setSearchGenre(gen);
    navigate(`/playlist?genre=${gen}`)
  }
  
  useEffect(()=>{
    refetch()
  },[searchGenre])
  
  
  return (
    <section
      className="playlist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <Header />
      <Sidebar />
      <div className="songs-list">
        <div className="blank-div"></div>

        <div className="custom-set playlist-custom-set">
          <div className="choices">
          {
            genres?.length > 0 ?
            <>
            <a
                  href="#"
                  className={""+("All" == searchGenre ? "active" :'')}
                  onClick={()=>genreFilter("All")}
                > 
                  All
                </a>
            {genres?.map((item, _index) => {
              return <>
                
                        <a href="#" className={"" + (item?.name == searchGenre ? "active" :'')} onClick={()=>genreFilter(item?.name)}>{item.name}</a>
            
              </>
            })}
            </>
            :
            <>
            </>
          }
      
          </div>
        
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
          <div className="table-artist playlist-table custom-playlist" style={{ overflowY: 'auto' }}>
              {playlists.map((list, ind) => (
                  <div className="play-box m-1">
                    <div className="artist-title-main">
                      <div className="set-artist">
                        <Link to={"/playlist-inside/"+list?._id}>
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
              Playlist not found.
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
        </div>
      </div>
    </section>
  );
}

export default PlayList;
