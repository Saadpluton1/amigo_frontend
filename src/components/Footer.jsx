import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import apis from "services/apis";
import imageUrl from "../utils/ImageUrl";
function Footer() {
  const {data, isLoading, error} = useQuery(['getFooterSetting'], () => apis.getSetting({ page: 'all', section: 'social' }))
  const setting = data?.data?.setting || [];
  const {data : sectionData, isLoading: sectionLoading, error: sectionError} = useQuery(['getSocial'], () => apis.getSection({ page: 'home', section: 'footer-social' }))
  const socials = sectionData?.data?.sections || [];
  const {data : webData, isLoading : webIsLoading, error : webError} = useQuery(['getWebSetting'], () => apis.getSetting({ page: 'all', section: 'setting' }))
  const websetting = webData?.data?.setting || [];
  return (
    <section id="footer-end">
      <div className="container">
        <div className="section-padding">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <h5>Useful Links</h5>
              <div className="useful-links">
                <ul className="links">
                  <li>
                    <Link to={"/privacy-policy"}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to={"/terms"}>Terms of Services</Link>
                  </li>
                  <li>
                    <Link to={"/faq"}>FAQ’s</Link>
                  </li>
                  <li>
                    <Link to={"/amigo-referral"}>Amigo Referral </Link>
                  </li>
                  <li>
                    <Link to={"/amigo-afiliate"}>Amigo Affiliate</Link>
                  </li>
                  <li>
                    <Link to={"/contact-us"}>Contact us</Link>
                  </li>
                  <li>
                    <Link to={"/blog"}>Blog</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-service">
                <h5>Company</h5>
                <ul className="links">
                  <li>
                    <Link to={"/about-us"}>About us</Link>
                  </li>
                  <li>
                    <Link to={"/amigo-artist"}>Amigo for Artists</Link>
                  </li>
                  <li>
                    <Link to={"/amigo-fans"}>Amigo for Fans</Link>
                  </li>
                  <li>
                    <Link to={"/amigo-label"}>Amigo for Record Labels</Link>
                  </li>
                  <li>
                    <Link to={"/partners"}>Partners</Link>
                  </li>
                  <li>
                    <Link to={"/ambassoder"}>Ambassadors</Link>
                  </li>
                  <li>
                    <Link to={"/investors"}>Investors</Link>
                  </li>
                  <li>
                    <Link to={"/advertise-amigo"}>Advertise on Amigo</Link>
                  </li>
                  <li>
                    <a
                      target={"_blank"}
                      href={"mailto:"+websetting?.content?.subscribe}
                      rel="noreferrer"
                    >
                      {" "}
                      Subscribe
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-service">
                <h5>Amigo Sound Token</h5>
                <ul className="links">
                  <li>
                    <Link to={"/token-sale"}>Token Sale</Link>
                  </li>
                  <li>
                    <Link to={"/roadmap"}>Roadmap</Link>
                  </li>
                  <li>
                    <Link to={"/team"}>Team</Link>
                  </li>
                  <li>
                    <a href={asset(websetting?.content?.whitepaper)} target="_blank" download>Whitepaper</a>
                  </li>
                  <li>
                    <Link to={"/faq-soon"}>FAQ’s</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 letter-col">
              <div className="text-letter">
                <h5 className="mb-4">{setting?.content?.heading}</h5>
                <p className="mb-3">{setting?.content?.sub_heading}</p>
              </div>
              <div className="area-text ">
                <div>
                  <input
                    type="email"
                    className="form-control email-input"
                    id="exampleFormControlInput1"
                    placeholder="Your Email"
                  />
                </div>
                <div className="btn-submit">
                  <button className="submit">SUBMIT</button>
                </div>
              </div>
              <div className="icon-list">
                <h5 className="mb-3">{setting?.content?.social_heading}</h5>
                <div className="icons-group">
                  {
                    socials.map((item,i)=>{
                      const {image = '',link = ''} = JSON.parse(item.content);
                      return <>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="custom-telegram"
                          src={asset(image)}
                          alt=""
                        />
                      </a>
                      </>
                    })
                  }
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
