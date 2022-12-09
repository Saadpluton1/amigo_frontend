import { useState } from "react";
import { numberWithCommas } from "../helper/index";
import imageUrl from "../utils/ImageUrl";
import { trendingMusicData } from "../dummyData";
import { PlayListModal, PlaySongRow, ShareModal } from "../components/index";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import _api from "../services/_api";
import { Link } from "react-router-dom";
import useAuthenticate from "hooks/useAuthenticate";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSongs, setSong, setIsPlays } from "redux/slices/trackSlice";

function PlaySong({
  songs,
  setCurrentSong,
  currentSong,
  setIsPlay,
  isPlay,
  search,
  refetch,
}) {
  const [trackId, setTrackId] = useState("");
  const authenticate = useAuthenticate();
  const user = useAuth();
  const [modelOpen, setModalOpen] = useState(false);
  const [modelOpenShare, setModalOpenShare] = useState(false);
  const [trackIdShare, setTrackIdShare] = useState("");

  const dispatch = useDispatch();
  const audioPlay = (index) => {
    setCurrentSong(index);
    setIsPlay(true);
    dispatch(setSong([songs]));
    dispatch(setCurrentSongs(currentSong));
    dispatch(setIsPlays(true));
  };
  const audioPause = (index) => {
    setCurrentSong(index);
    setIsPlay(false);
    dispatch(setIsPlays(false));
  };
  const openModal = (trackId) => {
    setModalOpen(true);
    setTrackId(trackId);
  };
  const openModalShare = (trackId) => {
    setModalOpenShare(true);
    setTrackIdShare(trackId);
  };

  const { mutate, isLoading } = useMutation(_api.trackLikes, {
    onError: function (error) {
      toast.error(error.toString());
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        // toast.success(data.message)
        refetch();
      }
    },
  });

  const { mutate: favouriteTrack, isLoading: isLoadingFavourite } = useMutation(
    _api.trackAddedFavourite,
    {
      onError: function (error) {
        toast.error(error.toString());
      },
      onSuccess: ({ data }) => {
        if (data.status) {
          toast.success(data.message);
        }
      },
    }
  );

  const likeTrack = (trackId) => {
    const reqData = { trackId: trackId };
    if (user === null) {
      authenticate();
    } else {
      mutate(reqData);
    }
  };

  const favouriteTrackAdded = (trackId) => {
    if (user === null) {
      authenticate();
    }
    if (user?.role === "user" && !isLoadingFavourite) {
      const reqData = { userId: user?._id, trackId: trackId };
      favouriteTrack(reqData);
    }
    if (user?.role === "artist" && !isLoadingFavourite) {
      const reqData = { artistId: user?._id, trackId: trackId };
      favouriteTrack(reqData);
    }
  };

  // useEffect(() => {
  //   dispatch(setSong([songs]));
  //   dispatch(setCurrentSongs(currentSong));
  //   dispatch(setIsPlays(isPlay));
  // }, []);

  return (
    <>
      {songs?.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span className="mx-3"> #</span>
                </th>
                <th>TITLE</th>
                <th>ARTIST</th>
                <th></th>
                <th className="time-set">TIME</th>
              </tr>
            </thead>
            <tbody>
              {songs
                .filter((song) =>
                  song.name
                    .toLowerCase()
                    .includes(search != undefined ? search.toLowerCase() : "")
                )
                .map((data, index) => {
                  return (
                    <>
                      <tr className="space-under">
                        <td>
                          {isPlay && currentSong === index ? (
                            <i
                              className={"fa-solid fa-pause fff"}
                              onClick={() => audioPause(index)}
                            ></i>
                          ) : (
                            <i
                              className={`fa-solid fa-play fff`}
                              onClick={() => audioPlay(index)}
                            ></i>
                          )}
                        </td>
                        <td>
                          <div className="song-title-main">
                            <img
                              src={data.image}
                              width={"41px"}
                              height={"41px"}
                              alt="song-image.png"
                            />
                            <div className="song-text">
                              <span>
                                <Link
                                  to={"/trending-inside/" + data?._id}
                                  className="song-anchor"
                                >
                                  {data?.name}
                                </Link>
                              </span>
                              <div className="song-desc">
                                <p>
                                  <i className="fa-solid fa-headphones"></i>{" "}
                                  {data?.totalListeners}
                                </p>
                                <p>
                                  <i
                                    className={
                                      "fa-solid fa-heart pointer " +
                                      (data?.isLiked && "heart-active")
                                    }
                                    onClick={() => likeTrack(data?._id)}
                                  ></i>{" "}
                                  {data?.totalLikes}
                                </p>
                                <p>
                                  <i
                                    className="fa-solid fa-share-nodes pointer"
                                    onClick={() => openModalShare(data?._id)}
                                  ></i>
                                  {data?.totalShares}
                                </p>
                                <p>
                                  <i className="fa-solid fa-comment-dots"></i>
                                  {data?.totalComments}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{data?.artistName}</td>
                        <td>
                          <div className="equipments">
                            <img
                              src={imageUrl("music-logo.png")}
                              alt="music-logo.png"
                              className="pointer"
                              onClick={() => openModal(data?._id)}
                            />
                            <img
                              className="pointer"
                              onClick={() => openModalShare(data?._id)}
                              src={imageUrl("nodes.png")}
                              alt="music-logo.png"
                            />

                            <img
                              height={30}
                              src={imageUrl("favorite.png")}
                              alt="favorite.png"
                              className={
                                isLoadingFavourite ? "not-allowed" : "pointer"
                              }
                              onClick={() => favouriteTrackAdded(data?._id)}
                            />
                            <a href={data?.audio} download>
                              <img
                                className="pointer"
                                src={imageUrl("downloads.png")}
                                alt="music-logo.png"
                              />
                            </a>
                          </div>
                        </td>
                        <td>
                          <span id="tracktime">{data?.duration}</span>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <PlayListModal
            open={modelOpen}
            close={() => setModalOpen(false)}
            trackId={trackId}
          />
          <ShareModal
            open={modelOpenShare}
            close={() => setModalOpenShare(false)}
            trackId={trackIdShare}
          ></ShareModal>
        </>
      ) : (
        <div class="find-songs">
          <div class="inside-songs">
            <p className="mb-4">Tracks not found.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaySong;
