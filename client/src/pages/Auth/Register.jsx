import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  InputGroup,
  Row,
  Col,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../../components/small/FormContainer";
import Schema from "../../utils/validationSchema";
import errorHandler from "../../utils/errorHandler";
import { userRegister, authReset } from "../../features/auth/authSlice";
import sideImage from "../../core/images/login.svg";
import SelectOptions from "../../components/SelectOptions";
import PasswordToggle from "../../components/small/PasswordToggle";

const Register = () => {
  const [changeYear, setChangeYear] = useState({ year: 0, month: 0 });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema.Register),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, icon] = PasswordToggle();

  const { userInfo, isError, isSuccess, isLoading, authError, message } =
    useSelector((state) => state.auth);

  // Server error-handler
  const error = errorHandler(authError);

  useEffect(() => {
    if (userInfo) navigate("/");

    if (isError) {
      toast.error(error);
    }

    if (isSuccess) {
      toast.success(message?.msg);
      navigate("/verification");
    }

    dispatch(authReset());
  }, [dispatch, userInfo, isSuccess, message, error, isError, navigate]);

  const onSubmitHandler = (data) => {
    setChangeYear({ year: data.year, month: data.month });
    dispatch(userRegister(data)).then(() => (isError && !message) ?? reset());
  };

  return (
    <FormContainer>
      <Col xs={6} lg={5} className="d-none d-sm-block">
        <Image src={sideImage} fluid className="d-none d-lg-block mt-5" />
      </Col>
      <Col xs={6} lg={7} md={12} sm={12}>
        <div className="mt-5 auth-card w-lg d-sm">
          <h2 className="text-center py-2">Sign Up</h2>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName ">
                  <Form.Label className="resize">FirstName</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="addon-icon" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      {...register("firstName", { required: true })}
                      name="firstName"
                      className={`auth-input ${
                        errors.firstName && "is-invalid"
                      }`}
                      placeholder="Enter firstName"
                    ></Form.Control>
                  </InputGroup>
                  <p className="small required-msg  text-danger pt-1">
                    {errors.firstName?.message}
                  </p>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label className="resize">LastName</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="addon-icon" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      {...register("lastName", { required: true })}
                      name="lastName"
                      className={`auth-input ${
                        errors.lastName && "is-invalid"
                      }`}
                      placeholder="Enter lastName"
                    ></Form.Control>
                  </InputGroup>

                  <p className="small required-msg  text-danger ">
                    {errors.lastName?.message}
                  </p>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="email">
              <Form.Label className="resize">Email Address</Form.Label>
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
              <p className="small required-msg  text-danger">
                {errors.email?.message || error}
              </p>
            </Form.Group>

            <Row>
              <Form.Label className="resize">Birth of date</Form.Label>
              <Col md={4}>
                <Form.Select
                  {...register("year")}
                  onChange={(e) =>
                    setValue("year", e.target.value, { shouldValidate: true })
                  }
                  className={`${errors.year && "is-invalid"}`}
                >
                  <option value="" seleted="true">
                    Year
                  </option>
                  <SelectOptions year={true} />
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select
                  {...register("month")}
                  onChange={(e) =>
                    setValue("month", e.target.value, { shouldValidate: true })
                  }
                  className={`${errors.month && "is-invalid"}`}
                >
                  <option value="" seleted="true">
                    Month
                  </option>
                  <SelectOptions month={true} />
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select
                  {...register("day")}
                  onChange={(e) =>
                    setValue("day", e.target.value, { shouldValidate: true })
                  }
                  className={`${errors.day && "is-invalid"}`}
                >
                  <option value="" seleted="true">
                    Day
                  </option>
                  <SelectOptions days={true} changeYear={changeYear} />
                </Form.Select>
              </Col>
            </Row>

            <Row className="pt-3">
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label className="resize">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={type}
                      {...register("password", { required: true })}
                      name="password"
                      className={`auth-input ${
                        errors.password && "is-invalid"
                      }`}
                      placeholder="Enter password"
                    ></Form.Control>
                    <InputGroup.Text className="addon-icon">
                      {icon}
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="small required-msg  text-danger">
                    {errors.password?.message}
                  </p>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="confirm-password">
                  <Form.Label className="resize">confirm-password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="addon-icon">
                      <i className="fa-solid fa-lock"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={type}
                      {...register("confirmPassword", { required: true })}
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
              </Col>
            </Row>

            <Row>
              <Col>
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
                  {isLoading ? " Loading" : " Register"}
                </Button>
              </Col>
              <Col>
                <p className="small p-0 m-0 required-msg  text-danger">
                  {errors.month?.message}
                </p>
                <p className="small resize focus pt-3 text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </FormContainer>
  );
};

export default Register;
