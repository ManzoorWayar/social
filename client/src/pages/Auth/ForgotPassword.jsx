import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { InputGroup, Form, Image, Button, Col, Spinner } from "react-bootstrap";
import CardContainer from "../../components/small/CardContainer";
import sideImage from "../../core/images/login.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Schema from "../../utils/validationSchema";
import errorHandler from "../../utils/errorHandler";
import { forgotPassword } from "../../features/auth/authSlice";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Schema.ForgotPassword),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, authError, isVerified, message } =
    useSelector((state) => state.auth);

  // Server error-handler
  let error = errorHandler(authError);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }

    if (isVerified && isSuccess) {
      toast.success(message);
    }
  }, [dispatch, navigate, isError, isSuccess, error, isVerified, message]);

  const onSubmitHandler = (data) => {
    dispatch(forgotPassword(data)).then(() => (isError && !message) ?? reset());
  };

  return (
    <CardContainer>
      <Col xs={6} md={6}>
        <Image src={sideImage} fluid className="d-none d-lg-block mt-5" />
      </Col>
      <Col xs={12} md={6} sm={12}>
        <div className="mt-5 ms-5 auth-card justify-center">
          <h4 className="text-primary py-2 text-center">
            Find Your SocialName Account
          </h4>
          <Form className="mt-2" onSubmit={handleSubmit(onSubmitHandler)}>
            <Form.Group controlId="email">
              <Form.Label className="resize">Email</Form.Label>
              <InputGroup>
                <InputGroup.Text className="addon-icon" id="basic-addon1">
                  <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Enter email"
                  className={`auth-input ${
                    (errors.email || error) && "is-invalid"
                  }`}
                ></Form.Control>
              </InputGroup>
              <p className="small required-msg text-danger">
                {errors.email?.message || error}
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
              {isLoading ? " Loading" : " Send Verification"}
            </Button>
          </Form>
        </div>
      </Col>
    </CardContainer>
  );
};

export default ForgotPassword;
