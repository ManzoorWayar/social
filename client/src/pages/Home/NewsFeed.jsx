import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Card } from "react-bootstrap";
import CardContainer from "../../components/small/CardContainer";
import Post from "../../components/post/Post";
import { getPosts, reset } from "../../features/posts/postSlice";
import Loader from "../../components/small/Loader";

const NewsFeed = () => {
  const dispatch = useDispatch();

  const { posts, isError, isLoading, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CardContainer>
      <Col xl={3} md={3}>
        asd
      </Col>
      <Col xl={6} md={6}>
        {posts.length > 0 ? (
          <article>
            {posts.map((post) => (
              <Card className="post-card mb-2">
                <Card.Body>
                  <Post key={post._id} post={post} />
                </Card.Body>
              </Card>
            ))}
          </article>
        ) : (
          <h3>Create and share your first post</h3>
        )}
      </Col>
      <Col xl={3} md={3}>
        asd
      </Col>
    </CardContainer>
  );
};

export default NewsFeed;
