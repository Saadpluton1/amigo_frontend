import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import _html from "helper/_html";
import apis from "services/apis";

export default function WhatIsAmigoSound() {
    const { data, isLoading, error } = useQuery(['getWhatSetting'], () => apis.getSetting({ page: 'home', section: 'what' }))
    const setting = data?.data?.setting || null;
    return <>
        <section className="new-custom-section mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-12">
                        <h3 className="new-section-title"><span className="new-primary-text">{setting?.content?.heading}</span>? </h3>
                        <div className="section-description-text">
                            <p className="normal-p">
                                {_html(setting?.content?.description)}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-12">
                        <div className="text-center">
                            <img src={asset(setting?.content?.image)} alt="" className="what-img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}