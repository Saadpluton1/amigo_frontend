import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import imageUrl from "../../../utils/ImageUrl";
import { AdminSideBar } from "../../../components";
import _api from "services/_api";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useAuthenticate from "hooks/useAuthenticate";
import useAuth from "hooks/useAuth";

function AddUsers() {
  useAuthenticate()
  const user = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState('logo')

  const [formData, setFormData] = useState({ email:'',role :'user', name: '', gender: '',  country: '', description: '',url : '', image: '',password : '' })
  let country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
  const { mutate: userMutate, isLoading } = useMutation(_api.adminUserRegistrations, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        navigate('/admin-user')
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
  const createUser = async (e) => {
    e.preventDefault();
    const form_data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      form_data.append(key, value);
    }
    userMutate(form_data);
  }
  return (
    <>
    <AdminSideBar></AdminSideBar>
    <section
      id="artist-profile"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
     <form onSubmit={(e) => createUser(e)} enctype="multipart/form-data">
        <div class="profile-list">
          <div class="blank-div"></div>
          <div class="profile-heading mt-2 mx-5">
            <h1>Add User</h1>
          </div>
        </div>
        <div class="artist-uploadbox mt-2">
          <div class="container">
            <div class="row mx-3">
              <div class="col-lg-4">
                <div class="image-profile">
                  <img
                    src={preview['image'] != undefined ? preview['image'] : user?.image || imageUrl("image-upload.png")}
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
                <div className="flex-between">
                <div class="w-100 mb-3">
                  <label for="" className="label-form">Email</label>
                    <input
                      type="email"
                      class="form-control track-name "
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      id="email"
                      name="email"
                      value={formData?.email}
                      onChange={onChangeHandler}
                      required />
                  </div>
                  <div class="w-100 mb-3 ml-1">
                  <label for="" className="label-form">Name</label>
                    <input
                      type="text"
                      class="form-control track-name "
                      placeholder="Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="name"
                      name="name"
                      value={formData?.name}
                      onChange={onChangeHandler}
                      required />
                  </div>
                  <div class="w-100 mb-3 ml-1">
                  <label for="" className="label-form">Country</label>
                    <select
                      class="form-select w-100 custom-select"
                      aria-label="Default select example"
                      id="country"
                      name="country"
                      onChange={onChangeHandler}
                      required>
                      <option disabled>Select Country</option>
                      {country_list.map((country) =>
                        <option selected={user?.country === country}>{country}</option>)}

                    </select>
                  </div>
                </div>
                <div className="flex-between mb-3">
                  <div className="">
                    <label for="" className="label-form">Gender</label>
                    <div className="radio-flex">
                      <div class="checkbox-1 checkbox">
                        <input onChange={onChangeHandler} class="form-check-input mt-0" type="radio" name="gender" id="gender" value={"male"} />
                        <span>Male</span>
                      </div>
                      <div class="checkbox-1 checkbox">
                        <input onChange={onChangeHandler} class="form-check-input mt-0" type="radio" name="gender" id="gender" value={"female"} />
                        <span>Female</span>
                      </div>
                      <div class="checkbox-1 checkbox">
                        <input onChange={onChangeHandler} class="form-check-input mt-0" type="radio" name="gender" id="gender" value={"All"} />
                        <span>Not to say</span>
                      </div>
                    </div>
                  </div>
                </div>    
                <div class="mt-1">
                  <label for="" className="label-form">Bio</label>
                  <textarea
                    class="form-control track-name "
                    placeholder="Bio"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={onChangeHandler}
                    required></textarea>
                </div>
                <div class="w-100 mb-3 mt-2">
                  <label for="" className="label-form">Add Social Account</label>
                    <input
                      type="text"
                      class="form-control track-name "
                      placeholder="Social Media"
                      aria-label="Social Media"
                      aria-describedby="basic-addon1"
                      id="url"
                      name="url"
                      onChange={onChangeHandler}
                      required />
                  </div>
      
                <div class="w-100 mb-3 mt-2">
                  <label for="" className="label-form">Password</label>
                    <input
                      type="password"
                      class="form-control track-name "
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      id="password"
                      name="password"
                      onChange={onChangeHandler}
                      required />
                  </div>
        
                <div className="mt-3 text-center">
                  {
                    isLoading  ?
                      <button type="submit" disabled className="custom-primary-btn d-inline"><span>Loading</span> </button>
                      :
                      <button type="submit" className="custom-primary-btn d-inline"><span>Submit</span></button>
                  }
                </div>
                <div className="input-group-last">

                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="artist-btn primary-btn my-4">
        </div>
      </form>

      <div class="player">

      </div>
    </section>
    </>
    
  );
}

export default AddUsers;
