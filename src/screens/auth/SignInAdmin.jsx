import React from "react";
import imageUrl from "../../utils/ImageUrl";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import _api from "services/_api";
import { toast } from "react-toastify";
import { useState } from "react";
import {Button } from "react-bootstrap";
import { useEffect } from "react";
import useAuth from "hooks/useAuth";

function SignInAdmin() {
  const [data, setData] = useState({ role: 'admin', email: '', password: '' })
  const navigate = useNavigate();
const user = useAuth();
  const { mutate, isLoading } = useMutation(_api.login, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
        toast.success('Login Successfully.')
        if (data?.user?.role == 'admin') {
          navigate('/admin-profile')
        }
        else {
          navigate('/')
        }
      } else {
      }
    },
  });
  const signIn = (e) => {
    e.preventDefault();
    mutate(data)
  }
  useEffect(() => {
    if (user) {
      switch (user?.role) {
        case "admin":
          navigate('/admin-profile');
          break;
        case "user":
          navigate('/');
          break;
        case "artist":
          navigate('/')
          break;
        default:
          navigate('/')
      }
    }
  }, [user]);

  const onChange = (e) => {
    const { id, value } = e.target;
    setData(prevData => ({ ...prevData, [id]: value }));
  }
  return (
    <section
      id="login2"
      style={{ backgroundImage: `url(${imageUrl("login-bg.png")})` }}
    >
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-6">
            <form action="" onSubmit={(e) => signIn(e)}>
              <div className="login-box">
              <img src={imageUrl("logo-shadowless.png")} alt="" />
                <div className="main-login">
                <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                    {/* <Button className="custom-primary-Homebtn" as={Link} to={`/`} variant="danger"><i className="fa-solid fa-arrow-left-long"></i>Home</Button>
                  */}
                  </div>
                  <div className="logo-login justify-content-center">
                    
                    <h2>AMIGO SOUND</h2>
             
                  </div>
                  <div className="signup-text">
                    <h3>SIGN IN</h3>
                    <div className="input-group signup-box mb-3">
                      <input
                        type="email"
                        className="form-control login-form"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                        id="email"
                        onChange={onChange}
                      />
                    </div>
                    <div className="input-group signup-box password-box mb-3">
                      <input
                        type="password"
                        className="form-control login-form"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1 "
                        required
                        id="password"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="container" style={{marginLeft : "120px",marginTop:10, marginBottom:15}}>
                  <Link to ="/sign-in">Login as a user</Link>
                  
                  </div>
                 
                  {isLoading ? <div className="continue-btn primary-btn" style={{marginTop : 40}}>
                    <button type="submit" disabled className="custom-primary-btn">Loading <i className="fa-solid fa-arrow-right-long"></i></button>
                  </div> : <div className="continue-btn primary-btn" style={{marginTop : 40}}>
                    <button type="submit" className="custom-primary-btn" >Continue <i className="fa-solid fa-arrow-right-long"></i></button>
                  </div>}
                 
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

export default SignInAdmin;
