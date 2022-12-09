import React, { useState } from "react";
import {useParams } from "react-router-dom";
import {
  Sidebar,
  Header,
  CommentList,
  SmallSlider,
  PlaySong,
  Loader,
  ShareModal,
} from "../../components";
import imageUrl from "../../utils/ImageUrl";
import { useMutation, useQuery } from "@tanstack/react-query";
import _api from '../../services/_api'
import { toast } from "react-toastify";
import { useEffect } from "react";
import useAuth from "hooks/useAuth";
import useAuthenticate from "hooks/useAuthenticate";
import { Player } from "components/New";

const AlbumInside = () => {
  const [search, setSearch] = useState('');
  let { id } = useParams()
  const user = useAuth();
  const authenticate = useAuthenticate();

  const [currentSong,setCurrentSong] = useState(0);
  const [isPlay,setIsPlay] = useState(false);

  const { data, isLoading,isRefetching, error, refetch: albumRefetch } = useQuery(['getOneAlbum'], () => _api.getOneAlbum(id),{enable:false})
  const isAlbumFetching = isLoading || isRefetching;
  const album = data?.data?.album || null;
  const songs = data?.data?.albumTrack || [];
  const similarAlbum = data?.data?.similarAlbum || [];
  const similarArtist = data?.data?.similarArtist || [];
  const comments = data?.data?.albumComments || [];
  const artistAlbum = data?.data?.artistAlbum || [];
  
  const [formData,setFormData] = useState({userId:user?._id,albumId:album?._id,comments:''})

  const [albumIdShare,setAlbumIdShare] = useState('');
  const [modelOpenShare, setModalOpenShare] = useState(false);


  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };


  const openModalShare = (artistId) =>{
    setModalOpenShare(true)
    setAlbumIdShare(artistId)
  }

  const { mutate, isLoading : commentIsLoading } = useMutation(_api.albumComments, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        albumRefetch()
      } else {
      }
    },
  });
  const { mutate : likeMutate, isLoading : likeIsLoading } = useMutation(_api.albumLikes, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        albumRefetch()
      } else {
      }
    },
  });

const likeAlbum = () => {
  const reqData = {albumId:album?._id}
  if(user === null){
    authenticate()
  }
  else{
    likeMutate(reqData)
  }
}

const albumComment = (e,parentId = '') => {
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
  setFormData((prevState) => ({ ...prevState, ['albumId']: album?._id }));
},[album])

useEffect(()=>{
  albumRefetch()
},[id])


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
            isLoading ? 
            <div className="h-100vh">
            <Loader/>
            </div>
            :
            <>
            {
              album ?
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
                <span>Albums / {album?.title}</span>
              </div>
              <div class="playing-song">
                <div class="song-image">
                  <img src={album?.image == null ? imageUrl('noimage.png') : album?.image} height="124px" width="127px" alt={album?.title} />
                </div>
                <div class="song-info">
                  <p>{album?.title}</p>
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
                      <a href="#">
                        <i class="fa-solid fa-heart pointer" onClick={()=>likeAlbum()}></i>{album?.totalLikes}
                      </a>
                      <a href="#" onClick={()=>openModalShare(album?._id)}>
                        <i class="fa-solid fa-share-nodes"></i>{album?.totalShares}
                      </a>
                      <a href="#comments">
                        <i class="fa-solid fa-comment-dots"></i>{album?.totalComments}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-title">
              <div className="text-title">
                <p>{album?.title} {"(" + songs.length + ")"}</p>
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
              isAlbumFetching ? 
              <>
              <div className="h-100vh">
                  <Loader/>
                  </div>
              </>
              :
              <PlaySong songs={songs} refetch={albumRefetch} search={search} setCurrentSong={setCurrentSong} currentSong={currentSong} isPlay={isPlay} setIsPlay={setIsPlay} />
            }
          </div>
          <div className="main-slide">
            <div id="slideshow" className="playlist-slider-show">
              <div className="text-liked">
                <p>You May Also Like</p>
              </div>
              <div className="main-slider">
                <div className="slick img-pos">
                  {similarAlbum.length > 0 && (
                    <SmallSlider data={similarAlbum} type="album"/>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="main-slide">
            <div id="slideshow" className="playlist-slider-show2">
              <div className="text-liked">
                <p>Suggested Artists</p>
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
              <p>Comments {'(' + album?.totalComments + ')'}</p>
            </div>
            <form onSubmit={(e) => albumComment(e)}>
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
                  <CommentList item={item} onChangeHandler={onChangeHandler} storeComment={albumComment} commentIsLoading={commentIsLoading}/>
                  </>
                })}
          </div>
              </>
              :
              <>
              <div class="find-songs">
              <div class="inside-songs">
                  <p className="mb-4">
                    Album not found.
                  </p>
                </div>
              </div>
              </>
            }
           
            </>
          }
          
        </div>
      </div>
      <Player img={"song-image.png"} refetch={albumRefetch} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlay={isPlay} setIsPlay={setIsPlay} />
      <ShareModal open={modelOpenShare} close={() => setModalOpenShare(false)} albumId={albumIdShare} ></ShareModal>
   
    </section>
  )
}

export default AlbumInside