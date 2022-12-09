import { useState } from "react";
import imageUrl from "../utils/ImageUrl";
import { Header, Sidebar } from "./index";
import { Link } from "react-router-dom";
import apis from "services/apis";
import asset from "helper/asset";
import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/useAuth";

function HomeBanner() {
  const user = useAuth();
  const [open, setOpen] = useState(true);
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'home', section: 'banner' }))
  const setting = data?.data?.setting || null;
  
  return (
    <>
      <section id="banner">
        <div className="bg-image">
          <img src={asset(setting?.content?.image)} alt="" />
        </div>
        <Header />
        <Sidebar barOpen={open} barClose={() => setOpen(!open)} />

        <div
          className={`main-heading ${open ? "justify-content-center mx-4" : ""
            }`}
        >
          <div className="heading-inside">
            <h1>{setting?.content?.heading}</h1>
            <p>{setting?.content?.sub_heading}</p>
            <div className="signup-btn mt-5">
              {
                user == null && 
                <Link to={"/signup"}>
                <img src={imageUrl("signup.png")} alt="" /> Sign Up Now
              </Link>
              }
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeBanner;
