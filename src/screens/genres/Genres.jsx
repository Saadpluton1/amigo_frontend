import React from "react";
import { Sidebar, Header, Loader } from "../../components";
import { Link } from "react-router-dom";
import imageUrl from "../../utils/ImageUrl";
import { genresData } from "../..//dummyData";
import { useQuery } from "@tanstack/react-query";
import _api from '../../services/_api'

function Genres() {
  const { data, isLoading,isRefetching, error } = useQuery(['getGenre'], () => _api.getGenre())
  const genres = data?.data || [];
  const isGenreFetching = isLoading || isRefetching;

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
            <div className="custom-row">
              {
                isGenreFetching ?
                  <div className="h-100vh w-100">
                    <Loader />
                  </div>
                  :
                  <>
                    {genres.length > 0 ? (
                      genres?.map((item, ind) => (
                        <div className="custom-col">
                          <Link to={"/genres-inside/" + item?._id}>
                            <img src={item?.image} alt={item?.name} className="box-img" />
                          </Link>
                          <p className="mt-1">{item?.name}</p>
                        </div>
                      )))
                    :
                    <div class="find-songs w-100">
                      <div class="inside-songs">
                        <p className="mb-4">
                          Genres not found.
                        </p>
                      </div>
                    </div>
                    }
                  </>
              }

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Genres;
