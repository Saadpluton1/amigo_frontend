import { useTeamSlider } from "hooks/useGeneralSLider";
import Slider from "react-slick";
import imageUrl from "utils/ImageUrl";

export default function Team()
{
    const sliderSetting = useTeamSlider()
    return <>
        <section className="new-custom-section">
        <div className="container">
            <div className="text-center">
                <h3 className="new-section-title new-primary-text">AMIGOSOUND TEAM</h3>
            </div>
            <div className="team-main">
                <Slider {...sliderSetting}>
                    {
                        Array(6).fill(0).map((item, _ind) => {
                            return <>
                                <div className="team-card">
                                    <div className="team-img-section">
                                        <img src={imageUrl('akcent.png')} alt="" />
                                    </div>
                                        <div className="team-body">
                                            <div className="team-body-detail">
                                            <h3 className="team-name">Andrei Mircea</h3>
                                            <p className="team-desc">
                                                Business Architecture Reflection Group, PR & PA - Marketing Specialist
                                            </p>
                                            
                                        </div>
                                        <div className="team-footer">
                                            <div className="text-center">
                                                <h4 className="designation">CEO CO-Founder</h4>
                                            </div>
                                            <ul className="team-social">
                                                <li>
                                                    <a href="#">
                                                        <i class="fa-brands fa-linkedin-in"></i>
                                                    </a>
                                                    <a href="#">
                                                    <i class="fa-brands fa-twitter"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                            </>
                        })
                    }
                </Slider>
            </div>
        </div>
    </section>
    </>
}