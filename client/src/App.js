import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/small/Loader";

const Header = lazy(() => import("./components/layout/Header"));
const Footer = lazy(() => import("./components/layout/Footer"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Verification = lazy(() => import("./pages/Auth/Verification"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const NotFound = lazy(() => import("./pages/Auth/NotFound"));
const NewsFeed = lazy(() => import("./pages/Home/NewsFeed"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router>
          <Header />
          <main className="py-3">
            <Container>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                  path="verification/:verifyToken"
                  element={<Verification />}
                />
                <Route path="verification" element={<Verification />} />
                <Route path="forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="resetpassword/:resetToken"
                  element={<ResetPassword />}
                />
                <Route path="404" element={<NotFound />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <NewsFeed />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
