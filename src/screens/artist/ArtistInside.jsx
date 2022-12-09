import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
function ArtistInside() {
  const [tab, setTab] = useState('track');
  const [search, setSearch] = useState('');
  let { id } = useParams()
  const user = useAuth();
  const authenticate = useAuthenticate();

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const { data, isLoading, isRefetching, error, refetch: artistRefetch } = useQuery(['getOneArtist'], () => _api.getOneArtist(id), { enabled: false })
  const isArtistFetching = isLoading || isRefetching;
  const artist = data?.data?.artist || null;
  const songs = data?.data?.artistTrack || [];
  const playlists = data?.data?.artistPlaylist || [];
  const similarArtist = data?.data?.similarArtist || [];
  const artistComment = data?.data?.artistComment || [];
  const artistAlbum = data?.data?.artistAlbum || [];

  const [formData, setFormData] = useState({ userId: user?._id, artistId: artist?._id, comments: '' })
  const [artistIdShare, setTArtistIdShare] = useState('');
  const [modelOpenShare, setModalOpenShare] = useState(false);


  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const { mutate, isLoading: commentIsLoading } = useMutation(_api.artistComments, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        artistRefetch()
      } else {
      }
    },
  });
  const { mutate: likeMutate, isLoading: likeIsLoading } = useMutation(_api.artistLikes, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        artistRefetch()
      } else {
      }
    },
  });

  const artistLikes = () => {
    const reqData = { artistId: artist?._id }
    if (user === null) {
      authenticate()
    }
    else {
      likeMutate(reqData)
    }
  }
  const artistComments = (e, parentId = '') => {
    e.preventDefault();
    let body = formData;
    body.parentId = parentId
    if (user === null) {
      authenticate()
    }
    else {
      mutate(body)
    }
  }

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, ['artistId']: artist?._id }));
  }, [artist])
  useEffect(() => {
    artistRefetch()
  }, [id])


  const openModalShare = (artistId) => {
    setModalOpenShare(true)
    setTArtistIdShare(artistId)
  }

  const getCurrentData = (tab = '') => {
    if (tab === "track") return songs;
    else if (tab === "albums") return artistAlbum;
    else if (tab === "similar") return similarArtist;
    else if (tab === "playlist") return playlists;
    else return []
  }

  const onSearchHandler = () => getCurrentData(tab).filter((item) => item.title === search)
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
            isArtistFetching ?
              <div className="h-100vh">
                <Loader />
              </div>
              :
              <>
                {
                  artist ?
                    <>
                      <div className="custom-set">
                        <div
                          className="artist-image-div"
                          style={{
                            backgroundImage: `url(${imageUrl("artist-inside.png")})`,
                          }}
                        >
                          <div className="choices playlist-desc">
                            <Link to="#">
                              <i className="fa-solid fa-arrow-left"></i>
                            </Link>
                            <Link to="#">
                              <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                            <span>Artist / {artist?.name} </span>


                          </div>
                          <div className="playing-song">
                            <div className="song-image">
                              <img src={artist?.image || imageUrl("noimage.png")} alt="music.png" height="124px" width="127px" />
                            </div>

                            <div className="song-info">
                              <div className="artist-song-info">
                                <h5>{artist?.name}</h5>
                                <img src={imageUrl("vip.png")} alt="music.png" />
                                <Link to="#">Current #1.741</Link>
                                <Link to="#">All Time #741</Link>
                              </div>
                              <div className="list-desc">
                                <span className="mt-1 mb-1">{artist?.description || ''}</span>
                                <span>Country/ {artist?.country}</span>
                                <div className="playlist-function my-2">
                                  <a href="#" onClick={() => artistLikes()}>
                                    <i className="fa-solid fa-heart"></i>{artist?.totalLikes}
                                  </a>
                                  <Link to="#" onClick={() => openModalShare(artist?._id)}>
                                    <i className="fa-solid fa-share-nodes"></i>{artist?.totalShares}
                                  </Link>
                                  <a href="#comments">
                                    <i className="fa-solid fa-comment-dots"></i>{artist?.totalComments}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="container player-container">
                          <div className="search-title">
                            <div className={"text-title pointer " + (tab == 'track' && "active-color")} onClick={() => setTab('track')}>
                              <p>{(artist?.name || "Songs") + " (" + songs?.length + ")"}</p>
                            </div>
                            <div className={"text-title pointer " + (tab == 'albums' && "active-color")} onClick={() => setTab('albums')}>
                              <p>Albums {"(" + artistAlbum?.length + ")"}</p>
                            </div>
                            <div className={"text-title pointer " + (tab == 'playlists' && "active-color")} onClick={() => setTab('playlists')}>
                              <p>Playlists {"(" + playlists?.length + ")"}</p>
                            </div>
                            <div className={"text-title pointer " + (tab == 'similar' && "active-color")} onClick={() => setTab('similar')}>
                              <p>Similar Artists {"(" + similarArtist?.length + ")"}</p>
                            </div>
                            {tab === "track" ? <>
                              <div className={"input-title"} onClick={() => setTab('track')}>
                                <i className="fa fa-magnifying-glass"></i>
                                <input
                                  className="box-title"
                                  onKeyDown={onSearchHandler()}
                                  type="text"
                                  id="fname"
                                  name="fname"
                                  placeholder="Search within tracks"
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </> : <></>}
                            {tab === "albums" ? <>
                              <div className={"input-title"} onClick={() => setTab('albums')}>
                                <i className="fa fa-magnifying-glass"></i>
                                <input
                                  className="box-title"
                                  onKeyDown={onSearchHandler()}
                                  type="text"
                                  id="fname"
                                  name="fname"
                                  placeholder="Search within albums"
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </> : <></>}
                            {tab === "similar" ? <>
                              <div className={"input-title"} onClick={() => setTab('similar')}>
                                <i className="fa fa-magnifying-glass"></i>
                                <input
                                  className="box-title"
                                  onKeyDown={onSearchHandler()}
                                  type="text"
                                  id="fname"
                                  name="fname"
                                  placeholder="Search within similar"
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </> : <></>}
                            {tab === "playlists" ? <>
                              <div className={"input-title"} onClick={() => setTab('playlists')}>
                                <i className="fa fa-magnifying-glass"></i>
                                <input
                                  className="box-title"
                                  onKeyDown={onSearchHandler()}
                                  type="text"
                                  id="fname"
                                  name="fname"
                                  placeholder="Search within playlists"
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </> : <></>}
                          </div>
                          {
                            tab == "track" ?
                              <>
                                {
                                  isArtistFetching ?
                                    <div className="h-100vh">
                                      <Loader />
                                    </div>
                                    :
                                    <>
                                      <PlaySong songs={songs} refetch={artistRefetch} search={search} setCurrentSong={setCurrentSong} currentSong={currentSong} isPlay={isPlay} setIsPlay={setIsPlay} />
                                    </>
                                }
                              </>
                              : tab == "albums" ?
                                <>
                                  {
                                    artistAlbum?.length > 0 ?
                                      <div className="table-artist playlist-table custom-playlist">
                                        {artistAlbum.map((list, ind) => (
                                          <div className="play-box">
                                            <div className="artist-title-main">
                                              <div className="set-artist">
                                                <Link to={"/album-inside/" + list?._id}>
                                                  <img src={list?.image == null ? imageUrl('noimage.png') : list?.image} alt={list?.artistName} className="box-img" />
                                                </Link>
                                                <span className="mt-1">{list?.title}</span>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      :
                                      <div class="find-songs">
                                        <div class="inside-songs">
                                          <p className="mb-4">
                                            Albums not found.
                                          </p>
                                        </div>
                                      </div>
                                  }
                                </>
                                : tab == "playlists" ?
                                  <>
                                    {
                                      playlists?.length > 0 ?
                                        <div className="table-artist playlist-table custom-playlist">
                                          {playlists.map((list, ind) => (
                                            <div className="play-box">
                                              <div className="artist-title-main">
                                                <div className="set-artist">
                                                  <Link to={"/playlist-inside/" + list?._id}>
                                                    <img src={list?.image == null ? imageUrl('noimage.png') : list?.image} alt={list?.title} className="box-img" />
                                                  </Link>
                                                  <span className="mt-1">{list?.title}</span>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                        :
                                        <div class="find-songs">
                                          <div class="inside-songs">
                                            <p className="mb-4">
                                              Playlists not found.
                                            </p>
                                          </div>
                                        </div>
                                    }
                                  </>
                                  : tab == "similar" &&
                                  <>
                                    {
                                      similarArtist?.length > 0 ?
                                        <>
                                          <div className="table-artist playlist-table custom-playlist">

                                            {similarArtist.map((list, ind) => (
                                              <div className="play-box">
                                                <div className="artist-title-main">
                                                  <div className="set-artist">
                                                    <Link to={"/artist-inside/" + list?._id}>
                                                      <img src={list?.image == null ? imageUrl('noimage.png') : list?.image} alt={list?.name} className="box-img" />
                                                    </Link>
                                                    <span className="mt-1">{list?.name}</span>
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
                                              Similar artists not found.
                                            </p>
                                          </div>
                                        </div>
                                    }
                                  </>
                          }

                          <div className="main-slide">
                            <div id="slideshow" className="playlist-slider-show">
                              <div className="text-liked">
                                <p>You May Also Like</p>
                              </div>
                              <div className="main-slider">
                                <div className="slick img-pos">
                                  {playlists.length > 0 && (
                                    <SmallSlider data={playlists} type="playlist" />
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
                                    <SmallSlider data={similarArtist} type="artist" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="comments" id="comments">
                            <div className="text-comment">
                              <p>Comments {'(' + artist?.totalComments + ')'}</p>
                            </div>
                            <form onSubmit={(e) => artistComments(e)}>
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
                                {/* <img src={imageUrl("emoji.png")} alt="music.png" /> */}
                                {
                                  commentIsLoading ?
                                    <button type="submit" disabled className="btn-sm-custom">Loading...</button>
                                    :
                                    <button type="submit" className="btn-sm-custom">Comments</button>
                                }
                              </div>
                            </form>
                            {artistComment?.map((item, ind) => {
                              return <>
                                <CommentList item={item} onChangeHandler={onChangeHandler} storeComment={artistComments} commentIsLoading={commentIsLoading} />
                              </>
                            })}

                          </div>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div class="find-songs">
                        <div class="inside-songs">
                          <p className="mb-4">
                            Artist not found.
                          </p>
                        </div>
                      </div>
                    </>
                }
              </>

          }

        </div>
      </div>
      <Player img={"song-image.png"} refetch={artistRefetch} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlay={isPlay} setIsPlay={setIsPlay} />
      <ShareModal open={modelOpenShare} close={() => setModalOpenShare(false)} artistId={artistIdShare} ></ShareModal>

    </section>
  );
}

export default ArtistInside;
