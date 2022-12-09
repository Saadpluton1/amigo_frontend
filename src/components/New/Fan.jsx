import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import _html from "helper/_html";
import apis from "services/apis";

export default function Fan() {
    const { data } = useQuery(['getFanSetting'], () => apis.getSetting({ page: 'home', section: 'fans' }))
    const setting = data?.data?.setting || null;
    return <>
        <section className="new-custom-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-12">
                        <img src={asset(setting?.content?.image)} alt="" className="base-img" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <h2 className="big-heading big-font"><span className="new-primary-text">{setting?.content?.heading}</span></h2>
                        <div className="">
                            <p className="normal-p">
                            {_html(setting?.content?.description)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}