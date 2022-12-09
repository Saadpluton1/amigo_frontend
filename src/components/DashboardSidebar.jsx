import React from "react";
import { useState } from "react";
import imageUrl from "../utils/ImageUrl";
import { AddAlbumModal, AddPlayListModal } from "./index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
function DashboardSidebar() {
  const user = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [modelOpen, setModalOpen] = useState(false);
  
  const [modelOpenAlbum, setModalOpenAlbum] = useState(false);
  const location = useLocation();
  return (
    <>
      <div className="position">
        <div
          className={`${open ? "open" : ""} ${
            user?.role == "artist" && (location.pathname == "/artist-profile" ||
            location.pathname == "/complete-track" ||
            location.pathname == "/profile") 
              ? "profile-sidebar"
              : ""
          } custom-container  custom-bar`}
        >
          <i
            className="fa fa-bars bars "
            title="Click me!"
            onClick={() => setOpen(!open)}
          ></i>
          {user?.role == "artist" && (location.pathname == "/artist-profile" ||
          location.pathname == "/complete-track" ||
          location.pathname == "/profile") ? (
            <ul className="menu artist-profile-menu">
             
              <div className="box">
                <p>
                  Profile <span>29%</span> Complete
                </p>
                <div class="completing-bar "></div>
               </div>
              <button class="upload-track-btn" onClick={()=>navigate('/artist-profile')}>
                {" "}
                <img src={imageUrl("upload-music.png")} alt="camera.png" />
                Upload Track
              </button>
              
            </ul>
          ) : (
            <ul className="menu ">
               <li>
              <Link to="/" className = "">
                  <i class="fa-solid fa-house"></i>
                      <span>Home</span>
                    </Link>
                    </li>
              <li>
                    <Link 
                      to="/dashboard-myplaylist"
                      className={`${
                        location.pathname === "/dashboard-myplaylist" ? "active" : ""
                      }`}
                    >
                  <i class="fa-brands fa-tiktok"></i>
                      <span> My playlist</span>
                    </Link>
                  </li>
                 <li>
                 <li>
                 {user.role === "artist" ? 
                    <Link className={`${
                        location.pathname === "/dashboard-myalbum" ? "active" : ""
                      }`} to="/dashboard-myalbum">
                          <i class="fa-solid fa-compact-disc"></i>
                      <span> My Album</span>
                    </Link>
                    : <></>}
                  </li>
                    <Link to="#" onClick={() => setModalOpen(!modelOpen)} 
                     className={`${
                      modelOpen === true ? "active" : ""
                      }`} >
                      <img src={imageUrl("music-logo.png")} alt="" />
                      <span>Add Playlist </span>
                    </Link>
                  </li>
                  <li>
                    <Link className={`${
                        location.pathname === "/myfavourite" ? "active" : ""
                      }`} to="/myfavourite">
                  <i class="fa-solid fa-star"></i>
                      <span> Favourites</span>
                    </Link>
                  </li>
                {user.role === "artist" ? <><li>
                    <Link  className={`${
                        location.pathname === "/dashboard-mytrack" ? "active" : ""
                      }`} to="/dashboard-mytrack">
     <i className="fa-solid fa-music"></i>
                      <span>My Tracks</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => setModalOpenAlbum(!modelOpenAlbum)}
                     className={`${
                      modelOpenAlbum === true ? "active" : ""
                      }`} >
 <i class="fa-regular fa-images"></i>
                      <span>Add Album</span>
                    </Link>
                  </li>
                  
                  </> : <></>}
            </ul>
          )}
        </div>
      </div>
      <AddPlayListModal open={modelOpen} close={() => setModalOpen(false)} />
      
      <AddAlbumModal open={modelOpenAlbum} close={() => setModalOpenAlbum(false)} />
    </>
  );
}

export default DashboardSidebar;
