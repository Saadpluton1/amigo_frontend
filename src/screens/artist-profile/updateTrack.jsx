import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imageUrl from "../../utils/ImageUrl";
import _api from "services/_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuthenticate from "hooks/useAuthenticate";
import useAuth from "hooks/useAuth";
import { Header } from "components/New";
import { useEffect } from "react";

function UpdateTrack() {
  let { id } = useParams();

  useAuthenticate();
  const user = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("logo");

  const {
    data: genreData,
    isLoading: genreIsLoading,
    error: genreError,
  } = useQuery(["getGenre"], () => _api.getGenre());
  const genres = genreData?.data || [];

  const {
    data: trackData,
    isLoading: trackIsLoading,
    error: trackError,
  } = useQuery(["getTrack"], () => _api.getOneTrack(id));
  const track = trackData?.data?.songs || [];

  useEffect(() => {
    if (track) {
      setFormData(track);
    }
  }, [track]);
  let [formData, setFormData] = useState({
    name: "",
    genre: "",
    description: "",
    artistId: user?._id,
    image: "",
    ...track,
  });

  const { mutate, isLoading } = useMutation(_api.updateTrack, {
    onError: function (error) {
      toast.error(error.toString());
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data?.message);
        navigate("/my-music");
      }
    },
  });
  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setFormData((prevState) => ({
        ...prevState,
        ["image"]: e.target.files[0],
      }));

      setPreview({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
    }
  };
  const uploadTrack = async (e) => {
    e.preventDefault();
    const form_data = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      form_data.append(key, value);
    }
    mutate({ id: id, form_data });
  };
  return (
    <>
      <Header />
      <section>
        <form onSubmit={(e) => uploadTrack(e)} enctype="multipart/form-data">
          <div class="mt-3">
            <div class="container">
              <div className="texture-bg new-big-form mt-5 mb-5">
                <div class="profile-list">
                  <div className="flex-end mb-3">
                    <h3 className="form-section-title">
                      <span className="new-primary-text">
                        Update Your Track
                      </span>
                    </h3>
                  </div>
                </div>
                <div class="row mx-3">
                  <div class="col-lg-4">
                    <div class="image-profile ">
                      <label for="image" className="custom-label mb-2">
                        Track Cover
                      </label>
                      <img
                        src={
                          preview["image"] != undefined
                            ? preview["image"]
                            : formData?.image || imageUrl("image-upload.png")
                        }
                        alt="image-upload.png"
                        class="upload-image"
                      />
                      <input
                        type="file"
                        name="image"
                        accept=".jpeg, .jpg, .png"
                        className="d-none input-image"
                        id="image"
                        onChange={(e) => handleChangeImage(e)}
                      />
                      <button
                        type="button"
                        className="new-custom-btn new-primary-btn mt-3"
                        onClick={(e) =>
                          document.getElementById("image").click()
                        }
                      >
                        UPLOAD COVER
                      </button>
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div className="row">
                      <div className="col-6">
                        <div class="form-group signup-box mb-3">
                          <label for="name" className="custom-label">
                            Track Title
                          </label>
                          <input
                            type="text"
                            class="form-control login-form"
                            placeholder="Track Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            id="name"
                            name="name"
                            value={formData?.name}
                            onChange={onChangeHandler}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group signup-box mb-3">
                          <label for="genre" className="custom-label">
                            Pick a Genre
                          </label>
                          <select
                            class="form-select login-form"
                            aria-label="Default select example"
                            id="genre"
                            value={formData?.genre}
                            onChange={onChangeHandler}
                            required
                          >
                            <option selected disabled value={""}>
                              Pick a Genre
                            </option>
                            {genres?.length > 0 ? (
                              <>
                                {genres?.map((item, _ind) => {
                                  return (
                                    <>
                                      <option value={item?.name}>
                                        {item?.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group signup-box mb-3">
                          <label for="description" className="custom-label">
                            Track description
                          </label>
                          <textarea
                            class="form-control login-form"
                            placeholder="Descriptiion"
                            id="description"
                            value={formData?.description}
                            onChange={onChangeHandler}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-12">
                        <div class="artist-btn primary-btn my-4">
                          {isLoading ? (
                            <button
                              type="submit"
                              disabled
                              className="new-custom-btn new-primary-btn"
                            >
                              <span>Loading...</span>{" "}
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="new-custom-btn new-primary-btn"
                            >
                              <span>UPLOAD</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="player"></div>
      </section>
    </>
  );
}

export default UpdateTrack;
