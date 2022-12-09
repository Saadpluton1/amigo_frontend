import React, { useState } from "react";
import imageUrl from "../../utils/ImageUrl";
import { Link} from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import _api from "services/_api";
import { toast } from "react-toastify";

function ForgetPassword() {
 
  const [data, setData] = useState({ email: '' , role : ''})

  const { mutate, isLoading } = useMutation(_api.userEmailPasswordForget, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data?.message)
    }
  }
  });
  
  const signUp = (e) => {
    e.preventDefault();
    mutate(data)
  }

 
  const onChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }
 

  return (
    <section
      id="login2"
      style={{ backgroundImage: `url(${imageUrl("login-bg.png")})` }}
    >
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-6">
            <form action="" onSubmit={(e) => signUp(e)}>
              <div className="login-box">
                <div className="main-login">
                  <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                    <Button className="custom-primary-Homebtn" as={Link} to={`/`} variant="danger"><i className="fa-solid fa-arrow-left-long"></i>Home</Button>
                  </div>
                  <div className="logo-login ">
                    <img src={imageUrl("logo-shadowless.png")} alt="" />
                    <h2>AMIGO</h2>
                    <span>SOUND</span>
                  </div>
                  <div className="signup-text">
                    <h3 >Forget Password</h3>
                    
                    <div className="role-box-main mb-3 mx-5">
                      <div className="role-inner">
                        <input type="radio" required  name="role"  onChange={onChange} id="user" value={'user'} className="custom-radio" />
                        <label for="user">USER</label>
                      </div>
                      <div className="role-inner">
                        <input type="radio" required  name="role"  onChange={onChange} id="artist" value={'artist'} className="custom-radio" />
                        <label for="artist" >ARTIST</label>
                      </div>
                    </div>
                    <div className="input-group signup-box mb-3">
                      <input
                        type="email"
                        className="form-control login-form"
                        id="email"
                        name = "email"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>

                  {isLoading ? <div className="continue-btn primary-btn">
                    <button type="submit" disabled className="custom-primary-btn">Loading <i className="fa-solid fa-arrow-right-long"></i></button>
                  </div> : <div className="continue-btn primary-btn">
                    <button type="submit" className="custom-primary-btn">Continue <i className="fa-solid fa-arrow-right-long"></i></button>
                  </div>}
                  <div className="keplr-btn primary-btn my-4">
                    <a href="#">
                      Sign Up With <img src={imageUrl("keplr.png")} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-6">
            <div className="login-info">
              <div className="share-music">
                <img src={imageUrl("disc-logo.png")} alt="" />
                <h5>Upload and Share your music</h5>
              </div>
              <div className="share-music">
                <img src={imageUrl("headphones.png")} alt="" />
                <h5>Listen to your favorite artists</h5>
              </div>
              <div className="share-music">
                <img src={imageUrl("speakers.png")} alt="" />
                <h5>Create and publish playlists</h5>
              </div>
              <div className="share-music">
                <img src={imageUrl("disc2.png")} alt="" />
                <h5>
                  <span>...</span> and much more
                  <span> !</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;
