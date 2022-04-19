import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form className="search-bar" onSubmit={submitHandler}>
      <Form.Control
        type="search"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search People, Articals ..."
        className="mr-sm-2 ml-sm-5"
        autoComplete="off"
      ></Form.Control>
      <InputGroup.Text className="nav-search-icon text-info">
        <Button type="submit" className="p-0 m-0 nav-search-icon text-info">
          <i className="fa fa-search"></i>
        </Button>
      </InputGroup.Text>
    </Form>
  );
};

export default SearchBox;
