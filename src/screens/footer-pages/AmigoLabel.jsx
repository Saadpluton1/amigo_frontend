import React from "react";
import { Header, FaqsAccordian } from "../../components";
import { useQuery } from "@tanstack/react-query";
import apis from "services/apis";
function AmigoLabel() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'labels', section: 'labels' }))
  const setting = data?.data?.setting || null;
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'labels', section: 'labels' }))
  const sections = sectionData?.data?.sections || [];
  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="container">
          <div className="main-contact ">
            <div className="text-center">
              <div className="welcome-desc ">
                <h3 className="welcome-front ">
                  {setting?.content?.heading}
                </h3>
              </div>
            </div>
            <FaqsAccordian data={sections} />
          </div>
        </div>
      </section>
    </>
  );
}

export default AmigoLabel;
