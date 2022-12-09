import React from "react";
import Slider from "react-slick";
import imageUrl from "../utils/ImageUrl";
import { useSmallSlider } from "../hooks/useGeneralSLider";
import { Link } from "react-router-dom";
function SmallSlider({data,type}) {
  const length = data?.length;
  const sliderSetting = useSmallSlider(length);

  
  return <>
  {
    length > 7 ?
    <Slider {...sliderSetting}>
      {data?.map((item, ind) => (
        <div>
          <Link to={type == "playlist" ? "/playlist-inside/"+item?._id : type == "album" ? "/album-inside/"+item?._id : type == "artist" && "/artist-inside/"+item?._id} className="slick-link">
            <img src={item?.image || imageUrl('noimage.png')} alt={item?.name || item?.title} />
          </Link>
            <p className="mt-2">{item?.name || item?.title}</p>
        </div>
      ))}
    </Slider>
    
    :
    <div className="custom-slide-flex">
      {data?.map((item, ind) => (
        <div className="flex-col">
         
          {/* <Link to={type == "playlist" ? "/playlist-inside/"+item?._id : type == "album" && "#"} className="slick-link ">
          */}
          <Link to={type == "playlist" ? "/playlist-inside/"+item?._id : type == "album" ? "/album-inside/"+item?._id : type == "artist" && "/artist-inside/"+item?._id}>
            <img src={item?.image || imageUrl('noimage.png')} alt={item?.name || item?.title} />
          </Link>
            <p className="mt-2">{item?.name || item?.title}</p>
        </div>
      ))}
    </div>
  }
    
    </>
}

export default SmallSlider;
