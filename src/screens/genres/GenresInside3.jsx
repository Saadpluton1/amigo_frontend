import React from "react";
import { Sidebar, Header, PlaySong, CommentList } from "../../components";
import { Link } from "react-router-dom";
import imageUrl from "../../utils/ImageUrl";
function GenresInside3() {
  return (
    <section
      class="playlist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <Header />
      <Sidebar />
      <div class="songs-list">
        <div class="blank-div"></div>
        <div class="main-content">
          <div class="custom-set">
            <div class="genre-image-div">
              <div class="choices playlist-desc">
                <Link to={"#"}>
                  <i class="fa-solid fa-arrow-left"></i>
                </Link>
                <Link to={"#"}>
                  <i class="fa-solid fa-arrow-right"></i>
                </Link>
                <span>Genre / Moses Bliss </span>
              </div>
              <div class="playing-song">
                <div class="song-image">
                  <img src={imageUrl("moses-flat.png")} alt="moses-flat.png" />
                </div>
                <div class="song-info">
                  <div class="artist-song-info">
                    <h5>Moses Bliss</h5>
                    <img src={imageUrl("vip.png")} alt="vip.png" />
                    <Link to={"#"}>Current #1.741</Link>
                    <Link to={"#"}>All Time #741</Link>
                  </div>
                  <div class="list-desc">
                    <span>
                      Moses Bliss who was born on the 20th of February 1995 is a
                      Nigerian gospel singer and songwriter.
                      <br />
                      Many of Moses Bliss songs ...
                      <Link to={"#"}> see more</Link>
                    </span>

                    <span>Country/Region: Nigeria</span>
                    <div class="playlist-function my-2">
                      <Link to={"#"}>
                        <i class="fa-solid fa-play"></i>Play all
                      </Link>
                      <Link to={"#"}>
                        <i class="fa-solid fa-heart"></i>1.741
                      </Link>
                      <Link to={"#"}>
                        <i class="fa-solid fa-share-nodes"></i>100
                      </Link>
                      <Link to={"#"}>
                        <i class="fa-solid fa-comment-dots"></i>300
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="search-title">
              <div class="text-title">
                <h5 class="active">Songs(4)</h5>
                <h5>Albums (4)</h5>
                <h5>Playlists (0)</h5>
                <h5>Similar Artists (10)</h5>
              </div>

              <div class="input-title">
                <i class="fa fa-magnifying-glass"></i>
                <input
                  class="box-title"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Search within tracks"
                />
              </div>
            </div>

            <PlaySong />
          </div>

          <div class="comments">
            <div class="text-comment">
              <p>Comments (7)</p>
            </div>
            <div class="form-floating ">
              <textarea
                class="form-control area-form"
                placeholder=""
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
              <label for="floatingTextarea2">Please share your thoughts</label>
            </div>
            <div class="emojis">
              <img src={imageUrl("emoji.png")} alt="emoji.png" />
              <Link to={"#"}>Comments</Link>
            </div>
            <CommentList />
          </div>

          <div class="more-button comments-more">
            <Link to={"#"}>More</Link>
          </div>
        </div>
      </div>

      <div class="player">
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
            <img src={imageUrl("shuffle.png")} alt="music.png" />
            <img src={imageUrl("like.png")} alt="music.png" />
            <img src={imageUrl("music-logo.png")} alt="music-logo.png" />
            <img src={imageUrl("nodes.png")} alt="nodes.png" />
            <img src={imageUrl("downloads.png")} alt="downloads.png" />
            <img src={imageUrl("playlist.png")} alt="music.png" />
            <div class="play-time">
              <p>01:10/04:20</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenresInside3;
