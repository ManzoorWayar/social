import React from "react";
import { Form } from "react-bootstrap";

const CommentForm = () => {
  return (
    <Form autoComplete="off" autoCorrect="on">
      <fieldset className="fieldInput">
        <Form.Control
          className="comment-input"
          type="text"
          placeholder="Your comment here..."
        />
        <button type="submit" className="form-submit">
          <i className="fa-solid fa-paper-plane text-info"></i>
        </button>
      </fieldset>
    </Form>
  );
};

export default CommentForm;
