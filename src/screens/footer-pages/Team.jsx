import React from "react";
import imageUrl from "../../utils/ImageUrl";
import { useTeamSlider } from "hooks/useGeneralSLider";
import Slider from "react-slick";
import Header from "components/New/Header";
import { useQuery } from "@tanstack/react-query";
import apis from "services/apis";
import asset from "helper/asset";
import Image from "components/Image";
function Team() {
  const sliderSetting = useTeamSlider()
  const {data,isLoading,error} = useQuery(['getTeamSetting'],()=> apis.getSetting({page:"team",section:"team"}));
  const setting = data?.data?.setting || null;
  const {data : dataSection,isLoading : sectionIsLoading,error : sectionError} = useQuery(['getTeamSection'],()=> apis.getSection({page:"team",section:"team"}));
  const teams = dataSection?.data?.sections || null;
  return <>
        <Header />
      <section className="new-custom-section">
      <div className="container">
          <div className="text-center">
              <h3 className="new-section-title new-primary-text">{setting?.content?.heading}</h3>
          </div>
          <div className="team-main">
              {
                teams?.length > 0 ?
                <Slider {...sliderSetting}>
                  {
                      teams?.map((item, _ind) => {
                        const {image = '',name = '',designation = '',description = '',linkedin = '',twitter = ''} = JSON.parse(item?.content);
                          return <>
                              <div className="team-card">
                                  <div className="team-img-section">
                                      <Image path={asset(image)}/>
                                  </div>
                                      <div className="team-body">
                                          <div className="team-body-detail">
                                          <h3 className="team-name">{name}</h3>
                                          <p className="team-desc">
                                              {description}
                                          </p>
                                          
                                      </div>
                                      <div className="team-footer">
                                        <img src={imageUrl('team-bg.png')} alt="" className="team-bg"/>
                                          <div className="z-index-1">
                                          <div className="text-center">
                                              <h4 className="designation">{designation}</h4>
                                          </div>
                                          <ul className="team-social">
                                              <li>
                                                  <a href={linkedin} target="_blank">
                                                      <i class="fa-brands fa-linkedin-in"></i>
                                                  </a>
                                                  <a href={twitter} target="_blank">
                                                  <i class="fa-brands fa-twitter"></i>
                                                  </a>
                                              </li>
                                          </ul>
                                          </div>
                                      </div>
                                  </div>
                                  
                              </div>
                          </>
                      })
                  }
              </Slider>
              :
              <>
              </>
              }
          </div>
      </div>
    </section>
  </>
}

export default Team;
