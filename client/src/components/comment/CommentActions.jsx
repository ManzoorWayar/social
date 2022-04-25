import React from "react";
import { deleteComment } from "../../features/comments/commentSlice";
import { useDispatch } from "react-redux";

const CommentActions = ({
  canReply,
  canEdit,
  canDelete,
  commentID,
  setActive,
  show,
  setShow,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="pt-3 pb-2">
      <div className="d-flex flex-row">
        {canReply && (
          <div className="">
            <i
              className="fa-solid fa-reply text-info"
              onClick={() => {
                setActive({ type: "replying", id: commentID });
                setShow(!show);
              }}
            ></i>
          </div>
        )}
        {canEdit && (
          <div className="px-4">
            <i className="fa-solid fa-pen text-success"></i>
          </div>
        )}
        {canDelete && (
          <div className="">
            <i
              className="fa-solid fa-trash text-danger"
              onClick={() => dispatch(deleteComment(commentID))}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentActions;
