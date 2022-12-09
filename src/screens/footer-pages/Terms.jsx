import React from "react";
import { Header } from "../../components";
import apis from "services/apis";
import _html from "helper/_html";
import { useQuery } from "@tanstack/react-query";
function Terms() {
  const { data, isLoading, error } = useQuery(["getSetting"], () =>
    apis.getSetting({ page: "terms", section: "terms" })
  );
  const setting = data?.data?.setting || [];
  const {
    data: sectionData,
    isLoading: sectionLoading,
    error: sectionError,
  } = useQuery(["getSection"], () =>
    apis.getSection({ page: "terms", section: "terms" })
  );
  const sections = sectionData?.data?.sections || [];
  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="container">
          <div className="welcome-desc">
            <h3 className="welcome-front text-center">
              {setting?.content?.heading}
            </h3>
          </div>
          {sections.map((item) => {
            const { heading = "", description = "" } = JSON.parse(item.content);
            return (
              <>
                <div className="welcome-desc">
                  <h3 className="welcome-front amigo ">{heading}</h3>
                  <div className="mt-4">{_html(description)}</div>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Terms;
