import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { InputGroup, Form, Image, Button, Col, Spinner } from "react-bootstrap";
import FormContainer from "../../components/small/FormContainer";
import sideImage from "../../core/images/login.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Schema from "../../utils/validationSchema";
import PasswordToggle from "../../components/small/PasswordToggle";
import { resetPassword, authReset } from "../../features/auth/authSlice";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(Schema.RePassword),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams();

  const [type, icon] = PasswordToggle();

  const { userInfo, isError, isSuccess, isLoading, isVerified, message } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");

    if (isError) {
      toast.error(message);
    }

    if (isVerified && isSuccess) {
      toast.success(message.msg);
      navigate("/login");
    }

    dispatch(authReset());
  }, [navigate, dispatch, userInfo, isError, isSuccess, isVerified, message]);

  const onSubmitHandler = (data) => {
    data.resetToken = resetToken;
    dispatch(resetPassword(data)).then(() => (isError && !message) ?? reset());
  };

  return (
    <FormContainer>
      <Col xs={6} md={6}>
        <Image src={sideImage} fluid className="d-none d-lg-block mt-5" />
      </Col>
      <Col xs={12} md={6} sm={12}>
        <div className="mt-5 ms-5 auth-card justify-center">
          <h4 className="text-primary text-center">
            Change your socialName Account Password
          </h4>
          <Form className="mt-2" onSubmit={handleSubmit(onSubmitHandler)}>
            <Form.Group controlId="newPassword">
              <Form.Label className="resize">New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={type}
                  {...register("newPassword")}
                  name="newPassword"
                  className={`auth-input ${errors.newPassword && "is-invalid"}`}
                  placeholder="Enter new Password"
                ></Form.Control>
                <InputGroup.Text className="addon-icon">{icon}</InputGroup.Text>
              </InputGroup>
              <p className="small required-msg  text-danger">
                {errors.newPassword?.message}
              </p>
            </Form.Group>

            <Form.Group controlId="confirm-password">
              <Form.Label className="resize">confirm-password</Form.Label>
              <InputGroup>
                <InputGroup.Text className="addon-icon">
                  <i className="fa-solid fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type={type}
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  className={`auth-input ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  placeholder="confirm-password"
                ></Form.Control>
              </InputGroup>
              <p className="small required-msg  text-danger">
                {errors.confirmPassword?.message}
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
              {isLoading ? " Loading" : " Change Password"}
            </Button>
          </Form>
        </div>
      </Col>
    </FormContainer>
  );
};

export default ResetPassword;
