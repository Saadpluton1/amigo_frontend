import React from "react";
import imageUrl from "../utils/ImageUrl";
import Moment from 'moment';
import { useState } from "react";
function CommentList({ item, storeComment, onChangeHandler, commentIsLoading }) {
  const [isShow,setIsShow] = useState(false)
  console.log("item",item);
  return (
    <>
      {" "}
      <div className="comment-list-text mb-4">
      </div>
        <div className="comments-list">
          <div className="comment-content">
            <div className="comment-image">
              <img src= {item?.image} className = "rounde-image" alt="profile" />
            </div>
            <div className="comment-text">
              <p>{item?.name}</p>
              <div className="comment-inner-text">
                <p>{item?.comments}</p>
                <div className="comment-time">
                  <p>{Moment(item?.createdAt).format('YYYY-MM-DD HH:mm')}</p>
                  <div className="comment-icons">
                    <i className="fa-regular fa-comment-dots pointer" onClick={()=>setIsShow(prevIsShow => !prevIsShow)}> {item?.child?.length}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            isShow && 
            <form onSubmit={(e) => storeComment(e,item?._id)}>
            <div className="form-floating ">
              <textarea
                className="form-control area-form"
                placeholder=""
                id="comments"
                required
                style={{ height: "100px" }}
                onChange={onChangeHandler}></textarea>
              <label for="message">Please share your thoughts</label>
            </div>
            <div className="emojis">
              {
                commentIsLoading ?
                  <button type="submit" disabled className="btn-sm-custom">Loading...</button>
                  :
                  <button type="submit" className="btn-sm-custom">Comments</button>
              }
            </div>
          </form>
          }

          {
            item?.child?.map((child_item, i) => {
              return <>
                <div className="comment-content mt-2" style={{ marginLeft: '2rem' }}>
                  <div className="comment-image">
                    <img src={imageUrl(child_item?.image)} alt="profile" />
                  </div>
                  <div className="comment-text">
                    <p>{child_item?.name}</p>
                    <div className="comment-inner-text">
                      <p>{child_item?.comments}</p>
                      <div className="comment-time">
                        <p>{Moment(child_item?.createdAt).format('YYYY-MM-DD HH:mm')}</p>
                        {/* <div className="comment-icons">
                  <i className="fa-regular fa-thumbs-up"> 1</i>
                  <i className="fa-regular fa-comment-dots"> 1</i>
                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            })
          }
        </div>
    </>
  );
}

export default CommentList;
