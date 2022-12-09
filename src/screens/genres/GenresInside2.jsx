import React from "react";
import { Sidebar, Header } from "../../components";
import { Link } from "react-router-dom";
import imageUrl from "../../utils/ImageUrl";
function GenresInside2() {
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
          <div class="choices playlist-desc ">
            <a href="#">
              <i class="fa-solid fa-arrow-left"></i>
            </a>
            <a href="#">
              <i class="fa-solid fa-arrow-right"></i>
            </a>
            <span>Genre / Christian & Gospel </span>
          </div>
          <div class="custom-set">
            <div class="custom-row">
              {Array(24)
                .fill(0)
                .map((item, ind) => (
                  <div class="custom-col">
                    <Link to={"/genres-inside-3"}>
                      <img src={imageUrl("moses-bliss.png")} alt="music.png" />
                    </Link>
                    <p>Moses Bliss</p>
                    <span>
                      <i class="fa-solid fa-headphones"></i> 44.4k
                    </span>
                  </div>
                ))}
            </div>
            <div class="more-button">
              <a href="#">More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenresInside2;
