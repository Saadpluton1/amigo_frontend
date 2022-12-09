import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import imageUrl from "../utils/ImageUrl";
import useAuth from "hooks/useAuth";

function AdminSideBar() {
const user = useAuth();  
  const [open, setOpen] = useState(true);
  const location = useLocation();
  return (
    <header className="admin">

      <div class="nav-bar custom-border">
        <div class="logo logo-bg">
          <Link to={"/admin-profile"}>
            <img src={imageUrl("logo-white.png")} alt="" />
          </Link>
        </div>

        <div class="main">
      <div class="custom-box">
            <i class="fa fa-magnifying-glass custom-glass"></i>
            <input
              class="custom-input"
              type="text"
              id="fname"
              name="fname"
              placeholder="Search"
            />
          </div>

          <div style={{ marginLeft: "90px", marginTop: "10px" }}  onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
              }}>
            <Button as={Link} to="/signIn-admin" variant="outline-light" size="xm">
              Logout
            </Button>
          </div>
          <div class="profile">
            <a href="#">
              <img src={imageUrl("profile.png")} alt="" />
            </a>
          </div>

        </div>
      </div>

      <div class="position">
        <div className={`${open ? "open" : ""} custom-container  custom-bar`}>
          <i
            className="fa fa-bars bars "
            title="Click me!"
            onClick={() => setOpen(!open)}
          ></i>
          <ul class="menu admin-menu">
            <li>
              <Link
                to="/admin-profile"
                className={`${location.pathname === "/admin-profile" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("overview.png")} alt="" />
                <span> Overviews</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-profile-2"
                className={`${location.pathname === "/admin-profile-2" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-user"
                className={`${location.pathname === "/admin-user" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-artist"
                className={`${location.pathname === "/admin-artist" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>Artist</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-track"
                className={`${location.pathname === "/admin-track" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>Track</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-genres"
                className={`${location.pathname === "/admin-genres" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>Genres</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-all-playlist"
                className={`${location.pathname === "/admin-all-playlist" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>Playlist</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-playlist"
                className={`${location.pathname === "/admin-playlist" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>Admin Playlist</span>
              </Link>
            </li>
            <li>
              <a href="https://cms.amigo-sound.pluton.ltd/login"
                className={`${location.pathname === "https://cms.amigo-sound.pluton.ltd/login" ? "active" : ""
                  }`}
              >
                <img src={imageUrl("analytics.png")} alt="" />
                <span>CMS</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default AdminSideBar;
