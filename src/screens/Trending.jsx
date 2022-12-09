import React, { useState } from "react";
import imageUrl from "../utils/ImageUrl";
import { Header, Sidebar, PlaySong, Loader } from "../components/index";
import _api from '../services/_api'
import { useQuery } from "@tanstack/react-query";
import { Player } from "components/New";

function Trending() {
  const {data, isLoading, error,isRefetching,refetch} = useQuery(['getTrack'], () => _api.getTrack())
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
        <Sidebar />
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

export default Trending;
