import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/useAuth";
import useRole from "hooks/useRole";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _api from "services/_api";

function AddAlbumModal({ open, close }) {
  const user = useAuth();
  
  const [selected, setSelected] = useState([]);
  
  const {data : trackData, isLoading} = useQuery(['getArtistTrack'], () => _api.getArtistTrack(user?._id))
  const songs = trackData?.data || [];
  
  console.log(songs , "SONGS")
  const checkRoleArtist = useRole('artist');

  const navigate = useNavigate();

  const { data: genreData} = useQuery(['getGenre'], () => _api.getGenre())
  const genres = genreData?.data || [];
  let [data, setData] = useState({ title: '', genre: '', description: '',trackId : selected, privacy: false, artistId: user?._id })

  const { mutate } = useMutation(_api.storeAlbum, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        close(false);
          navigate('/dashboard-myalbum')
      }
    },
  });
  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({ ...prevState, [id]: value }));
  };
  const storePlaylist = async (e) => {
    e.preventDefault();
      if (checkRoleArtist) {
        mutate({ ...data, trackId : selected})
      }
    else {
      toast.error('You are not a artist')
    }
  }

  const onSelectHandler = (id) => {
    const currentIndex = selected.indexOf(id);
    if (currentIndex === -1) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((_id) => _id !== id));
      }
  };

  console.log('SELECTED ->', selected)

  return (
    <div
      className={open ? "modal d-block" : "modal fade"}
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form action="" onSubmit={(e) => storePlaylist(e)}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Album
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={close}
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                list="datalistOptions"
                placeholder="Name your album"
                required
                id="title"
                onChange={onChangeHandler}

              />
              <select
                class="form-select w-100 mt-2"
                
                aria-label="Default select example"
                id="genre"
                onChange={onChangeHandler}
                required>
                <option style={{ background : "white"}} selected disabled value={''}>Pick a Genre</option>
                {
                  genres?.length > 0 ?
                    <>
                      {genres?.map((item, _ind) => {
                        return <>
                          <option style={{ background : "white"}} value={item?.name}>{item?.name}</option>
                        </>
                      })}
                    </>
                    :
                    <></>
                }
              </select>
              <div class="form-floating mt-2">
                <textarea
                  class="form-control"
                  placeholder="Descriptiion"
                  id="description"
                  onChange={onChangeHandler}
                  required></textarea>
                {/* <label for="floatingTextarea">Comments</label> */}
              </div>
            </div>
            <div style={{overflow: "auto", maxHeight: "150px"}}>

            <Table responsive bordered hover size="sm" variant="dark" className="dash-custome-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {songs.length > 0 ? (
                  songs.map((item, i) => {
                    return (
                      <>
                        <tr key={item.id} style={{ textAlign: 'center'}}>
                          <td> <img src={item?.image} width={"41px"} height={"41px"} alt="image" />
                                                       </td>

                          <td>{item?.name}</td>
                          <td><input  style={{ marginTop : '12px'}} type="checkbox" onClick={() => onSelectHandler(item?._id)}></input></td>
                        </tr>
                      </>
                    )
                  })
                ) : (
                  <tr style={{ textAlign: 'center' }} >
                    <td colSpan={7}>No Track</td>
                  </tr>
                )}

              </tbody>
            </Table>
            
            </div>
            <div className="modal-footer" >
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <div className="checkbox-1 checkbox">
                    <input
                      className="form-check-input mt-0"
                      type="radio"
                      value={true}
                      // checked={check1}
                      required
                      onChange={onChangeHandler}
                      // onClick={() => {
                      //   setCheck1(!check1);
                      //   setCheck2(false);
                      // }}
                      name="flex-radio-default"
                      id="privacy"
                      aria-label="Checkbox for following text input"
                    />

                    <span>set as private</span>
                  </div>
                  <div className="checkbox-2  checkbox">
                    <input
                      className="form-check-input mt-0"
                      type="radio"
                      name="flex-radio-default"
                      id="privacy"
                      value={false}
                      required
                      onChange={onChangeHandler}
                      // checked={check2}
                      aria-label="Checkbox for following text input"
                    // onClick={() => {
                    //   setCheck2(!check2);
                    //   setCheck1(false);
                    // }}
                    />
                    <span>set as public</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-modal">
              <button
                type="submit"
                className="btn btn-primary btn-custom"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAlbumModal;
