import React from "react";
import imageUrl from "../../utils/ImageUrl";
import {useNavigate } from "react-router-dom";
import _api from "./../../services/_api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {useSearchParams} from 'react-router-dom';
import { Header } from "components/New";

function CreatePassword({ email,role,password,repassword,onChange }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const navigate = useNavigate(); 



const {mutate, isLoading} = useMutation(_api.userRegistrations, {
    onError: function(error){
      toast.error(error.toString())
    },
    onSuccess: ({data}) => {
      if (data.status) {
        toast.success(data?.message)
        localStorage.setItem("user", JSON.stringify(data?.user));
        window.dispatchEvent(new Event("storage"))
        if(data?.user?.role == 'artist'){
          navigate('/profile');
        }
        else{
          navigate('/');
        }
      } else {
      }
    },
  });
  
  const signUp = (e) => {
    e.preventDefault();
    if(password == repassword){
     let data = {password:password , ...params}
     mutate(data)
    }
    else{
      toast.error('Password confirmation not matched.')
    }
  };
  return <>
  <Header/>
  <section
    >
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-12">
            <div className="login-box">
              <div className="main-login">
              <div className="logo-login">
                <h3 className="form-section-title">
                  <span className="new-primary-text">Create a passowrd that is easy to remember</span>
                  </h3>
                <img src={imageUrl("logo-sm.svg")} alt="" />
              </div>
                
                <form action="#" onSubmit={(e)=>signUp(e)}>
                  <div className="signup-text">
                    <div className="form-group signup-box password-box mb-3">
                      <label for="password" className="custom-label">Password</label>
                      <input
                        type="password"
                        className="form-control login-form"
                        placeholder="Password"
                        aria-label="Username"
                        id="password"
                        name="password"
                        required
                        onChange={onChange}
                        aria-describedby="basic-addon1 "
                      />
                    </div>
                    <div className="form-group signup-box password-box">
                      <label for="repassword" className="custom-label">Re-type Password</label>
                      <input
                        type="password"
                        className="form-control login-form"
                        placeholder="Re-type Password"
                        aria-label="Username"
                        id="repassword"
                        name="repassword"
                        required
                        aria-describedby="basic-addon1 "
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <div className="form-group mt-4">
                  {isLoading ? <button type="submit" disabled className="w-100 new-custom-btn new-primary-btn">Loading</button>
                    : <button type="submit" className="w-100 new-custom-btn new-primary-btn">Submit</button>
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default CreatePassword;
