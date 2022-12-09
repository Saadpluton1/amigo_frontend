import React from "react";
import { Header } from "../../components";
import { useQuery } from "@tanstack/react-query";
import apis from "services/apis";
import asset from "helper/asset";
function ContactUs() {
  const {data, isLoading, error} = useQuery(['getSetting'], () => apis.getSetting({ page: 'contact', section: 'contact' }))
  const setting = data?.data?.setting || null;
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSection'], () => apis.getSection({ page: 'contact', section: 'contact' }))
  const sections = sectionData?.data?.sections || null;
  return (
    <>
      <section className="text-home text-for-footer">
        <Header />
        <div className="main-contact text-center">
          <div className="welcome-desc ">
            <h3 className="welcome-front">{setting?.content?.heading}</h3>
            <h2 className="mt-3">{setting?.content?.sub_heading}</h2>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <h2>{setting?.content?.heading2}</h2>
              <h5>{setting?.content?.sub_heading2}</h5>
              <div className="contact-service">
                {
                  sections.map((item)=>{
                    const {heading = '',image = ''} = JSON.parse(item.content);
                    return <>
                     <div className="contact-inside mt-3">
                      <div className="icon-contact">
                        <img src={asset(image)} alt="" />
                      </div>
                      <p>{heading}</p>
                    </div>
                    </>
                  })
                }
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control contact-form"
                  placeholder="Your Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control contact-form"
                  placeholder="Your Email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control contact-form"
                  placeholder="Your Message"
                  id="floatingTextarea"
                ></textarea>
                <label for="floatingTextarea">Your Message</label>
              </div>
              <div className="contact-submit">
                <a href="#">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
