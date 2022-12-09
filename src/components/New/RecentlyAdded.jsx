import { useQuery } from "@tanstack/react-query";
import { useRecentSlider } from "hooks/useGeneralSLider";
import Slider from "react-slick";
import imageUrl from "utils/ImageUrl";
import _api from "../../services/_api"
export default function RecentlyAdded() {
   
    const { data, isLoading, isRefetching, refetch} = useQuery(['getRecent'], () => _api.getRecentArtist())
    let artist = data?.data || []
    console.log(artist,"ARTIST")
    const sliderSetting = useRecentSlider()
    return <>
        <section className="recently-added">
            <div className="recently-head">
                <h3>Recently added</h3>
                <div className="recently-slider mt-4">
                {artist?.length > 4 && 
                    <Slider {...sliderSetting}>
                        {
                            artist?.map((item, _ind) => {
                                return <>
                                    <div className="recent-slider-box mx-3">
                                        <img src={item?.image} alt="" className="main-img" />
                                        <div className="listing-main">
                                            <ul>
                                                <li>
                                                    <img src={imageUrl('akcent.png')} alt="" />
                                                </li>
                                                <li>
                                                    <img src={imageUrl('atif.png')} alt="" />
                                                </li>
                                                <li>
                                                    <img src={imageUrl('akcent.png')} alt="" />
                                                </li>
                                            </ul>
                                            <span>10+ Place</span>
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </div>
                                        <div className="desc-section">
                                            <h4>{item?.name}</h4>
                                            <h5>{item?.country}</h5>
                                        </div>
                                        <div className="recent-box-foot">
                                            <p>100k plays</p>
                                            <span><i class="fa-regular fa-heart"></i>{item?.totalLikes}</span>
                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </Slider>
                    }
                </div>
            </div>
        </section>
    </>
}