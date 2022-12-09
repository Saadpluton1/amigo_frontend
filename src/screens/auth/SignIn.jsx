import React from "react";
import imageUrl from "../../utils/ImageUrl";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import _api from "services/_api";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import { Header } from "components/New";
import Image from "components/Image";

function SignIn() {
  const [data, setData] = useState({ role: '', email: '', password: '' })
  const navigate = useNavigate();
  let user = useAuth();
  const { mutate, isLoading } = useMutation(_api.login, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
        window.dispatchEvent(new Event("storage"))
        toast.success('Login Successfully.')
        if (data?.user?.role == 'artist') {
          if (data?.user?.profileComplete > 50) {
            navigate('/')
          }
          else {
            navigate('/profile')
          }
        }
        else {
          navigate('/')
        }
      }
    },
  });

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

  const signIn = (e) => {
    e.preventDefault();
    mutate(data)
  }


  const onChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  return <>
    <Header />
    <section
      id="login2"
    >
      <div className="container">
        <div className="row py-5 align-items-center">
          <div className="col-lg-6 col-md-7 col-12">
            <form action="" onSubmit={(e) => signIn(e)}>
              <div className="login-box">
                <div className="main-login">
                  <div className="logo-login">
                    <h3 className="form-section-title"><span className="new-primary-text">Log in</span></h3>
                    <img src={imageUrl("logo-sm.svg")} alt="" />
                  </div>
                  <div className="signup-text">
                    <div className="role-box-main mb-3">
                      <div className="role-inner">
                        <input type="radio" required name="role" onChange={onChange} id="user" value={'user'} className="custom-radio" />
                        <label for="user">USER</label>
                      </div>
                      <div className="role-inner">
                        <input type="radio" required name="role" onChange={onChange} id="artist" value={'artist'} className="custom-radio" />
                        <label for="artist" >ARTIST</label>
                      </div>
                    </div>
                    <div className="form-group signup-box mb-3">
                      <label for="email" className="custom-label">Email address</label>
                      <input
                        type="email"
                        className="form-control login-form"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                        id="email"
                        name="email"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group signup-box password-box mb-3">
                      <label for="password" className="custom-label">Password</label>
                      <input
                        type="password"
                        className="form-control login-form"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1 "
                        required
                        id="password"
                        name="password"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group login-padding mb-3">
                      <Link to={"/forget"} className="forgot-anchor">Forgot your password?</Link>
                    </div>
                    <div className="">
                      <div className="remeber-flex">
                        <input type="checkbox" name="remember" id="remember" className="custom-checkbox" />
                        <label for="remember" className="custom-label">Remember me</label>
                      </div>
                    </div>
                  </div>
                  <div className="login-btn-flex login-btn">
                    {isLoading ? <button type="submit" disabled className="new-custom-btn new-primary-btn">Loading</button> :
                      <button type="submit" className="new-custom-btn new-primary-btn">LOG IN</button>}
                  </div>
                  <div className="hr-main">
                    <div className="form-hr"></div>
                  </div>
                  <div className="form-group text-center">
                    <Link to={"/signup"} className="dont-have">Don't have an account?</Link>
                  </div>
                  <div className="form-group mt-3">
                    <Link to={"/signup"} className="new-custom-btn new-primary-btn d-block text-center w-100">SIGN UP FOR AMIGOSOUND</Link>
                  </div>
                  <div className="keplr-div-main mt-4">
                    <span className="login-white-text">Login with your</span>
                    <a href="#">
                      <img src={imageUrl("keplr.png")} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-5 col-12">
            <div className="login-img-main mobile-d-none">
              <Image path={imageUrl('login-img.png')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export { SignIn };
