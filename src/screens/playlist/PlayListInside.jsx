import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Sidebar,
  Header,
  CommentList,
  SmallSlider,
  PlaySong,
  Loader,
  ShareModal
} from "../../components";
import imageUrl from "../../utils/ImageUrl";
import { useMutation, useQuery } from "@tanstack/react-query";
import _api from '../../services/_api'
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuthenticate from "hooks/useAuthenticate";
import useAuth from "hooks/useAuth";
import { Player } from "components/New";


function PlayListInside() {
  const [search, setSearch] = useState('');

  let { id } = useParams()
  const user = useAuth();
  const authenticate = useAuthenticate();
  const { data, isLoading, error,isRefetching, refetch: playlistRefetch } = useQuery(['getOnePlayList'], () => _api.getOnePlayList(id),{enabled:false})
  const playlist = data?.data?.playlists || null;
  const comments = data?.data?.playlistComments || [];
  const similarArtist = data?.data?.similarArtist || [];
  const similarPlaylist = data?.data?.similarPlaylist || [];
  const songs = data?.data?.playlistsTrack || [];


  const [formData, setFormData] = useState({ userId: user?._id, playlistId: playlist?._id, comments: '' })
  const { data: songData, isLoading: songIsLoading,isRefetching : songIsRefetching, songError, refetch } = useQuery(['getPlaylistTrack'], () => _api.getPlaylistTrack(playlist?.trackId), { enabled: false })
 
  const isPlaylistFetching = isLoading || isRefetching;

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  
  const [playlistIdShare,setTPlaylistShare] = useState('');
  const [modelOpenShare, setModalOpenShare] = useState(false);

  const { mutate, isLoading: commentIsLoading } = useMutation(_api.playlistComments, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        playlistRefetch()
      } else {
      }
    },
  });
  const { mutate: likeMutate, isLoading: likeIsLoading } = useMutation(_api.playlistLikes, {
    onError: function (error) {
     toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        playlistRefetch()
      } else {
      }
    },
  });

  const playlistLikes = () => {
    const reqData = { playlistId: playlist?._id }
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
  const playlistComments = (e,parentId = '') => {
  
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
    setFormData((prevState) => ({ ...prevState, ['playlistId']: playlist?._id }));
  },[playlist])
  
  useEffect(()=>{
    playlistRefetch()
  },[id])
  
  const openModalShare = (playlistId) =>{
    setModalOpenShare(true)
    setTPlaylistShare(playlistId)
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
            isPlaylistFetching ? 
            <div className="h-100vh">
            <Loader/>
            </div>
            :
            <>
            {
              playlist ?
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
                <span>Playlists / {playlist?.title}</span>
              </div>
              <div class="playing-song">
                <div class="song-image">
                  <img src={playlist?.image == null ? imageUrl('noimage.png') : playlist?.image} height="124px" width="127px" alt={playlist?.title} />
                </div>
                <div class="song-info">
                  <p>{playlist?.title}</p>
                  <div class="list-desc">
                    <span className="mt-1 mb-1"></span>

                    <span>
                      <img src={imageUrl("logo-song.png")} alt="" />
                      Amigo USA
                    </span>
                    <div class="playlist-function my-2">
                      <a href="#" onClick={() => setIsPlay(true)}>
                        <i class="fa-solid fa-play pointer" ></i>Play all
                      </a>
                      <a href="#" onClick={playlistLikes}>
                        <i class="fa-solid fa-heart pointer"></i>{playlist?.totalLikes}
                      </a>
                      <a href="#" onClick={()=>openModalShare(playlist?._id)}>
                        <i class="fa-solid fa-share-nodes"></i>{playlist?.totalShares}
                      </a>
                      <a href="#comments">
                        <i class="fa-solid fa-comment-dots"></i>{playlist?.totalComments}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-title">
              <div className="text-title">
                <p>{playlist?.title} {"(" + songs.length + ")"}</p>
              </div>

              <div className="input-title">
                <i className="fa fa-magnifying-glass"></i>
                <input
                  className="box-title"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Search within tracks"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            {
              isLoading ? 
              <>
              <div className="h-100vh">
                  <Loader/>
                  </div>
              </>
              :
              <PlaySong songs={songs} refetch={refetch} search={search} setCurrentSong={setCurrentSong} currentSong={currentSong} isPlay={isPlay} setIsPlay={setIsPlay} />
            }
          </div>
          <div className="main-slide">
            <div id="slideshow" className="playlist-slider-show">
              <div className="text-liked m-2">
              {similarPlaylist.length > 0 && (
                 <p>You May Also Like</p>
              )}
              </div>
              <div className="main-slider">
                <div className="slick img-pos">
                  {similarPlaylist.length > 0 && (
                    <SmallSlider data={similarPlaylist} type="playlist"/>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="main-slide">
            <div id="slideshow" className="playlist-slider-show2">
              <div className="text-liked m-2">
              {similarArtist.length > 0 && (
                   <p>Suggested Artists</p>
              )}
              </div>
              <div className="main-slider">
              <div className="slick img-pos">

                {similarArtist.length > 0 && (
                    <SmallSlider data={similarArtist} type="artist"/>
                  )}
              </div>
              </div>
            </div>
          </div>
          <div className="comments" id="comments">
            <div className="text-comment">
              <p>Comments {'(' + playlist?.totalComments + ')'}</p>
            </div>
            <form onSubmit={(e) => playlistComments(e)}>
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
                  <CommentList item={item} onChangeHandler={onChangeHandler} storeComment={playlistComments} commentIsLoading={commentIsLoading}/>
                  </>
                })}
          </div>
              </>
              :
              <>
              <div class="find-songs">
              <div class="inside-songs">
                  <p className="mb-4">
                    Playlist not found.
                  </p>
                </div>
              </div>
              </>
            }
           
            </>
          }
          
        </div>
      </div>
      <Player img={"song-image.png"} refetch={refetch} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlay={isPlay} setIsPlay={setIsPlay} />
      <ShareModal open={modelOpenShare} close={() => setModalOpenShare(false)} playlistId={playlistIdShare} ></ShareModal>
   
    </section>
  );
}

export default PlayListInside;