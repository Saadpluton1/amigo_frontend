import { useMutation, useQuery } from "@tanstack/react-query";
import { Header } from "components/New";
import auth from "helper/auth";
import apis from "services/_api";
import imageUrl from "utils/ImageUrl";
import { Loader } from "components";
import { toast } from "react-toastify";


export default function () {
    const user = auth();
    const {data,isLoading,isError,refetch} = useQuery(['getMyMusic'],()=>apis.getArtistTrack(user?._id))
    const songs = data?.data || [];

    const { mutate, isLoading: isLoadingRemove } = useMutation(apis.trackDeleted, {
        onError: function (error) {
            toast.error(error.toString())
        },
        onSuccess: ({ data }) => {
            if (data.status) {
                toast.success(data.message)
                refetch()
            } else {
            }
        },
    });

    const deleteTracks = (id)=>{
        mutate(id);
    }
    return <>
        <Header />
        <section>
            <div className="container">
                <div className="texture-bg new-big-form mt-5 mb-5">
                    <h3 className="form-section-title">
                    <span className="new-primary-text">My music</span></h3>
                    <div className="tracklist-main mt-4">
                        {isLoading || isLoadingRemove? <><Loader></Loader></> : <> {

                           songs?.length > 0 ?
                           <>
                           {
                            songs?.map((item, _ind) => {
                                return <>
                                    <div className="track-tr">
                                        <div className="tracktd track-td-first">
                                            <div className="track-detail-main">
                                                <div className="track-img-box">
                                                <img src={item.image} width={"41px"} alt="song-image.png" />
                                                </div>
                                                    <div className="detail">
                                                        <h5>{item?.name}</h5>
                                                        <div className="action-key">
                                                            <div className="inner">
                                                                <i class="fa-solid fa-headphones"></i>
                                                                <span>{item?.totalListeners}</span>
                                                            </div>
                                                            <div className="inner">
                                                                <i class="fa-solid fa-heart m-0 p-0"></i>
                                                                <span>{item?.totalLikes}</span>
                                                            </div>
                                                            <div className="inner">
                                                                <i class="fa-solid fa-share-nodes"></i>
                                                                <span>{item?.totalShares}</span>
                                                            </div>
                                                            <div className="inner">
                                                                <i class="fa-solid fa-comment-dots"></i>
                                                                <span>{item?.totalComments}</span>
                                                            </div>
                                                        </div>
    
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tracktd track-td-10-percent">
                                                <div className="duration">
                                                    <span>{item?.duration}</span>
                                                </div>
                                            </div>
                                            <div className="tracktd track-td-10-percent">
                                                <div className="equipments">
                                                    <img src={imageUrl('music-logo.png')} alt="music-logo.png" className="pointer" />
                                                    <img src={imageUrl('nodes.png')} alt="music-logo.png" />
                                                    <a href={"#"} >
                                                        <img src={imageUrl('downloads.png')} alt="music-logo.png" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="tracktd track-td-30-percent flex-end">
                                            <div className="track-td-action">
                                                <a href={`/update-track/${item._id}`} className="track-action">Edit</a>
                                                <span>|</span>
                                                <a href="#" onClick={()=>deleteTracks(item._id)} className="track-action">Delete</a>
                                            </div>
                    
                                    </div> 
                                        </div>
                                       
                                </>
                                })
                           }
                           </>
                           :
                           <>
                           <div class="find-songs">
                            <div class="inside-songs">
                                <p className="mb-4">
                                    Music not found.
                                </p>
                                </div>
                            </div>
                           </>
                        }</>}
                       
                    </div>
                </div>
            </div>
        </section>
    </>
}