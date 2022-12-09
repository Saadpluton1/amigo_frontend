import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import { Link, NavLink, useLocation } from "react-router-dom";
import apis from "services/apis";
import imageUrl from "utils/ImageUrl";
import { Dropdown } from "react-bootstrap";
import useAuth from "hooks/useAuth";
import { useDispatch } from "react-redux";
import reduxApis from "redux/api";
import { useEffect } from "react";
import { useState } from "react";
import _api from "../../services/_api";
import useDebounce from "hooks/useDebounce";
import { Loader } from "components";

export default function Header() {
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({ search: "" });
  const {
    data: searchData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery(["getSearch"], () => _api.getSearchFilter(formData), {
    enabled: false,
    cacheTime: 0,
  });

  const similarTrack = searchData?.data?.data?.similarTrack || [];
  const similarArtist = searchData?.data?.data?.similarArtist || [];
  const similarPlaylist = searchData?.data?.data?.similarPlaylist || [];
  const similarAlbum = searchData?.data?.data?.similarAlbum || [];
  const result = searchData?.data?.result;

  console.log(result, "RESULT");
  useDebounce(call, 500, [formData.search]);

  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };
  const [isShow, setIsShow] = useState(false);

  const location = useLocation();

  const playerPath = [
    "/forget",
    "/updatePassword",
    "/signIn-admin",
    "/signup",
    "/sign-in",
    "/create-password",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    setIsShow(() => window.innerWidth >= 992);

    // const cb = () => {
    //   setIsShow(() => window.innerWidth >= 992);
    // };
    // window.addEventListener("resize", cb);
    // return () => window.removeEventListener("resize", cb);
  }, [window.innerWidth]);

  function call() {
    setLoader(true);
    refetch();
    setLoader(false);
  }

  useEffect(() => {
    dispatch(reduxApis.getUniqueTrack());
  }, []);
  const user = useAuth();
  const { data } = useQuery(["getHeaderSetting"], () =>
    apis.getSetting({ page: "all", section: "header" })
  );
  const setting = data?.data?.setting || null;
  return (
    <>
      <header
        className={
          "new-custom-header " +
          (playerPath.includes(location.pathname) ? "none-margin" : "")
        }
      >
        <div className="head-top">
          <div className="new-logo-section ">
            <Link to={"/"}>
              <img
                src={imageUrl("logo-sm.svg")}
                className="logo-sm desktop-d-none"
                alt=""
              />
              <img
                src={asset(setting?.content?.logo)}
                alt=""
                className="mobile-d-none"
              />
            </Link>
          </div>
          <div className="btn-links-header-main">
            <div className="btn-links-header">
              {user?.role == "artist" ? (
                <>
                  <Link to={"/artist-profile"} className="custom-home-btn">
                    {" "}
                    <img src={imageUrl("upload-black.png")} alt="upload.png" />
                    <p>Upload</p>
                  </Link>
                </>
              ) : (
                <></>
              )}
              <img
                src={imageUrl("logo-sm.svg")}
                className="logo-sm mobile-d-none"
                alt=""
              />

              {user?.role === "artist" || user?.role === "user" ? (
                <>
                  {" "}
                  <div className={`profile`}>
                    <Dropdown className="boot-custom-dropdown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <Link to="">
                          <img
                            src={user?.image || imageUrl("noimage.png")}
                            alt=""
                            className="rounde-image"
                          />
                        </Link>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="custome-menu">
                        <Dropdown.Item as={Link} to={"/profile"}>
                          <i>
                            <img
                              src={user?.image || imageUrl("noimage.png")}
                              alt=""
                              className="rounde-image-menu"
                            />
                          </i>{" "}
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={"/dashboard-myplaylist"}>
                          <i>
                            <img
                              src={imageUrl("dashboard.png")}
                              alt=""
                              className="rounde-image-menu"
                            />
                          </i>
                          Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item
                          style={{ color: "red", marginLeft: "2px" }}
                          as={Link}
                          to={"/Sign-in"}
                          onClick={() => {
                            localStorage.removeItem("user");
                            localStorage.removeItem("token");
                          }}
                        >
                          <i class="fa-sharp fa-solid fa-right-from-bracket pe-3"></i>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <>
                  <Link to={"/sign-in"} className="custom-home-btn">
                    {" "}
                    <img src={imageUrl("signin-black.png")} alt="upload.png" />
                    <p>LOGIN IN</p>
                  </Link>
                  <Link to={"/signup"} className="custom-home-btn">
                    {" "}
                    <img src={imageUrl("signin-black.png")} alt="upload.png" />
                    <p>SIGN UP</p>
                  </Link>
                </>
              )}
            </div>
            <div className="search-box-new mobile-d-none">
              <div className="search">
                <input
                  id="search"
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="What do you want to search?"
                />
                <i class="fa fa-magnifying-glass search-icon"></i>
              </div>

              {formData?.search ? (
                <div className="search-container custom-scroll">
                  {isLoading || isRefetching || loader ? (
                    <p>
                      <Loader></Loader>
                    </p>
                  ) : (
                    <>
                      {result > 0 ? (
                        <>
                          {similarTrack?.length > 0 ? (
                            <>
                              <h2>{similarTrack?.[0].type}</h2>
                              {similarTrack?.map((item, _ind) => {
                                return (
                                  <>
                                    <Link
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                      to={"/trending-inside/" + item?._id}
                                    >
                                      <h6>
                                        <img
                                          src={
                                            item?.image == null
                                              ? imageUrl("noimage.png")
                                              : item?.image
                                          }
                                          alt={item?.name}
                                        />
                                        {item?.name}
                                      </h6>
                                    </Link>
                                  </>
                                );
                              })}{" "}
                            </>
                          ) : (
                            <></>
                          )}
                          {similarArtist?.length > 0 ? (
                            <>
                              <h2>{similarArtist?.[0].type}</h2>
                              {similarArtist?.map((item, _ind) => {
                                return (
                                  <>
                                    <Link
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                      to={"/artist-inside/" + item?._id}
                                    >
                                      <h6>
                                        <img
                                          className="rounde-image"
                                          src={
                                            item?.image == null
                                              ? imageUrl("noimage.png")
                                              : item?.image
                                          }
                                          alt={item?.name}
                                        />
                                        {item?.name}
                                      </h6>
                                    </Link>
                                  </>
                                );
                              })}{" "}
                            </>
                          ) : (
                            <></>
                          )}
                          {similarPlaylist?.length > 0 ? (
                            <>
                              <h2>{similarPlaylist?.[0].type}</h2>
                              {similarPlaylist?.map((item, _ind) => {
                                return (
                                  <>
                                    <Link
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                      to={"/playlist-inside/" + item?._id}
                                    >
                                      <h6>
                                        <img
                                          className="rounde-image"
                                          src={
                                            item?.image == null
                                              ? imageUrl("noimage.png")
                                              : item?.image
                                          }
                                          alt={item?.title}
                                        />
                                        {item?.title}
                                      </h6>
                                    </Link>
                                  </>
                                );
                              })}{" "}
                            </>
                          ) : (
                            <></>
                          )}
                          {similarAlbum?.length > 0 ? (
                            <>
                              <h2>{similarAlbum?.[0].type}</h2>
                              {similarAlbum?.map((item, _ind) => {
                                return (
                                  <>
                                    <Link
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                      to={"/album-inside/" + item?._id}
                                    >
                                      <h6>
                                        <img
                                          className="rounde-image"
                                          src={
                                            item?.image == null
                                              ? imageUrl("noimage.png")
                                              : item?.image
                                          }
                                          alt={item?.title}
                                        />
                                        {item?.title}
                                      </h6>
                                    </Link>
                                  </>
                                );
                              })}{" "}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          <h4>No record found</h4>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="header-bottom-new">
          <div className="toggle-bar" onClick={() => setIsShow(!isShow)}>
            <i class="fa-solid fa-bars toggle-bar-btn"></i>
          </div>
          <div className="search-box-new desktop-d-none">
            <div className="search">
              <input type="text" placeholder="What do you want to search?" />
              <i class="fa fa-magnifying-glass search-icon"></i>
            </div>
          </div>
          <ul className={"nav-links " + (isShow ? "show-links" : "hide-links")}>
            <li>
              <NavLink to={"/trending"}>TRENDING</NavLink>
            </li>
            <li>
              <NavLink to={"/artist"}>ARTISTS</NavLink>
            </li>
            <li>
              <NavLink to={"/new-artist"}>NEW</NavLink>
            </li>
            <li>
              <NavLink to={"/recommendation"}>RECOMMENDED</NavLink>
            </li>
            <li>
              <NavLink to={"/playlist"}>PLAYLISTS</NavLink>
            </li>
            <li>
              <NavLink to={"/charts"}>CHARTS</NavLink>
            </li>
            <li>
              <NavLink to={"/genres"}>GENRES</NavLink>
            </li>
            {/* <li>
                        <NavLink to={"/library"}>
                            LIBRARY
                        </NavLink>
                    </li> */}
            {user?.role === "artist" && (
              <li>
                <NavLink to={"/my-music"}>MY MUSIC</NavLink>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}
