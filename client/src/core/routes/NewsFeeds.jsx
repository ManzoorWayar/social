import React from "react";
import { Routes, Route } from "react-router-dom";
import NewsFeed from "../../pages/Home/NewsFeed";
import PrivateRoute from "../../components/PrivateRoute";

const NewsFeeds = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <NewsFeed />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default NewsFeeds;
