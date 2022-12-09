import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import _html from "helper/_html";
import React from "react";
import apis from "services/apis";
function HomeWelcome() {
  const { data, isLoading, error } = useQuery(['getHomeSection'], () => apis.getSection({ page: 'home', section: 'sections' }))
  const sections = data?.data?.sections || [];
  const { data: getStartedData, isLoading: getStartedDataIsLoading, error: getStartedDataError } = useQuery(['getStarted'], () => apis.getSetting({ page: 'home', section: 'getstarted' }))
  const getstarted = getStartedData?.data?.setting || null;
  return (
    <>
      <section className="text-home ">
        <div className="container">
          {
            sections.map((item, i) => {
              const { sub_heading = '', image = '', heading = '', description = '' } = JSON.parse(item.content);
              return <>
                <div className={"container-fluid " + (i == 2 && 'mt-5')}>
                  <div className="row align-items-end">
                    <div className="col-lg-6">
                      <div className="welcome-desc">
                        <h2 className="welcome-back">{heading}</h2>
                        <h3 className="welcome-front">{heading}</h3>
                        <h3 className="welcome-front amigo"> {_html(sub_heading)}</h3>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className={"powered " + (sections.length == i + 1 && 'fire')}>
                        {
                          image != '' ?
                            <img src={asset(image)} alt="" />
                            : ''
                        }
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    {_html(description)}
                  </div>
                </div>
              </>
            })
          }
          <div class="container-fluid mt-5" bis_skin_checked="1">
            <div class="row align-items-end" bis_skin_checked="1">
              <div class="col-lg-12" bis_skin_checked="1">
                <div class="centertext-started d-flex justify-content-center" bis_skin_checked="1">
                  <div class="welcome-desc " bis_skin_checked="1">
                    <h2 class="welcome-back left-0">{getstarted?.content?.heading}</h2>
                    <h3 class="welcome-front text-center font-weight-normal">{getstarted?.content?.heading}</h3>
                    <h3 class="welcome-front amigo-heading">{getstarted?.content?.sub_heading}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeWelcome;
