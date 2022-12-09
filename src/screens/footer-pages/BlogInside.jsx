import React from "react";
import { Header } from "../../components";
import { useParams } from "react-router-dom";
import apis from "services/apis";
import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import _html from "helper/_html";
function BlogInside() {
  const {id} = useParams();
  const {data, isLoading, error} = useQuery(['getSingleSection'], () => apis.getSingleSection({ page: 'blog', section: 'blog',id:Number(id) }))
  const section = data?.data?.section || [];

  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="main-contact ">
          <div className="text-center">
            <div className="welcome-desc ">
              <h2 className="welcome-front ">
                {section?.content?.heading}
              </h2>
            </div>
          </div>
          <div className="container">
            <div className="blog-image">
              <img src={asset(section?.content?.image)} alt="musicians" />
            </div>
            <div className="mt-4">
              {_html(section?.content?.description)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogInside;
