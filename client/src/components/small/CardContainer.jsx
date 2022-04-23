import React from "react";
import { Container, Row } from "react-bootstrap";

const CardContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">{children}</Row>
    </Container>
  );
};

export default CardContainer;
