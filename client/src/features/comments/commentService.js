import axios from "axios";

const API_URL = "/posts/comment";

const getComments = async () => {
  const { data } = await axios.get(API_URL);
  return { data };
};

const addComment = async (token, commentData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // const {data} = await axios.post(API_URL, commentData, config);
  // return data
  return { commentData };
};

// Delete user Comment
const deleteComment = async (token, commentID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // const { data } = await axios.delete(API_URL + commentID, config);

  // return data;
  return commentID;
};

const commentService = {
  getComments,
  addComment,
  deleteComment,
};

export default commentService;
