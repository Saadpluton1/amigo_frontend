import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/useAuth";
import useAuthenticate from "hooks/useAuthenticate";
import useRole from "hooks/useRole";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _api from "services/_api";

function AddPlayListModal({ open, close }) {
  const checkRole = useRole('admin');
  const checkRoleUser = useRole('user');
  const checkRoleArtist = useRole('artist');

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();

  const { data: genreData, isLoading: genreIsLoading, error: genreError } = useQuery(['getGenre'], () => _api.getGenre())
  const genres = genreData?.data || [];

  let [data, setData] = useState({ title: '', genre: '', description: '', privacy: false, userId: user?._id, artistId: user?._id })

  const { mutate, isLoading } = useMutation(_api.storePlaylist, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        close(false);
        if (user.role === "admin") {
          navigate('/admin-playlist')
        }
        else{
          navigate('/playlist')
        }
      } else {

      }
    },
  });
  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({ ...prevState, [id]: value }));
  };
  const storePlaylist = async (e) => {
    e.preventDefault();
    if (checkRole || checkRoleUser || checkRoleArtist) {
      if (checkRoleArtist) {
        let { userId, ...restData } = data
        mutate(restData)
      }
      if (checkRoleUser || checkRole) {
        let { artistId, ...restData } = data
        mutate(restData)
      }
    }
    else {
      toast.error('You are not a user')
    }
  }
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
                Add New Playlist
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
                placeholder="Name your playlist"
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
              </div>
            </div>
            <div className="modal-footer" >
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <div className="checkbox-1 checkbox">
                    <input
                      className="form-check-input mt-0"
                      type="radio"
                      value={true}
                      required
                      onChange={onChangeHandler}
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
                      aria-label="Checkbox for following text input"
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

export default AddPlayListModal;
