import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, InputGroup, Button, Col, Image, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../../components/small/FormContainer";
import Schema from "../../utils/validationSchema";
import errorHandler from "../../utils/errorHandler";
import sideImage from "../../core/images/login.svg";
import { userLogin, authReset } from "../../features/auth/authSlice";
import PasswordToggle from "../../components/small/PasswordToggle";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Schema.Login),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, icon] = PasswordToggle();

  const { isError, isSuccess, isLoading, authError, message } = useSelector(
    (state) => state.auth
  );

  // Server error-handler
  let error = errorHandler(authError);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }

    if (isSuccess) {
      toast.success(message);
      navigate("/");
    }

    dispatch(authReset());
  }, [dispatch, navigate, isError, isSuccess, error, message]);

  const onSubmitHandler = (data) => {
    dispatch(userLogin(data)).then(() => (isError && !message) ?? reset());
  };

  return (
    <FormContainer>
      <Col xs={6} md={6}>
        <Image src={sideImage} fluid className="d-none d-lg-block mt-5" />
      </Col>
      <Col xs={12} md={6} sm={12}>
        <div className="mt-5 ms-5 auth-card justify-top-center ">
          <Form className="m-3" onSubmit={handleSubmit(onSubmitHandler)}>
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

            <Form.Group className="py-3" controlId="password">
              <span className="d-flex justify-content-between">
                <Form.Label className="resize">Password</Form.Label>
                <Form.Label className="resize focus">
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </Form.Label>
              </span>
              <InputGroup>
                <Form.Control
                  type={type}
                  {...register("password", { required: true })}
                  name="password"
                  className={`auth-input ${
                    (errors.password || error) && "is-invalid"
                  }`}
                  placeholder="Enter password"
                ></Form.Control>
                <InputGroup.Text className="addon-icon">{icon}</InputGroup.Text>
              </InputGroup>
              <p className="small required-msg text-danger">
                {errors.password?.message || error}
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
              {isLoading ? " Loading" : " Login"}
            </Button>
            <p className="small resize focus pt-3 text-center">
              Don't have any account?
              <Link className="px-2" to="/register">
                Register
              </Link>
            </p>
          </Form>
        </div>
      </Col>
    </FormContainer>
  );
};

export default Login;
