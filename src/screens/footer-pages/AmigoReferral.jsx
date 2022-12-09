import React from "react";
import imageUrl from "../../utils/ImageUrl";
import { Sidebar, Header } from "../../components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import apis from "services/apis";
import asset from "helper/asset";
import { useQuery } from "@tanstack/react-query";
function AmigoReferral() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'referral', section: 'referral' }))
  const setting = data?.data?.setting || [];
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'referral', section: 'referral' }))
  const sections = sectionData?.data?.sections || [];

  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="container">
          <div className="welcome-desc footer-">
            <h3 className="welcome-front text-center">{setting?.content?.heading}</h3>
          </div>
          <div className="welcome-desc block-display">
            <h3 className="welcome-front amigo ">{setting?.content?.heading2}</h3>
          </div>
          <div className="main-referal">
            <div className="container">
              <div className="row">
                {
                  sections.map((item)=>{
                    const {heading = '',description = '',image = ''} = JSON.parse(item.content)
                    return <>
                     <div className="col-lg-4">
                      <div className="share-box">
                        <h2>{heading}</h2>
                        <img
                          src={asset(image)}
                          alt="share-with-friends"
                        />
                      </div>
                      <h5 className="mt-2 ">
                        {description}
                      </h5>
                    </div>
                    </>

                  })
                }
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AmigoReferral;
