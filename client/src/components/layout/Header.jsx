import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const isAuth = userInfo && userInfo.token && userInfo.verifiedAt;

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <Navbar collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <>
              <Image
                src="logo.png"
                className="rounded-circle mx-2"
                width={25}
                height={25}
              />
              <Navbar.Brand className="fw-bold">Social Name</Navbar.Brand>
            </>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuth && <SearchBox />}
            <Nav className="ms-auto">
              {isAuth ? (
                <>
                  <Image
                    src={`uploads/${userInfo.image}`}
                    className="rounded-circle mx-2 border"
                    width={40}
                    height={40}
                  />

                  <button className="btn" onClick={onLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <LinkContainer to="login" className="fw-bold">
                    <Nav.Link>
                      <i className="fas fa-user text-info"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="register" className="fw-bold">
                    <Nav.Link>
                      <i className="fas fa-user text-info px-1"></i>
                      Register
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
