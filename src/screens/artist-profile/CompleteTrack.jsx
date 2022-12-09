import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Header } from "../../components";
import imageUrl from "../../utils/ImageUrl";
function CompleteTrack() {
  return (
    <section
      id="artist-profile"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      {/* <div class="bg-image">
        <img src={imageUrl("trending-bg.png")} alt="trending-bg.png" />
      </div> */}
      <Header />
      <Sidebar />
      <div class="profile-list">
        <div class="blank-div"></div>
        <div class="profile-heading mt-5 mx-5">
          <h1>Complete Your Track</h1>
        </div>
      </div>
      <div class="artist-uploadbox  complete-track mt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="image-profile">
                <img
                  src={imageUrl("audio-file.png")}
                  alt="audio-file.png"
                  class="upload-image"
                />
              </div>
            </div>
            <div class="col-lg-9 d-flex flex-column  justify-content-around">
              <div class="details-audio mb-1">
                <span>Audio clip (2022-08-08_09-50-35-758)</span>
                <div class="song-name">
                  <h3>TOM</h3>
                </div>
              </div>

              <div class="bar-complete mt-5">
                <div class="completing-bar "></div>
                <div class="text-process">
                  <span>processing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* remove this  */}
      <div class="artist-btn primary-btn my-4">
        <Link to={"/admin-profile"}>
          Admin <i class="fa-solid fa-arrow-right-long"></i>
        </Link>
      </div>
      <div class="player mt-5">
        <div class="player-line">
          <div class="position-relative">
            <div class="player-line-inner"></div>
          </div>
        </div>
        <div class="song-name">
          <img src={imageUrl("hiphopp.png")} alt="hiphopp.png" />
          <div class="song-text">
            <span>Afsany ft. Talha Younus</span>
            <div class="singer-name">
              <span>Talha Younus</span>
            </div>
          </div>
        </div>

        <div class="select-play">
          <i class="fa-solid fa-backward-step"></i>
          <i class="fa-solid fa-circle-play"></i>
          <i class="fa-solid fa-forward-step"></i>
        </div>
        <div class="adjustments">
          <div class="set-volume">
            <i class="fa-solid fa-volume-high"></i>
            <div class="duration-line"></div>
            <i class="fa-solid fa-volume-xmark"></i>
          </div>
          <div class="functions">
            <img src={imageUrl("shuffle.png")} alt="" />
            <img src={imageUrl("like.png")} />
            <img src={imageUrl("music-logo.png")} alt="" />
            <img src={imageUrl("nodes.png")} alt="nodes.png.png" />
            <img src={imageUrl("downloads.png")} alt="downloads.png" />
            <img src={imageUrl("playlist.png")} alt="downloads.png" />
            <div class="play-time">
              <p>01:10/04:20</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompleteTrack;
