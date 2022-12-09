import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Header, Loader, PlaySong, Sidebar } from "../../components";
import imageUrl from "../../utils/ImageUrl";
import _api from "../../services/_api";
import { Player } from "components/New";

function New() {
  const { data, isLoading, error, refetch } = useQuery(["getNewTrack"], () =>
    _api.getNewTrack()
  );

  const songs = data?.data || [];
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  return (
    <section class="artist">
      <div class="bg-image">
        <img src={imageUrl("trending-bg.png")} alt="music.png" />
      </div>
      <Header />
      <Sidebar />
      {
        <>
          <div className="songs-list">
            <div className="blank-div"></div>
            <div className="main-content">
              <div className="songs-main custom-set">
                {isLoading ? (
                  <div className="h-100vh">
                    <Loader />
                  </div>
                ) : (
                  <PlaySong
                    songs={songs}
                    refetch={refetch}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                    isPlay={isPlay}
                    setIsPlay={setIsPlay}
                  />
                )}
              </div>
            </div>
          </div>

          <Player
            img={"song-image.png"}
            refetch={refetch}
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
          />
        </>
      }
    </section>
  );
}

export default New;
