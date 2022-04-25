import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import CommentActions from "./CommentActions";
import CommentForm from "./CommentForm";

const Comment = ({
  comment: { id, username, createdAt, content, userId },
  replies,
  active,
  setActive,
  parentID = null,
  addComment,
  index,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(index);
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(createdAt) < fiveMinutes;

  const canReply = Boolean(userInfo._id);
  // const canEdit = userId === userInfo._id && !timePassed;
  // const canDelete = userId === userInfo._id && !timePassed;

  const canEdit = true;
  const canDelete = true;

  const isReplying = active && active.type === "replying" && active.id === id;

  const replyID = parentID ? parentID : id;

  const [show, setShow] = useState(false);

  return (
    <div className="comments media pt-1">
      <Image
        className="post-user-image"
        src="/profile.jpg"
        alt="profile-image"
      />
      <div className="media-body my-1 ps-3 show-comment">
        <div className="d-flex">
          <h6 className="m-0 fw-bolder p-1">{username}</h6>
          <span className="small time ps-1 pt-1">{createdAt}</span>
        </div>
        <p className="comment-text pb-1 ps-3 m-0">{content}</p>
        <CommentActions
          canReply={canReply}
          canEdit={canEdit}
          canDelete={canDelete}
          commentID={id}
          setActive={setActive}
          show={show}
          setShow={setShow}
        />
        {show && isReplying && (
          <CommentForm
            submitLable="Reply"
            handleSubmit={() => addComment(content, replyID)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={[]}
                active
                setActive
                parentID={id}
                addComment
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
