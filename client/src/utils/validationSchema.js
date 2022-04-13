import * as yup from "yup";

const Register = yup.object().shape({
  firstName: yup.string().required("FirstName is required!"),
  lastName: yup.string().required("LastName is required!"),
  email: yup
    .string()
    .trim()
    .required("Email is required!")
    .email("Email is not valid")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ),
  year: yup.string().required(""),
  month: yup.string().required(""),
  day: yup.string().required(""),
  password: yup
    .string()
    .min(8, "password must be at least 8 chars")
    .max(32)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Login = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const RePassword = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 8 characters")
    .max(12, "Password can't be more than 25 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match!"),
});

const ForgotPassword = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required!"),
});

const Schema = {
  Register,
  Login,
  RePassword,
  ForgotPassword,
};

export default Schema;
