import { useState } from "react";
import imageUrl from "../../../utils/ImageUrl";
import { PlayListModal } from "../../../components/index";
import { AdminSideBar, Loader } from "../../../components";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import _api from "../../../services/_api";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import apis from "../../../services/_api";

function AdminTrack() {
  const { data, isLoading, error, isRefetching, refetch } = useQuery(
    ["getTrack"],
    () => _api.getAllTrack()
  );
  const songs = data?.data?.tracks || [];
  const { mutate, isLoading: isLoadingSuspend } = useMutation(
    _api.trackTrending,
    {
      onError: function (error) {
        toast.error(error.toString());
      },
      onSuccess: ({ data }) => {
        if (data.status) {
          toast.success(data.message);
          refetch();
        } else {
        }
      },
    }
  );

  const { mutate: isTrackDeleted, isLoading: isLoadingRemove } = useMutation(
    apis.trackDeleted,
    {
      onError: function (error) {
        toast.error(error.toString());
      },
      onSuccess: ({ data }) => {
        if (data.status) {
          toast.success(data.message);
          refetch();
        } else {
        }
      },
    }
  );

  const trendingTrack = (id) => {
    mutate(id);
  };
  const deleteTrack = (id) => {
    isTrackDeleted(id);
  };
  const [trackId, setTrackId] = useState("");

  const [modelOpen, setModalOpen] = useState(false);

  const openModal = (trackId) => {
    setModalOpen(true);
    setTrackId(trackId);
  };

  return (
    <>
      <AdminSideBar />
      <section
        id="artist-profile"
        style={{
          backgroundImage: `url(${imageUrl("trending-bg.png")})`,
          paddingLeft: 220,
        }}
      >
        {isLoading ? (
          <>
            <h1 style={{ paddingTop: 200 }}>
              <Loader></Loader>
            </h1>
          </>
        ) : (
          <>
            {songs?.length > 0 ? (
              <>
                <div>
                  <h1 style={{ paddingLeft: 300 }}>Track Management</h1>
                  <Button
                    style={{ marginLeft: 410 }}
                    as={Link}
                    to={`/admin-addtrack`}
                    variant="outline-light"
                  >
                    Add Track
                  </Button>
                </div>
                <div
                  style={{
                    marginLeft: 80,
                    marginRight: 100,
                    overflow: "auto",
                    maxHeight: "410px",
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>
                          <span className="mx-3"> Track</span>
                        </th>
                        <th>ARTIST</th>
                        <th>Add Playlist</th>
                        <th className="time-set">TIME</th>
                        <th>TRENDING FEATURE</th>
                        <th>Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {songs.map((data, index) => {
                        return (
                          <>
                            <tr className="space-under">
                              <td>
                                <div className="song-title-main">
                                  <img
                                    src={data.image}
                                    width={"41px"}
                                    height={"41px"}
                                    alt=""
                                  />
                                  <div className="song-text">
                                    <span>{data?.name}</span>
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
                                        ></i>{" "}
                                        {data?.totalLikes}
                                      </p>
                                      <p>
                                        <i className="fa-solid fa-share-nodes"></i>
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
                              <td style={{ textAlign: "center" }}>
                                <div className="equipments">
                                  <img
                                    src={imageUrl("music-logo.png")}
                                    alt="music-logo.png"
                                    className="pointer"
                                    onClick={() => openModal(data?._id)}
                                  />
                                </div>
                              </td>

                              <td>
                                <span id="tracktime">{data?.duration}</span>
                              </td>

                              <td style={{ textAlign: "center" }}>
                                {data.isTrending === true ? (
                                  <>
                                    <Button
                                      variant="outline-success"
                                      onClick={() => {
                                        trendingTrack(data?._id);
                                      }}
                                    >
                                      Disabled
                                    </Button>
                                    {"  "}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <Button
                                      variant="outline-danger"
                                      onClick={() => {
                                        trendingTrack(data._id);
                                      }}
                                    >
                                      Enabled
                                    </Button>
                                    {"  "}
                                  </>
                                )}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Button
                                  as={Link}
                                  to={`/edit-music/${data?._id}`}
                                  variant="outline-info"
                                >
                                  Edit
                                </Button>
                                {"  "}

                                <Button
                                  variant="outline-danger"
                                  onClick={() => {
                                    deleteTrack(data._id);
                                  }}
                                >
                                  Remove
                                </Button>
                                {"  "}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <PlayListModal
                  open={modelOpen}
                  close={() => setModalOpen(false)}
                  trackId={trackId}
                />
              </>
            ) : (
              <>
                <div>
                  <Button
                    style={{ marginLeft: 430, marginTop: 20 }}
                    as={Link}
                    to={`/admin-addtrack`}
                    variant="outline-light"
                  >
                    Add Track
                  </Button>
                </div>
                <div class="find-songs">
                  <div class="inside-songs">
                    <p className="mb-4">No Track.</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default AdminTrack;
