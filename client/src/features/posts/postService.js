import axios from "axios";

const API_URL = "/posts";

const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL, config);

  return data;
};

const createPost = async (token, postData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL, postData, config);
  return data;
};

const deletepost = async (token, commentID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(API_URL + commentID, config);

  return data;
};

const commentService = {
  getPosts,
  createPost,
  deletepost,
};

export default commentService;
