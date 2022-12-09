import { useState } from "react";
import imageUrl from "../../../utils/ImageUrl";
import { PlayListModal } from "../../../components/index";
import {  AdminSideBar, Loader } from "../../../components";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import _api from '../../../services/_api'
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from 'react-bootstrap/Button';
import { Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

function AdminPlaylistEdit() {
  const param = useParams();
  const playlistId = param.id;
  const navigate = useNavigate();

  const { data: playlistData, isLoading: isLoadingPlaylist, refetch, error: isError } = useQuery(['getOnePlaylist'], () => _api.getOnePlayList(playlistId))
  const playlist = playlistData?.data || [];


  useEffect(() => {
    if (playlist?.playlists) {
      setFormData(playlist?.playlists)
    }
  }, [playlist?.playlists])
  let [formData, setFormData] = useState({ title: '', description: '', genre: '', ...playlist?.playlists })

  const [trackId, setTrackId] = useState('');

  const [modelOpen, setModalOpen] = useState(false);
  const { mutate: MutateUpdatePlaylist, isLoading: isLoadingUser } = useMutation(_api.updatePlaylist, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        navigate('/admin-playlist')
      } else {
      }
    },
  });

  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const { mutate: removeTrack, isLoading: isLoadingRemove } = useMutation(_api.deleteTrack, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        refetch()
      } else {
      }
    },
  });

  const deletePlaylistTrack = (trackId) => {
    removeTrack({ id: playlist?.playlists._id, trackId })
  }
  const updatePlaylist = (e) => {
    e.preventDefault();
    const form_data = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      form_data.append(key, value);
    }
    MutateUpdatePlaylist({ id: playlist?.playlists._id, ...formData })
  }

  const { data: genreData, isLoading: genreIsLoading, error: genreError } = useQuery(['getGenre'], () => _api.getGenre())
  const genres = genreData?.data || [];



  return <>

    <AdminSideBar />
    <section
      id="artist-profile"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})`, paddingLeft: 220 }}
    >

      <form onSubmit={(e) => updatePlaylist(e)} enctype="multipart/form-data">
        <div class="profile-list">
          <div class="blank-div"></div>
          <div class="profile-heading mt-2">
            <h1>Playlist Update</h1>
          </div>
        </div>
        <div class="artist-uploadbox mx-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div className="flex-between">
                  <div class="w-100 mb-3">
                    <label for="" className="label-form">Playlist Name</label>
                    <input
                      type="text"
                      class="form-control track-name "
                      placeholder="Title"
                      aria-label="Title"
                      aria-describedby="basic-addon1"
                      id="title"
                      name="title"
                      value={formData?.title}
                      onChange={onChangeHandler}
                      required />
                  </div>
                  <div class="w-100 ml-1 ">
                    <label for="" className="label-form">Genre</label>
                    <select
                      class="form-select w-100 custom-select"
                      aria-label="Default select example"
                      id="genre"
                      onChange={onChangeHandler}
                      required>

                      {
                        genres?.length > 0 ?
                          <>
                            {genres?.map((item, _ind) => {
                              return <>
                                <option value={item?.name}>{item?.name}</option>
                              </>
                            })}
                          </>
                          :
                          <></>
                      }
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="" className="label-form">Description</label>
                  <textarea
                    class="form-control track-name "
                    placeholder="Descriptiion"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={onChangeHandler}
                    required></textarea>
                </div>


                {isLoadingPlaylist ? <><h1 ><Loader></Loader></h1></> : <>
                  {playlist?.playlistsTrack?.length > 0 ?
                    <>
                      <div style={{ marginLeft: 10, overflow: "auto", maxHeight: "200px" }} >
                        <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>
                                <span className="mx-3"> Track</span>
                              </th>
                              <th>ARTIST</th>
                              <th>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {playlist?.playlistsTrack?.map((data, index) => {
                              return <>
                                <tr className="space-under">
                                  <td>{index + 1}</td>
                                  <td style={{ textAlign: 'center' }}>
                                    <div className="song-title-main">

                                      <img src={data.image} width={"41px"} height={"41px"} alt="song-image.png" />
                                      <div className="song-text">
                                        <span>
                                          {data?.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>{data?.artistName}</td>
                                  <td style={{ textAlign: 'center' }}>
                                    <Button variant="outline-danger" onClick={() => { deletePlaylistTrack(data._id) }}>Remove</Button>{'  '}
                                  </td>
                                </tr>
                              </>
                            })}
                          </tbody>
                        </Table>
                      </div>

                      <PlayListModal open={modelOpen} close={() => setModalOpen(false)} trackId={trackId} />
                    </>
                    :
                    <>

                      <p className="inside-songs mb-4">
                        No Track.
                      </p>
                    </>

                  }

                </>}
                <div className="mt-3 text-center">
                  {
                    isLoadingPlaylist ?
                      <button type="submit" disabled className="custom-primary-btn d-inline"><span>Loading</span> </button>
                      :
                      <button type="submit" className="custom-primary-btn d-inline"><span>Submit</span></button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </>
}

export default AdminPlaylistEdit;
