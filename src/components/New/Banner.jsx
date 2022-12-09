import { useQuery } from "@tanstack/react-query";
import asset from "helper/asset";
import _html from "helper/_html";
import useAuth from "hooks/useAuth";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import apis from "services/apis";
export default function Banner() {
    const user = useAuth()

    const SliderSetting = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => <ul>{dots}</ul>,
        customPaging: i => (
            <div className="slick-dot-custom">

            </div>
        ),
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const { data } = useQuery(['getBannerSetting'], () => apis.getSetting({ page: 'home', section: 'banner' }))
    const setting = data?.data?.setting || null;
    const { data: sections} = useQuery(['getBannerSection'], () => apis.getSection({ page: 'home', section: 'banner' }))
    const banners = sections?.data?.sections || null;
    return <>
        <div className="container">
            <div className="new-banner">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-12 col-md-12 res-order-2">
                        <div className="new-banner-text">
                            <h1>{_html(setting?.content?.heading)}</h1>
                           {user ? <></> : <><div className="new-banner-desc">
                                <p className="normal-p">
                                    {_html(setting?.content?.description)}
                                </p>
                                <div className="button-group-banner">
                                    <Link to="/signup" className="new-custom-btn new-primary-btn">I’m an Artist</Link>
                                    <Link to="/signup" className="new-custom-btn new-secondary-btn">I’m a Fan</Link>
                                </div>
                            </div></>}
                            
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 col-md-12 res-order-1">
                        <div className="banner-slider-main">
                            {
                                banners?.length > 0 ?
                                    <Slider {...SliderSetting}>
                                        {
                                            banners?.map((item, _ind) => {
                                                const { image = '', heading = '', sub_heading = '' } = JSON.parse(item.content);
                                                return <>
                                                    <div className="slider-inner-new">
                                                        <img src={asset(image)} alt="" />
                                                        <div className="slider-footer-new">
                                                            <h3>{heading}</h3>
                                                            <span>{sub_heading}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </Slider>
                                    :
                                    ''
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}