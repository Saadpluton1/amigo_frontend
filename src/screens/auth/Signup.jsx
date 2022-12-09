import React, { useEffect, useState } from "react";
import imageUrl from "../../utils/ImageUrl";
import { Link ,useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import _api from "services/_api";
import { toast } from "react-toastify";
import { Header } from "components/New";
import Image from "components/Image";
import useAuth from "hooks/useAuth";


function Signup() {
  const navigate = useNavigate();
  const user = useAuth();
  const [data, setData] = useState({ role: '', email: ''})
  const { mutate, isLoading } = useMutation(_api.userEmailSignUp, {
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
  return <>
  <Header/>
      <section
      id="login2"
    >
      <div className="container">
        <div className="texture-bg mt-5 mb-5">
        <div className="row py-5 align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <form action="" onSubmit={(e) => signUp(e)}>
              <div className="login-box">
              <h3 className="form-section-title"><span className="new-primary-text">Sign Up</span></h3>
              <h4 className="sign-head-text">Sign me up as</h4>
              <div className="role-box-main mt-3">
                <div className="role-inner">
                  <input type="radio" name="role" required onChange={onChange} id="user" value={'user'} className="custom-radio"/>
                  <label for="user">USER</label>
                </div>
                <div className="role-inner">
                  <input type="radio" name="role" required onChange={onChange} id="artist" value={'artist'} className="custom-radio"/>
                  <label for="artist" >ARTIST</label>
                </div>
              </div>
                <div className="main-login">
                  <div className="signup-text">
                    <div className="form-group signup-box mb-3">
                    <label for="email" className="custom-label">Email address</label>
                      <input
                        type="email"
                        className="form-control login-form"
                        id="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="">
                      <div className="remeber-flex align-items-start">
                        <input type="checkbox" name="terms" required id="remember" className="custom-checkbox" />
                        <label for="remember" className="custom-label">I have read and agree to AmigoSound<br/>Terms of use and Privacy Policy</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                  {isLoading ? <button type="submit" disabled className="new-custom-btn new-primary-btn w-100">Loading</button>
                 : <button type="submit" className="new-custom-btn new-primary-btn w-100">SIGN ME UP!</button>
                 }
                  </div>
                  <div className="keplr-div-main mt-4">
                    <span className="login-white-text">Sign up with</span>
                    <a href="#">
                      <img src={imageUrl("keplr.png")} alt="" />
                    </a>
                  </div>

                  <div className="mt-5 alread-account">
                    <span className="login-white-text">Have an Account?</span>
                    <Link to={'/sign-in'} className="new-custom-btn new-primary-btn ">
                       LOG IN
                    </Link>
                  </div>
                 
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="signup-img-section mobile-d-none">
              <Image path={imageUrl('signup-img.png')}/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  </>
}

export default Signup;
