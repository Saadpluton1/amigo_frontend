import React from "react";
import { Sidebar, Header, SmallSlider } from "../../components";
import imageUrl from "../../utils/ImageUrl";
import _api from '../../services/_api'
import { useQuery } from "@tanstack/react-query";

function Charts() {
  const { data, isLoading, error, refetch: playlistRefetch } = useQuery(['getWeeklyPlaylist'], () => _api.getWeeklyPlaylist())
  const playlist = data?.data || [];
  const { data : artistData, isLoading : artistIsLoading, error : artistError } = useQuery(['getWeeklyArtist'], () => _api.getWeeklyArtist())
  const artist = artistData?.data || [];
  const { data : albumData, isLoading : albumIsLoading, error : albumError } = useQuery(['getWeeklyAlbum'], () => _api.getWeeklyAlbum())
  const album = albumData?.data || [];
  return (
    <section
      className="playlist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <Header />
      <Sidebar />
      <div class="songs-list">
        <div class="blank-div"></div>
        <div class="main-content">
          <div class="main-slide">
            <div id="slideshow" class="charts-slider4">
              <div class="text-liked  mb-3">
                <p>Weekly Top Playlists</p>
              </div>
              <div class="main-slider">
                <div class="slick img-pos">
                  {playlist.length > 0 ? (
                    <SmallSlider data={playlist} type="playlist"/>
                  ):
                  <>
                  <div class="inside-songs top-list-not-found">
                    <p className="mb-4">
                      Playlists not found.
                    </p>
                  </div>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div class="main-slide">
            <div id="slideshow" class="charts-slider4">
              <div class="text-liked  mb-3">
                <p>Weekly Top Artists</p>
              </div>
              <div class="main-slider">
                <div class="slick img-pos">
                  {artist.length > 0 ? (
                    <SmallSlider data={artist} type="artist"/>
                  )
                  :
                  <>
                  <div class="inside-songs top-list-not-found">
                    <p className="mb-4">
                      Artists not found.
                    </p>
                  </div>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div class="main-slide">
            <div id="slideshow" class="charts-slider5">
              <div class="text-liked mb-3">
                <p>Weekly Top Albums</p>
              </div>
              <div class="main-slider">
                <div class="slick img-pos">
                  {album.length > 0 ? (
                    <SmallSlider data={album} type="album"/>
                  )
                  :
                  <>
                  <div class="inside-songs top-list-not-found">
                    <p className="mb-4">
                      Albums not found.
                    </p>
                  </div>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Charts;
