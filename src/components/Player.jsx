import { useState } from "react";
import imageUrl from "../utils/ImageUrl";
import playIcon from "../assets/images/play-icon.svg";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import audioUrl from "../utils/audioUrl";
import { useRef } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import _api from '../services/_api'
import { toast } from "react-toastify";
import PlayListModal from "./PlayListModal";
import useAuth from "hooks/useAuth";
import useAuthenticate from "hooks/useAuthenticate";
import ShareModal from "./ShareModel";

function Player({img,songs,currentSong,setCurrentSong,setIsPlay,isPlay,refetch}) {

  let user = useAuth();
  const authenticate = useAuthenticate();
  const [trackId,setTrackId] = useState('');
  const [modelOpen, setModalOpen] = useState(false);
  const [play, setPlay] = useState("");
  const [volumeIncrease, setVolumeIncrease] = useState(false);
  const [volumeDecrease, setVolumeDecrease] = useState(false);
  const [currentMusicIndex, setMusicIndex] = useState(0);

  const [modelOpenShare, setModalOpenShare] = useState(false);
  const [trackIdShare,setTrackIdShare] = useState('');

  const player = useRef();

  const handleClickPrevious = () => {
    setCurrentSong((currentTrack) =>
      currentTrack === 0 ? songs.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setCurrentSong((currentTrack) =>
      currentTrack < songs.length - 1 ? currentTrack + 1 : 0
    );
  };
  const openModal = (trackId) =>{
    setModalOpen(true)
    setTrackId(trackId)
  }
  const { mutate, isLoading } = useMutation(_api.trackLikes, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        refetch()
      } else {
      }
    },
  });

  const { mutate : trackMutate, isLoading : trackIsLoading } = useMutation(_api.trackListener, {
    onError: function (error) {
    },
    onSuccess: ({ data }) => {
      if (data.status) {
      } else {
      }
    },
  });
  const trackListener = (trackId) =>{
    const reqData = {trackId:trackId}
    trackMutate(reqData)
  }
  const likeTrack = (trackId) => {
    const reqData = {trackId:trackId}
    if(user === null){
      authenticate()
    }
    else{
      mutate(reqData)
    }
  }
  useEffect(()=>{
      if(isPlay){
        player.current.audio.current.play();
        if(!songs[currentSong]?.isViewed){
          songs[currentSong].isViewed = true
          trackListener(songs[currentSong]?._id);
        }
      }
      else{
        player.current.audio.current.pause();
      }
  },[isPlay,currentSong])


  const openModalShare = (trackId) =>{
    setModalOpenShare(true)
    setTrackIdShare(trackId)
  }
  return (
    <div className={"player "+(!songs?.length > 0 && 'd-none')}>
      <AudioPlayer
        autoPlay={false}
        src={songs[currentSong]?.audio}
        className={"player"}
        autoPlayAfterSrcChange={false}
        showSkipControls={true}
        showJumpControls={false}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
        customAdditionalControls={[
          <div className="song-name">
            <img src={songs[currentSong]?.image} height="41px" width="41px" alt="song-image.png" />
            <div className="song-text">
              <span>{songs[currentSong]?.name}</span>
              <div className="singer-name">
                <span>{songs[currentSong]?.artistName}</span>
              </div>
            </div>
          </div>,
        ]}
        customVolumeControls={[
          RHAP_UI.VOLUME,
          RHAP_UI.LOOP,
          <div className="functions">
            <img src={imageUrl(songs[currentSong]?.isLiked ? "like-fill.png" : "like.png")} width="50" height="20"  alt="" className="pointer" onClick={()=>likeTrack(songs[currentSong]?._id)}/>
           
            <img src={imageUrl("music-logo.png")} alt="" className="pointer" onClick={()=>openModal(songs[currentSong]?._id)}/>
            <img  onClick={()=>openModalShare(songs[currentSong]?._id)} src={imageUrl("nodes.png")} alt=""/>
          
            <a href={songs[currentSong]?.audio} download>
            <img src={imageUrl("downloads.png")} alt="" />
            </a>
            <img src={imageUrl("playlist.png")} alt="" />
            <div className="play-time">{/* <p>01:10/04:00</p> */}</div>
          </div>,
          RHAP_UI.CURRENT_TIME,
          <div className="bar">
            <p> / </p>
          </div>,
          RHAP_UI.DURATION,
        ]}
        customIcons={{
          play: (
            <img src={imageUrl("play-icon.svg")} className={"player-btn"} />
          ),
          pause: (
            <img src={imageUrl("pause-icon.svg")} className={"player-btn"} />
          ),
        }}
        onPlay={(e) => setIsPlay(true)}
        onPause={(e) => setIsPlay(false)}
        ref={player}></AudioPlayer>

    <PlayListModal open={modelOpen} close={() => setModalOpen(false)} trackId={trackId}/>
    <ShareModal open={modelOpenShare} close={() => setModalOpenShare(false)} trackId={trackIdShare} ></ShareModal>
      
   
    </div>
    
  );
}

export default Player;
