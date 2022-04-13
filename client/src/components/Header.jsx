import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout, authReset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/login");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Social</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="mr-auto">
              {userInfo && userInfo.token && userInfo.verifiedAt ? (
                <>
                  <span className="text-info"> {userInfo?.firstName}</span>

                  <button className="btn" onClick={onLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <LinkContainer to="login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="register">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
