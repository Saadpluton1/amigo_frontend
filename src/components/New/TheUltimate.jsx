import { useQuery } from "@tanstack/react-query"
import _html from "helper/_html";
import apis from "services/apis"

export default function TheUltimate() {
    const {data,isLoading,error} = useQuery(['getUltimateSetting'],() => apis.getSetting({page:"home",section:'ultimate'}))
    const setting = data?.data?.setting || null;
    return <>
        <section className="new-custom-section">
            <div className="container mt-5 mb-6">
                <div className="section2">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <h2 className="big-heading" style={{color:'#CBCBCE'}}>{_html(setting?.content?.heading)}</h2>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
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