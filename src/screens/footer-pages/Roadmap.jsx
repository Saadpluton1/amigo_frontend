import React from "react";
import {  Header, TimeLine } from "../../components";
import { useQuery } from "@tanstack/react-query";
import apis from "services/apis";
function RoadMap() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'roadmap', section: 'roadmap' }))
  const setting = data?.data?.setting || null;
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'roadmap', section: 'roadmap' }))
  const sections = sectionData?.data?.sections || [];
  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="main-contact">
          <div className="container">
            <div className="roadmap"></div>
            <div className="roadmap-heading">
              <h2>{setting?.content?.heading}</h2>
            </div>
            <TimeLine sections={sections}/>          
          </div>
        </div>
      </section>

    </>
  );
}

export default RoadMap;
