import React from "react";
import { Header, FaqsAccordian } from "../../components";
import apis from "services/apis";
import { useQuery } from "@tanstack/react-query";
function Faq() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'faq', section: 'faq' }))
  const setting = data?.data?.setting || [];
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'faq', section: 'faq' }))
  const sections = sectionData?.data?.sections || [];

  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="container">
          <div className="welcome-desc">
            <h3 className="welcome-front text-center">{setting?.content?.heading}</h3>
            <p className="mt-5">
            {setting?.content?.description}
            </p>
          </div>
          <div className="container mt-5">
            <FaqsAccordian data={sections} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
