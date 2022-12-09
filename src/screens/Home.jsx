import { useState } from "react";
import { useTranslation } from "react-i18next";
import _api from "../services/_api"
import {
  HomeBanner,
  HomeWelcome,
  HomeSlider,
} from "../components/index";
import apis from "services/apis";
import asset from "helper/asset";
import { useQuery } from "@tanstack/react-query";

function Home() {

  const { data, isLoading, error } = useQuery(['getSliderImage'], () => apis.getSetting({ page: 'home', section: 'slider' }))
  const sliderImages = data?.data?.setting || [];

  const { data: featureArtist, isLoading: isLoadingfeatureArtist, error: artistError, isRefetching, refetch } = useQuery(['getFeatureArtist'], () => _api.getFeatureArtist())
  const featureArt = featureArtist?.data.artist || [];

  const { data: track, isLoading: isLoadingSong, error: songError } = useQuery(['getNewTrack'], () => _api.getNewTrack())
  const featureTrack = track?.data || [];
  

  return (
    <>
      <HomeBanner />
      <HomeWelcome />
      <HomeSlider sliderImages={sliderImages}/>
      
      <section>
        <div className="bg-endimage">
          <div className="image-speaker">
            <img src={asset(sliderImages?.content?.image2)} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
