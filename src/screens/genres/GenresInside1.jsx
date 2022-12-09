import React from "react";
import { Header, Loader,Sidebar, SmallSlider } from "../../components";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import imageUrl from "../../utils/ImageUrl";
import { useSmallSlider } from "../../hooks/useGeneralSLider";
import { useQuery } from "@tanstack/react-query";
import _api from '../../services/_api'

function GenresInside1() {
  let { id } = useParams()
  const { data, isLoading,isRefetching, error } = useQuery(['getGenreFilter'], () => _api.getGenreFilter({ genreId: id }))
  const isGenreFetching = isLoading || isRefetching;
  const genre = data?.data || null;
  const albums = data?.data?.album || [];
  const artists = data?.data?.artist || [];
  const playlists = data?.data?.playlist || [];
  const sliderSetting = useSmallSlider(albums?.length);
  return (
    <section
      class="playlist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <div class="bg-image">
        </div>
      <Header />
      <Sidebar />
      <div class="songs-list">
        <div class="blank-div"></div>
        <div class="main-content">
          {
            isGenreFetching ?
            <div className="h-100vh">
            <Loader/>
            </div>
            :
            <>
            {
              genre ?
              <>
              <div
            class="genre-img"
            style={{ backgroundImage: `url(${imageUrl("genre-image.png")})` }}
          >
            <div class="choices playlist-desc ">
              <a href="#">
                <i class="fa-solid fa-arrow-left"></i>
              </a>
              <a href="#">
                <i class="fa-solid fa-arrow-right"></i>
              </a>
              <span>Genre / Christian &amp; Gospel </span>
            </div>
            <div class="genre-heading">
              <h2>CHRISTIAN &amp; GOSPEL</h2>
            </div>

            <div class="genre-seemore">
              <div class="genre-seemore-text">
                <h5>Artist</h5>
                <a href="#"> See More</a>
              </div>
              <div class="main-slide">
                <div id="slideshow" class="genre-slider-show">
                  <div class="main-slider">
                    <div class="slick img-pos">
                      {
                        artists.length > 7 ?
                        <>
                        {artists.length > 0 && (
                        <Slider {...sliderSetting}>
                        {artists.map((item, ind) => (
                          <div>
                            <Link to={"/artist-inside/"+item?._id}>
                              <img
                                src={item?.image}
                                alt={item?.name}
                              />
                            </Link>
                            <p>{item?.name}</p>
                          </div>
                        ))}
                      </Slider>
                        )}
                        </>
                        :
                        <div className="custom-slide-flex">
                        {artists?.map((item, ind) => (
                          <div className="flex-col">
                             <Link to={"/artist-inside/"+item?._id}>
                              <img
                                src={item?.image}
                                alt={item?.name}
                              />
                            </Link>
                            <p>{item?.name}</p>
                          </div>
                        ))}
                      </div>
                      }
                    
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-slide slide2">
            <div id="slideshow" class="genre-slider-show2">
              <div class="text-liked">
                <p>Albums</p>
              </div>
              <div class="main-slider">
                <div class="slick img-pos">
                  {albums.length > 0 && (
                    <SmallSlider data={albums} type="album"/>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="main-slide">
            <div id="slideshow" class="genre-slider-show3">
              <div class="text-liked">
                <p>Playlist</p>
              </div>
              <div class="main-slider">
                <div class="slick img-pos">
                  {playlists.length > 0 && (
                    <SmallSlider data={playlists} type="playlist"/>
                  )}
                </div>
              </div>
            </div>
          </div>
              </>
          :
          <>
          <div class="find-songs">
          <div class="inside-songs">
            <p className="mb-4">
              Genre not found.
            </p>
          </div>
        </div>
          </>
            }
            </>
          }
          
        </div>
      </div>
     </section>
  );
}

export default GenresInside1;
