import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { InputGroup, Form, Image, Button, Col, Spinner } from "react-bootstrap";
import CardContainer from "../../components/small/CardContainer";
import { accountVerification, authReset } from "../../features/auth/authSlice";
import sideImage from "../../core/images/login.svg";

const Verification = () => {
  const [verifyToken, setVerifyToken] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isError, isSuccess, isLoading, isVerified, message } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");

    if (isError) {
      toast.error(message);
    }

    if (isVerified && isSuccess) {
      toast.success(message);
      navigate("/");
    }

    dispatch(authReset());
  }, [
    navigate,
    dispatch,
    userInfo,
    isError,
    isSuccess,
    isVerified,
    verifyToken,
    message,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    !verifyToken
      ? setError(true)
      : dispatch(accountVerification({ verifyToken })).then(() => {
          setVerifyToken("");
          setError(false);
        });
  };

  return (
    <CardContainer>
      <Col xs={6} md={6}>
        <Image src={sideImage} fluid className="d-none d-lg-block mt-5" />
      </Col>
      <Col xs={12} md={6} sm={12}>
        <div className="mt-5 ms-5 auth-card justify-center">
          <h4 className="text-primary text-center"> Verfication Code</h4>
          <Form className="mt-4" onSubmit={submitHandler}>
            <Form.Group controlId="verification">
              <InputGroup>
                <InputGroup.Text className="addon-icon" id="basic-addon1">
                  <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  name="verfication"
                  value={verifyToken}
                  className={`auth-input ${
                    (error && message) || (error && "is-invalid")
                  }`}
                  onChange={(e) => setVerifyToken(e.target.value)}
                  placeholder="Enter verification code"
                ></Form.Control>
              </InputGroup>
              <p className="small required-msg text-danger">
                {(error && message) ||
                  (error && "Please enter verification code!")}
              </p>
            </Form.Group>
            <Button
              className="btn-block w-100"
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {isLoading ? " Loading" : " Verify Me!"}
            </Button>
          </Form>
        </div>
      </Col>
    </CardContainer>
  );
};

export default Verification;
