import React from "react";
import { Image } from "react-bootstrap";

const AllComments = () => {
  return (
    <div className="comments media pt-1">
      <Image
        className="post-user-image"
        src="/profile.jpg"
        alt="profile-image"
      />
      <div className="media-body my-1 ps-3 show-comment">
        <div className="d-flex">
          <h6 className="m-0 fw-bolder p-1">Manzoor Ahad Wayar</h6>
          <span className="small time ps-1 pt-1">2 minutes ago</span>
        </div>
        <p className="comment-text pb-1 ps-3 m-0">So nice dear</p>
      </div>
    </div>
  );
};

export default AllComments;
