import React, { useEffect } from "react";
import imageUrl from "../../utils/ImageUrl";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Header,Sidebar, Loader } from "../../components/index";
import { useQuery } from "@tanstack/react-query";
import _api from '../../services/_api'
import { useState } from "react";

function Artist() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = Object.fromEntries([...searchParams]);
  const [filter,setFilter] = useState({name:params?.name || 'All',gender:params?.gender || 'All',genre:params?.genre || 'All'})
  const { data, isLoading, isRefetching ,error,refetch } = useQuery(['getArtist'], () => _api.getArtist(filter),{enabled:true})
  const artists = data?.data?.artists || [];
  const { data: genreData, isLoading: genreIsLoading, error: genreError } = useQuery(['getGenre'], () => _api.getGenre())
  const genres = genreData?.data || [];
  let alphabetArray = ["All"];
  for (let i = "A".charCodeAt(); i <= "Z".charCodeAt(); i++) {
    alphabetArray.push(String.fromCharCode(i));
  }
  let genders = ["All", "male", "female", "group"];

  const isArtistFetching = isLoading || isRefetching;

  const Genre = (genre) =>{
    handleChange('genre',genre);
    redirect()
  }
  const gender = (gender) =>{
    handleChange('gender',gender);
  }
  const alpha = (name) =>{
    handleChange('name',name);
  }
  const handleChange = (id,val) =>{
    setFilter(prevFilter => ({ ...prevFilter, [id]: val }));
  }
  const redirect = () =>{
    navigate(`/artist?name=${filter.name}&gender=${filter.gender}&genre=${filter.genre}`)
    refetch()
  }
  useEffect(()=>{
    redirect()
  },[filter])
  return (
    <section
      className="artist"
      style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
    >
      <Header />
      <Sidebar />
      <div className="songs-list">
        <div className="blank-div"></div>
        <div className="main-content">
          <div className="custom-set">
            <div className="container">
               <div className="choices">
                {
                   genres?.length > 0 ?
                  <><a
                  href="#"
                  className={""+("All" == filter.genre && "all-button")}
                  onClick={()=>Genre("All")}
                > 
                  All
                </a>
                          {genres?.map((x) => {
                            return (
                              <>
                                {
                                  <a
                                    href="#"
                                    className={""+(x.name == filter.genre && "all-button")}
                                    onClick={()=>Genre(x.name)}
                                  > 
                                    {x.name}
                                  </a>

                                }
                              </>
                            );
                          })}
                          <br></br>
                        </>
                  :
                  <></>

                }
              </div>
              <div className="choices">
                {genders?.map((x, index) => (
                  <>
                    {
                      <a
                        href="#"
                        className={""+(x == filter.gender && "all-button")}
                        onClick={()=>gender(x)}
                      >
                        {x}
                      </a>
                    }
                  </>
                ))}
              </div>
              <div className="choices">

                {alphabetArray?.map((x, index) => (
                  <>
                    {
                      <a
                        href="#"
                        className={""+(x == filter.name && "all-button")}
                        onClick={()=>alpha(x)}
                      >
                        {x}
                      </a>
                    }
                  </>
                ))}
              </div>
              <div className="table-artist playlist-table custom-playlist">
                {
                  isArtistFetching ?
                  <>
                  <Loader/>                  
                  </>
                  :
                  <>
                  {
                  artists?.length > 0 ?
                  <>
                  {artists?.map((item, _index) => (
                  <div className="play-box m-1">
                    <div className="artist-title-main">
                      <div className="set-artist">
                        <Link to={"/artist-inside/" + item?._id}>
                          <img src={item?.image == null ? imageUrl('noimage.png') : item?.image} alt={item?.title} className="box-img" />
                        </Link>
                        <span>{item?.name}</span>
                      </div>
                    </div>
                  </div>
                  ))}
                  </>
                  :
                  <div class="inside-songs w-100 mt-5">
                    <p className="mb-4 ">
                      Artist not found.
                    </p>
                  </div>
                }
                  </>
                }
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Artist;
