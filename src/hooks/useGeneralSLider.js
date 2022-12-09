import React from "react";
import { IMAGES } from "../assets/constants/images";
import imageUrl from "../utils/ImageUrl";

function RecentNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <div className="recent-slide-arrow" onClick={onClick}><i class="fa-solid fa-arrow-right"></i></div>
    </div>
  );
}

function RecentPrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className}>
     <div className="recent-slide-arrow" onClick={onClick}><i class="fa-solid fa-arrow-left"></i></div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <img src={imageUrl("right-arrow.png")} onClick={onClick} alt="" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <img src={imageUrl(IMAGES.leftArrow)} onClick={onClick} alt="" />
    </div>
  );
}

export const useBigSlider = () => {
  const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow className="arrow-prev prev1" />,
    prevArrow: <SamplePrevArrow className="arrow-next next1" />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return sliderSetting;
};
export const useTeamSlider = () =>{
  const sliderSetting = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    appendDots: dots => <ul>{dots}</ul>,
    customPaging: i => (
      <div className="team-dot-custom">

      </div>
    ),
    responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
          breakpoint: 600,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
          },
        },
    ],
};
return sliderSetting;
}
export const useRecentSlider = () => {
  const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:4,
    slidesToScroll: 1,
    nextArrow: <RecentNextArrow/>,
    prevArrow: <RecentPrevArrow/>,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ],
  };
  return sliderSetting;
};

export const useSmallSlider = (length = 7) => {
  const sliderSettingSmall = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:7,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow className="arrow-prev prev1" />,
    prevArrow: <SamplePrevArrow className="arrow-next next1" />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return sliderSettingSmall;
};
