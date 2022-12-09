import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageUrl from "../../utils/ImageUrl";
import _api from "services/_api";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useAuthenticate from "hooks/useAuthenticate";
import useAuth from "hooks/useAuth";
import { Header } from "components/New";
import Image from "components/Image";
import { Col, Row } from "react-bootstrap";

function Profile() {
  useAuthenticate()
  let country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  const user = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState('logo')
  const [preview2, setPreview2] = useState('logo')
  let { _id , trackId, ...restData } = user;

  let [formData, setFormData] = useState({ name: '', gender: user?.gender, country: '', url : "", description: '', image: '',cover:'', ...restData })
  
  const { mutate, isLoading } = useMutation(_api.updateArtistProfile, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        localStorage.setItem("user", JSON.stringify(data?.artist))
        if (user.profileComplete > 50) {
          navigate('/')
        }
        else {
          navigate('/artist-profile')
        }
      } else {
      }
    },
  });


  const { mutate: userMutate, isLoading: isLoadingUser } = useMutation(_api.updateUserProfile, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        localStorage.setItem("user", JSON.stringify(data?.user))
        navigate('/')
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
  const handleChangeCover = e => {
    if (e.target.files[0]) {
      setFormData((prevState) => ({ ...prevState, ['cover']: e.target.files[0] }));
      setPreview2({ [e.target.name]: URL.createObjectURL(e.target.files[0]) })
    }
  }
  const updateProfile = async (e) => {
    e.preventDefault();
    const form_data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      form_data.append(key, value);
    }
    if (user?.role === "user") {
      userMutate(form_data);

    }
    if (user?.role === "artist")
      mutate(form_data);
  }
  return <>
    <Header />
    <section>
      <form onSubmit={(e) => updateProfile(e)} enctype="multipart/form-data">

        <div class="mt-5">
          <div class="container">
            <div className="texture-bg new-big-form mt-5 mb-5">
            <div class="row">
              <div className="col-lg-4 col-md-6 col-12">
              <div>
              <div className="profile-logo">
                <Image path={imageUrl('logo.png')}/>
              </div>
              <h3 className="form-section-title"><span className="new-primary-text">Profile Update</span></h3>
              </div>
              </div>
              <div className="col-lg-8 col-md-6 col-12">
              <div className="profile-cover">
              <img
                  src={preview2['cover'] != undefined ? preview2['cover'] : user?.cover || imageUrl("profile-cover.png")}
                  alt="image-upload.png"
                  class="upload-image"
                />
              <input type="file" name="cover" accept=".jpeg, .jpg, .png" className="d-none input-image" id="cover" onChange={(e) => handleChangeCover(e)} />
              <div className="flex-end">
              <button className="new-custom-btn new-primary-btn mt-2" type="button" onClick={(e) => document.getElementById('cover').click()}>UPLOAD PROFILE COVER</button>
              </div>
              </div>
              </div>
            </div>
            <div class="row gy-3">
              <div class="col-lg-4 col-md-5">
                <div class="image-profile">
                <label for="image" className="custom-label mb-2">Setup your image profile</label>
                  <img
                    src={preview['image'] != undefined ? preview['image'] : user?.image || imageUrl("image-upload.png")}
                    alt="image-upload.png"
                    class="upload-image"
                  />
                  <input type="file" accept=".jpeg, .jpg, .png" name="image" className="d-none input-image" id="image" onChange={(e) => handleChangeImage(e)} />
                  <button type="button" className="new-custom-btn new-primary-btn mt-3" onClick={(e) => document.getElementById('image').click()}>UPLOAD IMAGE</button>
           
                </div>

              </div>
              <div class="col-lg-8 col-md-7">
                <Row>
                  <Col lg={6}>
                  <div class="form-group signup-box mb-3">
                    <label for="name" className="custom-label">Name</label>
                    <input
                      type="text"
                      class="form-control login-form"
                      placeholder="Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="name"
                      name="name"
                      value={formData?.name}
                      onChange={onChangeHandler}
                      required />
                  </div>
                  </Col>
                  <Col lg={6}>
                  <div class="form-group signup-box mb-3">
                    <label for="country" className="custom-label">Country</label>
                    <select
                      class="form-control login-form"
                      aria-label="Default select example"
                      id="country"
                      name="country"
                      value={formData?.country}
                      defaultValue = "Pakistan"
                      onChange={onChangeHandler}
                      required>
                      <option disabled>Select Country</option>
                      {country_list.map((country) =>
                        <option selected={user?.country === country}>{country}</option>)}

                    </select>
                  </div>
                  </Col>
                  <Col lg={12}>
                  <div className="form-group signup-box mb-3">
                    <label for="" className="custom-label">Gender</label>
                    <div className="radio-flex">
                      <div class="checkbox-1 checkbox">
                        <input onChange={onChangeHandler} class="custom-radio mt-0" type="radio" defaultChecked={user?.gender == "male" ? true : false} name="gender" id="gender" value={"male"} />
                        <span>Male</span>
                      </div>
                      <div class="checkbox-1 checkbox">
                        <input onChange={onChangeHandler} class="custom-radio mt-0" type="radio" defaultChecked={user?.gender == "female" ? true : false} name="gender" id="gender" value={"female"} />
                        <span>Female</span>
                      </div>
                      <div class="checkbox-1 checkbox">
                        <input onChange={onChangeHandler} class="custom-radio mt-0" type="radio" defaultChecked={user?.gender == "All" ? true : false} name="gender" id="gender" value={"All"} />
                        <span>Not to say</span>
                      </div>
                    </div>
                  </div>
                  </Col>
                  <Col lg={12}>
                  <div class="form-group signup-box mb-3 mt-2">
                  <label for="" className="custom-label">Add Social Account</label>
                    <input
                      type="text"
                      class="form-control  login-form"
                      placeholder="Social Media"
                      aria-label="Social Media"
                      aria-describedby="basic-addon1"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={onChangeHandler}
                      />
                      </div>
                  </Col>
                  <Col lg={12}>
                  <div class="form-group signup-box mb-3">
                  <label for="description" className="custom-label">Bio</label>
                  <textarea
                    class="form-control login-form"
                    placeholder="Bio"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={onChangeHandler}
                    ></textarea>
                    </div>
                  </Col>
                
                  <Col>
                  <div className="flex-end">
                    {
                      isLoadingUser ?
                        <button type="submit" disabled className="new-custom-btn new-primary-btn profile-submit"><span>Loading</span> </button>
                        :
                        <button type="submit" className="new-custom-btn new-primary-btn profile-submit"><span>SUBMIT</span></button>
                    }
                  </div>
                  </Col>
                </Row>
              </div>
            </div>
            </div>
          </div>

        </div>
      </form>
    </section>
  </>
}

export default Profile;
