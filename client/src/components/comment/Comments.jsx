import React, { Suspense, lazy, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "../../components/comment/CommentForm";
import { addComment } from "../../features/comments/commentSlice";

import Loader from "../small/Loader";

const Comment = lazy(() => import("./Comment"));

const Comments = () => {
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();

  const { comments, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.comments
  );

  const rootComments = comments.filter((comment) => comment.replyTo === null);

  const replyComments = (commentID) =>
    comments.filter((replyComment) => replyComment.replyTo === commentID);

  useEffect(() => {}, []);

  const aaddComment = (content, replyTo) => {
    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      content,
      replyTo,
      username: "asd",
      createdAt: new Date(),
      userId: 4,
    };

    dispatch(addComment(newComment));
  };

  return (
    <div>
      {rootComments.map((comment) => (
        <Suspense fallback={<Loader />}>
          <Comment
            key={comment.id}
            comment={comment}
            replies={replyComments(comment.id)}
            active={active}
            setActive={setActive}
            addComment={aaddComment}
          />
        </Suspense>
      ))}
      <div className="comment me-2 mt-2">
        <CommentForm handleSubmit={aaddComment} submitLabel="Create" />
      </div>
    </div>
  );
};

export default Comments;
