import React from "react";
import {  Header } from "../../components";
import apis from "services/apis";
import { useQuery } from "@tanstack/react-query";
import _html from "helper/_html";
function AboutUs() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'about', section: 'about' }))
  const setting = data?.data?.setting || null;
  return (
    <>
      <section className="text-home text-for-footer ">
        <Header />

        <div className="main-contact ">
          <div className="text-center">
            <div className="welcome-desc ">
              <h3 className="welcome-front ">{setting?.content?.heading}</h3>
            </div>
          </div>
          <div className="container">
            <div className="aboutus-text mt-5">
              <div className="mt-3">
                {_html(setting?.content?.description)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
