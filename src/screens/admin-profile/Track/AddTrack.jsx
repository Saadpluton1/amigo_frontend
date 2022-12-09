import React from "react";
import { AdminSideBar } from "../../../components";
import imageUrl from "utils/ImageUrl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import _api from "../../../services/_api"
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";


function AdminAddTrack() {
  const user = useAuth()
  const navigate = useNavigate();
    const [preview, setPreview] = useState('logo')
    const [formData, setFormData] = useState({ name: '', genre: '', description: '' , userId : user?._id , image: '', audio: '' })
  
    const {data : genreData, isLoading : genreIsLoading, error : genreError} = useQuery(['getGenre'], () => _api.getGenre())
    const genres = genreData?.data || [];
    
    const { mutate, isLoading } = useMutation(_api.storeTrack, {
        onError: function (error) {
            toast.error(error.toString())
        },
        onSuccess: ({ data }) => {
            if (data.status) {
                toast.success(data.message)
                if(user.role === "admin")
                {
                  navigate('/admin-track')
                }
            } else {
            }
        },
    });
    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [id]: value }));
      };
      const handleAudio = (e) =>{
        if(e.target.files[0]){
          setFormData((prevState) => ({ ...prevState, ['audio']: e.target.files[0] }));
        }
      }
      const handleChangeImage = e => {
        if (e.target.files[0]) {
          setFormData((prevState) => ({ ...prevState, ['image']: e.target.files[0] }));
          setPreview({ [e.target.name]: URL.createObjectURL(e.target.files[0]) })
        }
      }
      const uploadTrack = async (e) => {
        e.preventDefault();
        const form_data = new FormData();
    
        for (const [key, value] of Object.entries(formData)) {
          form_data.append(key, value);
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
      <form onSubmit={(e) => uploadTrack(e)} enctype="multipart/form-data">
        <div class="profile-list">
          <div class="blank-div"></div>
          <div class="profile-heading mt-4 mx-5">
            <h1>Upload Track</h1>
          </div>
        </div>
        <div class="artist-uploadbox mt-3">
          <div class="container">
            <div class="row mx-5">
              <div class="col-lg-4">
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
                    placeholder="Track Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    id="name"
                    onChange={onChangeHandler}
                    required />
                </div>

                <div className="flex-between">
                  <select
                    class="form-select w-100 custom-select"
                    aria-label="Default select example"
                    id="genre"
                    onChange={onChangeHandler}
                    required>
                    <option selected disabled value={''}>Pick a Genre</option>
                    {
                      genres?.length > 0 ?
                      <>
                      {genres?.map((item,_ind)=>{
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
                <div className="flex-between">
                </div>
                  <div class="form-floating mt-3">
                  <textarea
                    class="form-control track-name "
                    placeholder="Descriptiion"
                    id="description"
                    onChange={onChangeHandler}
                    required></textarea>
                </div>
                <div className="mt-2">
                  <label htmlFor="">Upload Audio</label>
                  <input
                  accept=".mp3, .mpeg"
                    type="file"
                    class="form-control mt-1 track-name "
                    placeholder="Track Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    id="audio"
                    onChange={handleAudio}
                    required />
                </div>
                <div className="input-group-last">
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="artist-btn primary-btn mx-5">
        
        {
          isLoading ? 
          <button type="submit" disabled className="custom-primary-btn"><span>Loading...</span> </button>
          :
          <button type="submit" className="custom-primary-btn"><span>Continue</span> <i class="fa-solid fa-arrow-right-long"></i></button>
        }
        </div>
      </form>

      <div class="player">
       
      </div>
    </section>
        </>
    );

}

export default AdminAddTrack;
