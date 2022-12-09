import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _api from "services/_api";
import imageUrl from "../utils/ImageUrl";
import AddPlayListModal from "./AddPlayListModal";

function PlayListModal({ open, close,trackId }) {
  const navigate = useNavigate();
  const [modelOpen, setModalOpen] = useState(false);

  const user = useAuth();
  const req =  user?.role === "artist" ? {artistId:user?._id} : {userId:user?._id}
  

  const { data : playlistData, isLoading : playlistIsLoading, error : playlistError } = useQuery(['getMyPlaylist'], () => _api.getPlaylistByUser(req))
  const playlists = playlistData?.data?.playLists || [];
  const { mutate, isLoading } = useMutation(_api.addTrackInPalylist, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success(data.message)
        close();
      } else {
      }
    },
  });

  const addSongToPlayList = (playlistId) =>{
    let reqData;
    if( user?.role == "user" || user?.role == "admin")
    {
     reqData = {playlistId:playlistId,userId:user?._id,trackId:trackId}
     mutate(reqData)
    }
    else{
      reqData = {playlistId:playlistId,artistId:user?._id,trackId:trackId}
      mutate(reqData)
 
    }
  }
  const addModal = () =>{
    close()
    setModalOpen(true)
  }
  return <>
  <div 
      className={open ? "modal d-block" : "modal fade" }
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              My PlayList
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
            ></button>
          </div>
          <div className="modal-body">
            {
              playlists?.length > 0 ?
              <>
                    <ul className="my-playlist-modal" style={{ overflowY: 'auto' , height : "500px"}}>
                    {
                        playlists.map((item,_ind)=>{
                            return <>
                             <li className="pointer" onClick={()=>addSongToPlayList(item?._id)}>
                                <img src={item?.image == null ? imageUrl('noimage.png') : item?.image} alt="" />
                                <div className="title-section">
                                    <p>{item?.title}</p>
                                    <span>{item?.artistName == null ? 'Amigo Sound' : item?.artistName}</span>
                                </div>
                            </li>
                            </>
                        })
                    }
                   
                </ul>
              </>
              :
                <div class="find-songs">
                <div class="inside-songs">
                  <p className="mb-4">
                    Playlist not founds.
                  </p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    onClick={() => addModal()}
                  >
                    Add Playlist
                  </a>
                </div>
              </div>
            }
          
          </div>
        </div>
      </div>
    
    </div>
      <AddPlayListModal open={modelOpen} close={() => setModalOpen(false)} />
  </>
    

}

export default PlayListModal;
