import { useQuery } from "@tanstack/react-query";
import React from "react";
import apis from "services/apis";
import { Header } from "../../components";
function AmigoAfiliate() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'affiliate', section: 'affiliate' }))
  const setting = data?.data?.setting || [];
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'affiliate', section: 'affiliate' }))
  const sections = sectionData?.data?.sections || [];

  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="container">
          <div className="welcome-desc">
            <h3 className="welcome-front ">
              {setting?.content?.heading}
            </h3>
            <p className="mt-3">
            {setting?.content?.description}
            </p>
          </div>
          <div className="affiliate-main">
            <div className="container">
              <div className="row">
                {
                  sections.map((item)=>{
                    const {heading = '',sub_heading = '',description = '',button_text = '',button_link = ''} = JSON.parse(item.content)
                    return <>
                    <div className="col-lg-4">
                    <div className="signup-affiliate mt-5">
                      <h4>
                        {" "}
                        <span> {heading} </span>
                      </h4>
                      <h5 className="mt-3"> {sub_heading}</h5>
                      <p className="my-3">
                      {description}
                      </p>
                      <a href={button_link}>{button_text}</a>
                    </div>
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

export default AmigoAfiliate;
