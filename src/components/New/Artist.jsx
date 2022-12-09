import { useQuery } from "@tanstack/react-query";
import Image from "components/Image";
import asset from "helper/asset";
import _html from "helper/_html";
import apis from "services/apis";

export default function Artist() {
    const {data} = useQuery(['getArtistSetting'], () => apis.getSetting({page:'home',section:'artists'}))
    const setting = data?.data?.setting || null;
    return <>
        <section className="new-custom-section">
            <div className="container">
                <h2 className="big-heading big-font mobile-d-none"><span className="new-primary-text">{setting?.content?.heading}</span></h2>
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-12 mobile-order-2">
                    <h2 className="big-heading big-font desktop-d-none"><span className="new-primary-text">{setting?.content?.heading}</span></h2>
                        <div className="">
                            <p className="normal-p">
                                {_html(setting?.content?.description)}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-12 mobile-order-1">
                        <div className="text-center">
                            <Image path={asset(setting?.content?.image)} className="changer-img"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}