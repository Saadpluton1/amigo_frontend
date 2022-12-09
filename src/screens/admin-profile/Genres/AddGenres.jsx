import React from "react";
import { AdminSideBar } from "../../../components";
import imageUrl from "utils/ImageUrl";
import { useState } from "react";
import _api from "../../../services/_api"
import {  useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


function AdminAddGenre() {

  const navigate = useNavigate();
  const [preview, setPreview] = useState('logo')
  const [formData, setFormData] = useState({ name: '' , image: '' })
  const { data: genreData, isLoading: genreIsLoading, error: genreError } = useQuery(['getGenre'], () => _api.getGenre())
 

  const { mutate, isLoading } = useMutation(_api.addGenre, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        navigate('/admin-genres')
      } else {
      }
    },
  });
  const onChangeHandler = (e) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      setFormData((prevState) => ({ ...prevState, ['image']: e.target.files[0] }));
      setPreview({ [e.target.name]: URL.createObjectURL(e.target.files[0]) })
    }
  }
  const uploadGenres = async (e) => {
    e.preventDefault();
    const form_data = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if(key === 'subGenre'){
        form_data.append("subGenre", value);
      }else form_data.append(key, value);
    }

    mutate(form_data);
  }



  return (
    <>
      <AdminSideBar />
      <section
        id="artist-profile"
        style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
      >
        <form onSubmit={(e) => uploadGenres(e)} enctype="multipart/form-data">
          <div class="profile-list">
            <div class="blank-div"></div>
            <div class="profile-heading mt-2 mx-5">
              <h1 style={{ paddingLeft: 400 }}>Upload Genres</h1>
            </div>
          </div>
          <div class="artist-uploadbox mt-2">
            <div class="container">
              <div class="row mx-5">
                <div class="col-lg-3">
                  <div class="image-profile">
                    <img
                      src={preview['image'] != undefined ? preview['image'] : imageUrl("image-upload.png")}
                      alt="image-upload.png"
                      class="upload-image"
                    />
                    <a href="#" onClick={(e) => document.getElementById('image').click()} class="photo-upload">
                      {" "}
                      <img src={imageUrl("camera.png")} alt="camera.png" /> add
                      photo/cover
                    </a>
                    <input type="file" accept=".jpeg, .jpg, .png" name="image" className="d-none input-image" id="image" onChange={(e) => handleChangeImage(e)} />
                  </div>
                </div>

                <div class="col-lg-8">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control track-name "
                      placeholder="Genre Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="name"
                      onChange={onChangeHandler}
                      required />

                  </div>
                  {
              isLoading ?
                <button type="submit" disabled className="custom-primary-btn"><span>Loading...</span> </button>
                :
                <button type="submit" className="custom-primary-btn"><span>Create</span> <i class="fa-solid fa-arrow-right-long"></i></button>
            }
    
                   </div>
                  </div>
            </div>
          </div>
        </form>


      </section>
    </>
  );

}

export default AdminAddGenre;
