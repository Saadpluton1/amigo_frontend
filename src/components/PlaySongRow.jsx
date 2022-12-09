import { useState } from "react";
import { numberWithCommas } from "../helper/index";
import imageUrl from "../utils/ImageUrl";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch } from "react-redux";
import { setCurrentSongs } from "redux/slices/trackSlice";
function PlaySongRow({ data,setCurrentSong,index }) {
  const [play, setPlay] = useState(false);
const dispatch = useDispatch();
  const audioPlay = () => {
    setCurrentSong(index)
    setPlay(!play)
  };
  return (
    <tr className="space-under">
      <td>
     
        <i
          className={`fa-solid  ${play ? "fa-pause fff" : "fa-play fff"}`}
          onClick={() => audioPlay()}
        ></i>
      </td>
      <td>
        <div className="song-title-main">
          <img src={imageUrl(data.imageUrl)} alt="song-image.png" />
          <div className="song-text">
            <span>{data?.name}</span>
            <div className="song-desc">
              <p>
                <i className="fa-solid fa-headphones"></i>{" "}
                {numberWithCommas(data?.totalListeners)}
              </p>
              <p>
                <i className="fa-solid fa-heart"></i> {numberWithCommas(data?.totalLikes)}
              </p>
              <p>
                <i className="fa-solid fa-share-nodes"></i>
                {numberWithCommas(data?.totalShares)}
              </p>
              <p>
                <i className="fa-solid fa-comment-dots"></i>
                {numberWithCommas(data?.totalComments)}
              </p>
            </div>
          </div>
        </div>
      </td>
      <td>{data?.artistName}</td>

      <td>
        <div className="equipments">
          <img src={imageUrl('music-logo.png')} alt="music-logo.png" />
          <img src={imageUrl('nodes.png')} alt="music-logo.png" />
          <img src={imageUrl('downloads.png')} alt="music-logo.png" />
       
        </div>
      </td>
      <td><span id="tracktime">{data?.duration}</span></td>
    </tr>
  );
}

export default PlaySongRow;
