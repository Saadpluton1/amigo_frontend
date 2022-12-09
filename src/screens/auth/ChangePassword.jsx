import React, { useState } from "react";
import imageUrl from "../../utils/ImageUrl";
import {useNavigate } from "react-router-dom";
import _api from "./../../services/_api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useSearchParams } from 'react-router-dom';

function ChangePassword() {
  const [datas, setData] = useState({password: '', repassword: '' })
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(_api.updatePassword, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success('Password Updated Successfully.')
        localStorage.setItem("user", JSON.stringify(data?.user));
        window.dispatchEvent(new Event("storage"))
        navigate('/Sign-in');
      } else {
      }
    },
  });

  const signUp = (e) => {
    e.preventDefault();
    if (datas.password == datas.repassword) {
      let data = { password: datas.password, ...params }
      mutate(data)
    }
    else {
      toast.error('Password confirmation not matched.')
    }
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setData(prevData => ({ ...prevData, [id]: value }));
  }
  return (
    <section
      id="password"
      style={{ backgroundImage: `url(${imageUrl("login-bg.png")})` }}
    >
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-6">
            <div className="login-box">
              <div className="main-login">
                <div className="logo-login password-text">
                  <h2>Update a passowrd that is easy to remember</h2>
                </div>
                <form action="#" onSubmit={(e) => signUp(e)}>
                  <div className="signup-text">
                    <div className="input-group signup-box password-box mb-3">
                      <input
                        type="password"
                        className="form-control login-form"
                        placeholder="Password"
                        aria-label="Username"
                        id="password"
                        required
                        onChange={onChange}
                        aria-describedby="basic-addon1 "
                      />
                    </div>
                    <div className="input-group signup-box password-box mt-5">
                      <input
                        type="password"
                        className="form-control login-form"
                        placeholder="Re-type Password"
                        aria-label="Username"
                        id="repassword"
                        required
                        aria-describedby="basic-addon1 "
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <div className="terms-text">
                    <p>
                      By clicking continue, you state you have read and agree to
                      Amigo’ Terms of Use and Privacy Policy
                    </p>
                    {isLoading ? <div className="continue-btn primary-btn mt-3">
                      <button type="submit" disabled className="custom-primary-btn">Loading <i className="fa-solid fa-arrow-right-long"></i></button>
                    </div> : <div className="continue-btn primary-btn">
                      <button type="submit" className="custom-primary-btn mt-3">Continue <i className="fa-solid fa-arrow-right-long"></i></button>
                    </div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
