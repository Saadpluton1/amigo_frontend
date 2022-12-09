import React, { useState } from "react";
import imageUrl from "../../utils/ImageUrl";
import { Header, PlaySong, Loader , DashboardSidebar } from "../../components/index";
import _api from '../../services/_api'
import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/useAuth";
import { Player } from "components/New";


function MyFavouriteTrack() {
  const user = useAuth();
  let userId,artistId ;
  if(user.role == "artist")
  {
    artistId = user?._id
  }
  else{
    userId = user?._id
  }
  const {data, isLoading, error,isRefetching,refetch} = useQuery(['getFavouriteTrack'], () => _api.getFavouriteTrack({userId , artistId}))
  const songs = data?.data || [];
  const isTrackFetching = isLoading || isRefetching;
  const [currentSong,setCurrentSong] = useState(0);
  const [isPlay,setIsPlay] = useState(false);
  return (
    <>
      <section
        className="trending"
        style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
      >
    <Header />
      <DashboardSidebar/>
        <div className="songs-list">
          <div className="blank-div"></div>
          <div className="main-content">
            <div className="songs-main custom-set">
              {
                isTrackFetching ? 
                <div className="h-100vh">
                  <Loader/>
                </div>
                :
              <PlaySong songs={songs} refetch={refetch} setCurrentSong={setCurrentSong} currentSong={currentSong} isPlay={isPlay} setIsPlay={setIsPlay}/>
              }
            </div>
          </div>
        </div>

       <Player img={"song-image.png"} refetch={refetch} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlay={isPlay} setIsPlay={setIsPlay}/>
       
      </section>
    </>
  );
}

export default MyFavouriteTrack;
