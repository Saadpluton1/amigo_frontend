import "../assets/css/style.css";
import "../assets/css/responsive.css";
import { Dropdown } from 'react-bootstrap'
import imageUrl from "../utils/ImageUrl";
import { Link, useLocation } from "react-router-dom";
import apis from "services/apis";
import asset from "helper/asset";
import { useQuery } from "@tanstack/react-query";
import useRole from "hooks/useRole";
import useAuth from "hooks/useAuth";
import _api from "../services/_api"
import useDebounce from "hooks/useDebounce";
import { useState } from "react";
import Loader from "./Loader";

function Header() {
  
  const [loader, setLoader] = useState(false);  
  const [formData, setFormData] = useState({ search: "" })
  const { data: searchData, isLoading : isLoadingSearch, isRefetching, refetch, } = useQuery(['getSearch'], () => _api.getSearchFilter(formData), { enabled: false, cacheTime: 0 })
  
  const similarTrack = searchData?.data?.data?.similarTrack || [];
  const similarArtist = searchData?.data?.data?.similarArtist || [];
  const similarPlaylist = searchData?.data?.data?.similarPlaylist || [];
  const similarAlbum = searchData?.data?.data?.similarAlbum || [];
  const result = searchData?.data?.result ;

  useDebounce(call, 500, [formData.search]);

  const onChangeHandler = (e) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  function call() {
    setLoader(true);
    refetch();
    setLoader(false)
}


  const location = useLocation();
  const user = useAuth();
  const checkRole = useRole('artist')

  let pathForshadowlessLogo = [
    "/",
    "/dashboard"
  ];
  const { data, isLoading, error } = useQuery(['getHeaderSetting'], () => apis.getSetting({ page: 'all', section: 'header' }))
  const setting = data?.data?.setting || null;
  let pathMatch = pathForshadowlessLogo.includes(location.pathname);
  return (
    <>
      <div
        className={`nav-bar ${location.pathname === "/" ? "home-header" : "custom-border"
          } `}
      >
        <div className="new-logo-section mt-5">
                    <Link to={'/'}>
                        <img src={imageUrl('logo-sm.svg')} className="logo-sm desktop-d-none" alt="" />
                        <img src={asset(setting?.content?.logo)} alt="" className="mobile-d-none"/>
                    </Link>
                </div>
        <div
          className="main main-bg-color"
          style={{
            backgroundImage: `url(${location.pathname === "/artist-inside"
              ? imageUrl("artist-inside.png")
              : location.pathname === "/playlist-inside"
                ? imageUrl("blur-bg.png")
                : location.pathname === "/charts-inside"
                  ? imageUrl("blur-bg.png")
                  : ""
              })`,
            backgroundPosition: "top",

          }}
        >
          {/* {location.pathname === "/dashboard-myplaylist" ? <>
            <h1>Welcome to dashboard</h1>
          </> : <><div className="custom-box">
            <i className="fa fa-magnifying-glass custom-glass"></i>
            <input
              className="custom-input"
              type="text"
              id="search"
              name="search"
              onChange={onChangeHandler} 
              placeholder="Search"
            />
          </div></>}
           */}
          <div className="search-box-new mobile-d-none mb-3">
          <div className="search">
                            <input id="search" onChange={onChangeHandler} 
                             type="text" placeholder="What do you want to search?" />
                            <i class="fa fa-magnifying-glass search-icon"></i>
                        </div>
        
                        {formData?.search ?
                            <div className="search-container custom-scroll">
                                {isLoading || isRefetching || loader ? <p><Loader></Loader></p> :
                                    <>
                                        {result > 0 ? <>


                                            {similarTrack?.length > 0 ? <>
                                                <h2>{similarTrack?.[0].type}</h2>
                                                {similarTrack?.map((item, _ind) => {
                                                    return <>
                                                        <Link style={{ textDecoration: "none", color: "white" }} to={"/trending-inside/" + item?._id}>
                                                            <h6>
                                                                <img src={item?.image == null ? imageUrl('noimage.png') : item?.image} alt={item?.name} />
                                                                {item?.name}
                                                            </h6>
                                                        </Link>
                                                    </>
                                                })} </> :
                                                <></>}
                                            {similarArtist?.length > 0 ?
                                                <><h2>{similarArtist?.[0].type}</h2>
                                                    {similarArtist?.map((item, _ind) => {
                                                        return <>
                                                            <Link style={{ textDecoration: "none", color: "white" }} to={"/artist-inside/" + item?._id}>
                                                                <h6>
                                                                    <img className="rounde-image" src={item?.image == null ? imageUrl('noimage.png') : item?.image} alt={item?.name} />
                                                                    {item?.name}</h6>
                                                            </Link>
                                                        </>
                                                    })} </> :
                                                <></>}
                                            {similarPlaylist?.length > 0 ?
                                                <><h2>{similarPlaylist?.[0].type}</h2>
                                                    {similarPlaylist?.map((item, _ind) => {
                                                        return <>
                                                            <Link style={{ textDecoration: "none", color: "white" }} to={"/playlist-inside/" + item?._id}>

                                                                <h6>
                                                                    <img className="rounde-image" src={item?.image == null ? imageUrl('noimage.png') : item?.image} alt={item?.title} />
                                                                    {item?.title}</h6>
                                                            </Link>
                                                        </>
                                                    })} </> :
                                                <></>}
                                            {similarAlbum?.length > 0 ?
                                                <><h2>{similarAlbum?.[0].type}</h2>
                                                    {similarAlbum?.map((item, _ind) => {
                                                        return <>
                                                            <Link style={{ textDecoration: "none", color: "white" }} to={"/album-inside/" + item?._id}>

                                                                <h6>
                                                                    <img className="rounde-image" src={item?.image == null ? imageUrl('noimage.png') : item?.image} alt={item?.title} />
                                                                    {item?.title}
                                                                </h6>
                                                            </Link>
                                                        </>
                                                    })} </> :
                                                <></>}
                                        </> : <><h4>No record found</h4></>}
                                    </>
                                }
                            </div>
                            : <></>}
                            </div>
  
          {
            checkRole &&
            <div className="upload">
              <Link to={user != null ? "/artist-profile" : "/sign-in"}>
                {" "}
                <img
                  src={imageUrl(
                    "upload-black.png"
                  )}
                  alt="upload.png"
                />
                <p>Upload</p>
              </Link>
            </div>
          }

          {
            user == null &&
              <Link to={"/sign-in"}  className="custom-home-btn">
                {" "}
                <img src={imageUrl("signin-black.png")} alt="upload.png" />
                <p>LOGIN IN</p>
              </Link>
          }
            {user == null &&
            <Link to={"/signup"} className="custom-home-btn">
              {" "}
              <img src={imageUrl("signin-black.png")} alt="upload.png" />
              <p>SIGN UP</p>
            </Link>
          }
          {
            user != null &&
            <>
              <div
                className={`connect-btn d-none`}
              >
                <a href="#">
                  Connect with <img src={imageUrl("keplr.png")} alt="" />
                </a>
              </div>
              <div
                className={`person`}
              >
              </div>
              <div className={`profile`}
              >
                <Dropdown className="boot-custom-dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Link to="">
                      <img src={user?.image || imageUrl("noimage.png")} alt="" className="rounde-image" />
                    </Link>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="custome-menu">
                    <Dropdown.Item as={Link} to={"/profile"} ><i><img src={user?.image || imageUrl("noimage.png")} alt="" className="rounde-image-menu" /></i> Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to={"/dashboard-myplaylist"} ><i ><img src={imageUrl("dashboard.png")} alt="" className="rounde-image-menu" /></i>Dashboard</Dropdown.Item>
                    <Dropdown.Item style={{ color: "red", marginLeft: "2px" }} as={Link} to={"/Sign-in"} onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                    }}><i class="fa-sharp fa-solid fa-right-from-bracket pe-3"></i>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default Header;
