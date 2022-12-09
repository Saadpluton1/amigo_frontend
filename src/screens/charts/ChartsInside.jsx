import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  Sidebar,
  Header,
  CommentList,
  SmallSlider,
  PlaySong,
} from "../../components";
import imageUrl from "../../utils/ImageUrl";
import { useSmallSlider } from "../../hooks/useGeneralSLider";
import { Player } from "components/New";

function ChartsInside() {
  const sliderSetting = useSmallSlider();
  return (
    <section
      className="playlist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <Header />
      <Sidebar />
      <div className="songs-list">
        <div className="blank-div"></div>
        <div className="main-content">
          <div className="custom-set">
            <div
              class="image-div"
              style={{ backgroundImage: `url(${imageUrl("blur-bg.png")})` }}
            >
              <div class="choices playlist-desc">
                <a href="#">
                  <i class="fa-solid fa-arrow-left"></i>
                </a>
                <a href="#">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
                <span>Playlists / Hip Hop USA </span>
              </div>
              <div class="playing-song">
                <div class="song-image">
                  <img src={imageUrl("shakira.png")} alt="" />
                </div>
                <div class="song-info">
                  <p>Hip Hop USA</p>
                  <div class="list-desc">
                    <span>
                      Discover the hottest 100 songs topping the charts in USA.
                      The songs cut across the genres of afropop, gospel,
                      highlife, hip hop. The Top 100 chart is curated based on
                      streaming performances of songs during ...
                    </span>

                    <span>
                      <img src={imageUrl("logo-song.png")} alt="" />
                      Amigo Charts
                    </span>
                    <div class="playlist-function my-2">
                      <a href="#">
                        <i class="fa-solid fa-play"></i>Play all
                      </a>
                      <a href="#">
                        <i class="fa-solid fa-heart"></i>1.741
                      </a>
                      <a href="#">
                        <i class="fa-solid fa-share-nodes"></i>100
                      </a>
                      <a href="#">
                        <i class="fa-solid fa-comment-dots"></i>300
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-title">
              <div className="text-title">
                <p>Top 100 USA (25)</p>
              </div>

              <div className="input-title">
                <i className="fa fa-magnifying-glass"></i>
                <input
                  className="box-title"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Search within tracks"
                />
              </div>
            </div>
            <PlaySong />
          </div>
          <div className="main-slide">
            <div id="slideshow" className="playlist-slider-show mb-5">
              <div className="text-liked">
                <p>You May Also Like</p>
              </div>
              <div className="main-slider">
                <div className="slick img-pos">
                  <SmallSlider />
                </div>
              </div>
            </div>
          </div>
          <div className="main-slide">
            <div id="slideshow" className="playlist-slider-show2">
              <div className="text-liked">
                <p>Suggested Artists</p>
              </div>
              <div className="main-slider">
                <div className="slick img-pos">
                  <Slider {...sliderSetting}>
                    {Array(14)
                      .fill(0)
                      .map((_, ind) => (
                        <div>
                          <img src={imageUrl("unknown.png")} alt="music.png" />
                          <p>Jokhay</p>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <div className="comments">
            <div className="text-comment">
              <p>Comments (7)</p>
            </div>
            <div className="form-floating ">
              <textarea
                className="form-control area-form"
                placeholder=""
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
              <label for="floatingTextarea2">Please share your thoughts</label>
            </div>
            <div className="emojis">
              <img src={imageUrl("emoji.png")} alt="music.png" />
              <Link to="#">Comments</Link>
            </div>
            <CommentList />
          </div>
        </div>
      </div>
      <Player img={"hiphopp.png"} />
    </section>
  );
}

export default ChartsInside;

