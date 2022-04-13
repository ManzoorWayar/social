import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Verification from "./pages/Auth/Verification";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFound from "./pages/Auth/NotFound";
import NewsFeed from "./pages/Home/NewsFeed";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  return (
    <>
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
      <ToastContainer />
    </>
  );
}

export default App;
