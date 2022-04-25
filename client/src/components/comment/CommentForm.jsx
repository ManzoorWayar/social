import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";

const CommentForm = ({ handleSubmit, submitLable }) => {
  const [content, setContent] = useState("");

  const isDisabled = content.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(content);
    setContent("");
  };

  return (
    <div className="media">
      <Image
        className="post-user-image me-1 border"
        src="/profile.jpg"
        alt="profile-image"
      />
      <div className="media-body">
        <Form onSubmit={onSubmit} autoComplete="off" autoCorrect="on">
          <fieldset className="fieldInput">
            <Form.Control
              className="comment-input"
              type="text"
              value={content}
              name="content"
              placeholder="Your comment here..."
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" className="form-submit" disabled={isDisabled}>
              <i className="fa-solid fa-paper-plane text-info"></i>
            </button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default CommentForm;
