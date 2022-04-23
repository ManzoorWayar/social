import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import CardContainer from "../../components/small/CardContainer";
import CommentForm from "../../components/comment/CommentForm";
import AllComments from "../../components/comment/AllComments";
import Three from "../../components/post/Three";

const NewsFeed = () => {
  return (
    <CardContainer>
      <Col xl={3} md={3}>
        asd
      </Col>
      <Col xl={6} md={6}>
        <Card className="post-card">
          <Card.Body>
            <Card.Title>
              <div className="media">
                <Image
                  className="post-user-image"
                  src="/profile.jpg"
                  alt="profile-image"
                />
                <div className="media-body px-3">
                  <h6 className="mt-0 fw-bolder mb-0">Manzoor Ahad Wayar</h6>
                  <span className="small time pt-1">2 minutes ago</span>
                </div>
              </div>
            </Card.Title>
            <p className="p-1 pb-0"> My first Post is this! </p>
            <Image className="card-img" src="/post.jpg" alt="profile-image" />

            <Three />

            <AllComments />
            <div className="comment me-2 mt-2">
              <div className="media">
                <Image
                  className="post-user-image me-1 border"
                  src="/profile.jpg"
                  alt="profile-image"
                />
                <div className="media-body">
                  <CommentForm />
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={3} md={3}>
        asd
      </Col>
    </CardContainer>
  );
};

export default NewsFeed;
