import Slider from "react-slick";
import imageUrl from "../utils/ImageUrl";
import { useBigSlider } from "../hooks/useGeneralSLider";
import apis from "services/apis";
import asset from "helper/asset";
import { useQuery } from "@tanstack/react-query";
import _api from "../services/_api"
function HomeSlider({sliderImages}) {
  const SliderSetting = useBigSlider();
  const {data, isLoading, error} = useQuery(['getSetting1'], () => apis.getSetting({ page: 'home', section: 'slider1' }))
  const setting1 = data?.data?.setting || [];

  const {data : sliderData, isLoading : sliderisLoading, error : sliderError} = useQuery(['getSetting2'], () => apis.getSetting({ page: 'home', section: 'slider2' }))
  const setting2 = data?.data?.setting || [];

  const { data : featureArtist , isLoading : isLoadingfeatureArtist , error : artistError, isRefetching, refetch } = useQuery(['getFeatureArtist'], () => _api.getFeatureArtist())
  const featureArt = featureArtist?.data.artist || [];
  
  const { data: track, isLoading: isLoadingSong, error: songError } = useQuery(['getNewTrack'], () => _api.getNewTrack())
  const featureTrack = track?.data || [];

  return (
    <>
      <section id="list">
        <div className="bg-list">
          <img src={asset(sliderImages?.content?.image1)} alt="" />
        </div>

        <div className="hotlist">
          <div className="text-hotlist">
            <img src={imageUrl("hot-list.png")} alt="" />
            <h2>Top Hotlist Artist</h2>
          </div>
          <div className="hot-line">
            <img src={imageUrl("hot-line.png")} alt="" />
          </div>
        </div>
        <div id="slideshow" className="slider-show home-slider">
          <div className="slick">
            {
            featureArt.length > 4 ?
            <Slider {...SliderSetting}>
              {featureArt.map((item) => {
                return (
                  <div>
                    <img src={item.image} alt={item.image} />
                    <h4 style={{textAlign :"center"}}>{item?.name}</h4>
                  </div>
                );
              })}
            </Slider>
            :
              <div className="custom-big-slider">
               {featureArt.map((item) => {
              return (
                <div className="inner">
                  <img src={item.image} alt={item.image} />
                  <h4 style={{textAlign :"center"}}>{item?.name}</h4>
                </div>
              );
            })}
              </div>
            }

          </div>
        </div>

           <div className="hotlist">
          <div className="text-hotlist">
            <img src={imageUrl("hot-list.png")} alt="" />
            <h2>New Songs</h2>
          </div>
          <div className="hot-line">
            <img src={imageUrl("hot-line.png")} alt="" />
          </div>
        </div>
        <div id="slideshow" className="slider-show home-slider">
          <div className="slick">
            {
            featureTrack.length > 4 ?
            <Slider {...SliderSetting}>
              {featureTrack.map((item) => {
                return (
                  <div>
                    <img src={item.image} alt={item.image} />
                    <h4 style={{textAlign :"center"}}>{item?.name}</h4>
                  </div>
                );
              })}
            </Slider>
            :
              <div className="custom-big-slider">
               {featureTrack.map((item) => {
              return (
                <div className="inner">
                  <img src={item.image} alt={item.image} />
                  <h4 style={{textAlign :"center"}}>{item?.name}</h4>
                </div>
              );
            })}
              </div>
            }

          </div>
        </div>

      </section>
    </>
  );
}

export default HomeSlider;
