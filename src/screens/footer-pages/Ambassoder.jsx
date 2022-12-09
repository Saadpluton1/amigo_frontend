import React from "react";
import {  Header } from "../../components";
import apis from "services/apis";
import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import _html from "helper/_html";
function Ambassoder() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'ambassador', section: 'join' }))
  const setting = data?.data?.setting || null;
  const {data : settingData, isLoading : isLoading2, error:error2} = useQuery(['getSetting2'], () => apis.getSetting({ page: 'ambassador', section: 'benefit' }))
  const setting2 = settingData?.data?.setting || null;
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'ambassador', section: 'join' }))
  const sections = sectionData?.data?.sections || [];
  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="main-contact">
          <div className="text-center">
            <div className="welcome-desc">
              <h2 className="welcome-front">{setting?.content?.heading}</h2>
            </div>
          </div>
          <div className="container">
            <div className="row mt-5">
              {
                sections.map((item,ind)=>{
                  const {heading = '',description = '',button_text = '',button_link =  ''} = JSON.parse(item.content);
                  return <>
                  <div className="col-lg-4">
                    <div className="steps">
                      <h5>{heading}</h5>
                      <p className="mb-2">
                      {description}
                      </p>
                      <a href={button_link} target="_blank">
                        <span>{button_text}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                  </>
                })
              }
            </div>

            <div className="benefits">
              <div className="benefits-heading text-center">
                <h2>{setting2?.content?.heading}</h2>
              </div>
              <div className="row">
                <div className="sound-benefits">
                  <div className="col-lg-4">
                    <h5>
                    {setting2?.content?.sub_heading1}
                    </h5>
                  </div>
                  <div className="col-lg-8">
                    <p className="mb-3">
                    {setting2?.content?.description1}
                    </p>
                  </div>
                </div>
                <div className="sound-benefits">
                  <div className="col-lg-4">
                    <h5>{setting2?.content?.sub_heading2}</h5>
                  </div>
                  <div className="col-lg-8">
                    <p>
                    {setting2?.content?.description2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="program ">
              <div className="row">
                <div className="col-lg-6">
                  <img src={asset(setting2?.content?.image)} alt="logo" />
                </div>
                <div className="col-lg-6">
                  <p>
                    {_html(setting2?.content?.description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default Ambassoder;
