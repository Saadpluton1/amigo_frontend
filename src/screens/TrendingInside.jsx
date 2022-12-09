import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  Sidebar,
  Header,
  CommentList,
  SmallSlider,
  PlaySong,
  Loader,
  ShareModal
} from "../components";
import imageUrl from "../utils/ImageUrl";
import { useMutation, useQuery } from "@tanstack/react-query";
import _api from '../services/_api'
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuthenticate from "hooks/useAuthenticate";
import useAuth from "hooks/useAuth";
import { Player } from "components/New";

function TrendingInside() {
  const [search, setSearch] = useState('');
  let { id } = useParams()
  const user = useAuth();
 const authenticate =  useAuthenticate()
  const { data, isLoading, error,isRefetching, refetch: trackRefetch } = useQuery(['getOneTrack'], () => _api.getOneTrack(id))
  const track = data?.data?.songs || null;
  const isTrackFetching = isLoading || isRefetching;
  const playTrack = [track];
  const comments = data?.data?.trackComments || [];
  const [formData, setFormData] = useState({ userId: user?._id, trackId: track?._id, comments: '' })
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  const [modelOpenShare, setModalOpenShare] = useState(false);
  const [trackIdShare,setTrackIdShare] = useState('');
  
  const { mutate, isLoading: commentIsLoading } = useMutation(_api.trackComments, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        trackRefetch()
      } else {
      }
    },
  });



  const { mutate: likeMutate, isLoading: likeIsLoading } = useMutation(_api.trackLikes, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        trackRefetch()
      } else {
      }
    },
  });

  const trackLikes = () => {
    const reqData = { trackId: track?._id }
    if(user === null){
      authenticate()
    }
    else{
      likeMutate(reqData)
    }
  }
  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };
  const trackComments = (e,parentId = '') => {
    e.preventDefault();
    let body = formData;
    body.parentId = parentId
    if(user === null){
      authenticate()
    }
    else{
      mutate(body)
    }
  }
  useEffect(()=>{
    setFormData((prevState) => ({ ...prevState, ['trackId']: track?._id }));
  },[track])
  useEffect(()=>{
    trackRefetch()
  },[id])

  const openModalShare = (trackId) =>{
    setModalOpenShare(true)
    setTrackIdShare(trackId)
  }


  return (
    <section
      className="playlist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <Header />
      <Sidebar />
      <div className="songs-list">
        <div className="blank-div"></div>
        <div className="main-content">
          {
            isTrackFetching ?
            <div className="h-100vh">
            <Loader/>
            </div>
            :
            <>
            {
              track ?
              <>
              <div className="custom-set">
            <div
              class="image-div"
              style={{ backgroundImage: `url(${imageUrl("blur-bg.png")})` }}
            >
              <div class="choices playlist-desc">
                <a href="#">
                  <i class="fa-solid fa-arrow-left"></i>
                </a>
                <a href="#">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
                <span>Trending / {track?.name}</span>
              </div>
              <div class="playing-song">
                <div class="song-image">
                  <img src={track?.image == null ? imageUrl('noimage.png') : track?.image} height="124px" width="127px" alt={track?.name} />
                </div>
                <div class="song-info">
                  <p>{track?.name}</p>
                  <div class="list-desc">
                    <span className="mt-1 mb-1">{track?.description || ''}</span>
                    <span>
                      <img src={imageUrl("logo-song.png")} alt="" />
                      Amigo USA
                    </span>
                    <div class="playlist-function my-2">
                      <a href="#" onClick={() => setIsPlay(true)}>
                        <i class="fa-solid fa-play pointer" ></i>Play all
                      </a>
                      <a href="#" onClick={trackLikes}>
                        <i class={"fa-solid fa-heart pointer "+(track?.isLiked && "heart-active")}></i>{track?.totalLikes}
                      </a>
                      <a href="#" onClick={()=>openModalShare(track?._id)}>
                        <i class="fa-solid fa-share-nodes"></i>{track?.totalShares}
                      </a>
                      <a href="#comments">
                        <i class="fa-solid fa-comment-dots"></i>{track?.totalComments}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="trending-detail">
            <p><span >Artist : </span> <span className="gray-text">{track?.artistName}</span> </p>
            <p><span >Genre : </span> <span className="gray-text">{track?.genre}</span> </p>
            <p><span >Year of Release : </span> <span className="gray-text">{track?.year}</span> </p>
            </div>

          </div>
          <div className="comments" id="comments">
            <div className="text-comment">
              <p>Comments {'(' + track?.totalComments + ')'}</p>
            </div>
            <form onSubmit={(e) => trackComments(e)}>
              <div className="form-floating ">
                <textarea
                  className="form-control area-form"
                  placeholder=""
                  id="comments"
                  required
                  style={{ height: "100px" }}
                  onChange={onChangeHandler}></textarea>
                <label for="message">Please share your thoughts</label>
              </div>
              <div className="emojis">
                {
                  commentIsLoading ?
                    <button type="submit" disabled className="btn-sm-custom">Loading...</button>
                    :
                    <button type="submit" className="btn-sm-custom">Comments</button>
                }
              </div>
            </form>
            {comments?.map((item, ind) => {
                  return <>
                  <CommentList item={item} onChangeHandler={onChangeHandler} storeComment={trackComments} commentIsLoading={commentIsLoading}/>
                  </>
                })}
          </div>
        </>
              :
              <>
              <div class="find-songs">
              <div class="inside-songs">
                <p className="mb-4">
                  Track not found.
                </p>
              </div>
            </div>
              </>
            }
            
            </>
          }
          
        </div>
      </div>

      <Player img={"song-image.png"} refetch={trackRefetch} songs={playTrack} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlay={isPlay} setIsPlay={setIsPlay} />
      <ShareModal open={modelOpenShare} close={() => setModalOpenShare(false)} trackId={trackIdShare} ></ShareModal>
   
    </section>
  );
}

export default TrendingInside;