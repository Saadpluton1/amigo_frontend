import React from "react";
import {  Header } from "../../components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apis from "services/apis";
import asset from "helper/asset";
function Blog() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'blog', section: 'blog' }))
  const setting = data?.data?.setting || [];
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'blog', section: 'blog' }))
  const sections = sectionData?.data?.sections || [];
  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="main-contact ">
          <div className="text-center">
            <div className="welcome-desc ">
              <h3 className="welcome-front ">{setting?.content?.heading} </h3>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {sections.map((item, ind) => {
                const {image = '',heading = '',short_intro = ''} = JSON.parse(item.content)
                return <>
                <div className="col-lg-4">
                  <div className="card-box1">
                    <div className="card-desc">
                      <Link to={'/blog-inside/'+item.id}>
                        <img
                          src={asset(image)}
                          alt={heading}
                        />
                        <h2>{heading}</h2>
                      </Link>

                      <p>{short_intro}</p>
                    </div>
                  </div>
                </div>
                </>
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
