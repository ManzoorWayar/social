import React from "react";
import { Card, Carousel, Image } from "react-bootstrap";
import Comments from "../comment/Comments";
import TimeAgo from "../small/TimeAgo";
import Media from "../small/Media";
import PostActions from "./PostActions";

const Post = ({ post: { user, content, media, createdAt } }) => {
  return (
    <>
      <Card.Title>
        <div className="media">
          <Image
            className="post-user-image"
            src={`uploads/${user.image}`}
            alt="profile-image"
          />
          <div className="media-body px-3">
            <h6 className="my-0 fw-bolder mb-0">{`${user.firstName} ${user.lastName}`}</h6>
            <span className="d-block small time pt-1">
              <TimeAgo timestamp={createdAt} />
            </span>
          </div>
        </div>
      </Card.Title>
      <p className="p-1 pb-0">{content}</p>
      {media && <Media media={media} />}

      <PostActions />
      {/* <Comments /> */}
    </>
  );
};

export default Post;
