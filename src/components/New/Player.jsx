import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongs, setSong, setIsPlays } from "redux/slices/trackSlice";

export default function Player({ currentSongs }) {
  //  export default function Player({img,songs,currentSongs,setCurrentSong,setIsPlay,isPlays,refetch}) {

  const dispatch = useDispatch();
  const player = useRef();

  const {
    isPlay,
    track: data,
    currentSong,
  } = useSelector((data) => data.track);

  const track = useSelector((data) => data?.track?.Song?.[0]);

  //const track = data?.data || [];
  console.log(track?.[currentSong]?.audio, "SONGSNEW");
  console.log(track, "tracks");
  console.log(currentSong, "CURREMNT");

  useEffect(() => {
       dispatch(setCurrentSongs(currentSong))
  }, [currentSongs]);

  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  function formatSecondsAsTime(secs, format) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ":" + sec;
  }

  const handlePlay = () => {
    dispatch(setIsPlays(true));
  
  };
  const handlePause = () => {
    dispatch(setIsPlays(false));
  };
  const volumeHandle = (vol) => {
    player.current.audio.current.volume = vol;
    setVolume(vol);
  };
  useEffect(() => {
    if (isPlay) {
      player.current.audio.current.play();
    } else {
      player.current.audio.current.pause();
    }
  }, [isPlay, volume]);
  setTimeout(() => {
    setCurrentTime(player?.current?.audio?.current?.currentTime);
  }, 1000);
  return (
    <>
      <div className="new-player">
        <div className=""></div>
        <AudioPlayer
          autoPlay={false}
          src={track?.[currentSong]?.audio}
          className={"s"}
          autoPlayAfterSrcChange={false}
          showSkipControls={false}
          showJumpControls={false}
          customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
          customVolumeControls={[]}
          customControlsSection={[
            <div className="player-setting">
              <div></div>
              <div className="new-player-song">
                <p className="name">
                  {track?.[0] ? <>{track?.[currentSong]?.name} </> : <></>}{" "}
                  {track?.[currentSong]?.duration ? (
                    <>
                      {"(" +
                        formatSecondsAsTime(currentTime) +
                        "/" +
                        track?.[currentSong]?.duration +
                        ")"}{" "}
                    </>
                  ) : (
                    <>
                      {"(" +
                        formatSecondsAsTime(currentTime) +
                        "/" +
                        "00" +
                        ")"}
                    </>
                  )}
                </p>
                <div className="play-song-actions mobile-d-none">
                  {!isPlay ? (
                    <div className="inner" onClick={() => handlePlay()}>
                      <i class="fa-solid fa-play"></i>
                    </div>
                  ) : (
                    <div className="inner" onClick={() => handlePause()}>
                      <i class="fa-solid fa-pause"></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile-action-flex">
                <div className="mobile-width"></div>
                <div className="play-song-actions desktop-d-none mobile-width">
                  {!isPlay ? (
                    <div className="inner" onClick={() => handlePlay()}>
                      <i class="fa-solid fa-play"></i>
                    </div>
                  ) : (
                    <div className="inner" onClick={() => handlePause()}>
                      <i class="fa-solid fa-pause"></i>
                    </div>
                  )}
                </div>
                <div className="new-volume-actions mobile-width">
                  <div
                    className={"inner " + (volume == 1 && "text-white")}
                    onClick={() => volumeHandle(1)}
                  >
                    <i class="fa-solid fa-volume-high"></i>
                  </div>
                  <div
                    className={"inner " + (volume == 0.5 && "text-white")}
                    onClick={() => volumeHandle(0.5)}
                  >
                    <i class="fa-solid fa-volume-low"></i>
                  </div>
                  <div
                    className={"inner " + (volume == 0 && "text-white")}
                    onClick={() => volumeHandle(0)}
                  >
                    <i class="fa-solid fa-volume-xmark"></i>
                  </div>
                </div>
              </div>
            </div>,
          ]}
          customAdditionalControls={[]}
          ref={player}
        ></AudioPlayer>
      </div>
    </>
  );
}
