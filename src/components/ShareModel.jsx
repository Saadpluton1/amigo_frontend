import { useMutation } from "@tanstack/react-query";
import useCopyToClipboard from "hooks/copyToClipBoard";
import useAuth from "hooks/useAuth";
import React from "react";
import { toast } from "react-toastify";
import _api from "services/_api";

function ShareModal({ open, close , trackId , playlistId , artistId , albumId}) {
  const [copyToClipBoard] = useCopyToClipboard();
const user = useAuth()

  const { mutate } = useMutation(_api.shareCount, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success("Copied")
        close(false);
      } else {

      }
    },
  });
  const { mutate : mutatePlaylist} = useMutation(_api.shareCountPlaylist, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success("Copied")
        close(false);
      } else {

      }
    },
  });
  
  const { mutate : mutateArtist } = useMutation(_api.shareCountArtist, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success("Copied")
        close(false);
      } else {

      }
    },
  });

  const { mutate : mutateAlbum, isLoading : isLoadingAlbum } = useMutation(_api.shareCountAlbum, {
    onError: function (error) {
      toast.error(error.toString())
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        toast.success("Copied")
        close(false);
      } else {

      }
    },
  });

  const shareCount = async () => {
    
    if(user)
    {
    if(trackId)
    {
      copyToClipBoard(`http://amigo-cms.pluton.ltd/trending-inside/${trackId}`)
      mutate({ trackId : trackId})
    }
    if(playlistId)
    {
      copyToClipBoard(`http://amigo-cms.pluton.ltd/playlist-inside/${playlistId}`)
      mutatePlaylist({ playlistId : playlistId})
    }
    if(artistId)
    {
      copyToClipBoard(`http://amigo-cms.pluton.ltd/artist-inside/${artistId}`)
      mutateArtist({ artistId : artistId})
    }
    if(albumId)
    {
      copyToClipBoard(`http://amigo-cms.pluton.ltd/album-inside/${albumId}`)
      mutateAlbum({ albumId : albumId})
    }
  }
  else{
    toast.info("Login first")
       
  }
    }
  
  return (
    <div
      className={open ? "modal d-block" : "modal fade"}
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
             <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Share On
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
              <div class="form-floating mt-4 mb-5" style={{cursor : "pointer"}} onClick={()=>{shareCount()}}>
               <h2  to={"#"} ><i class="fa-solid fa-share-nodes"></i>  Copy Link</h2>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
