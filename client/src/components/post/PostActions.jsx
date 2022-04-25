import React from "react";

const PostActions = () => {
  return (
    <section>
      <div className="pt-3 pb-2">
        <div className="d-flex flex-row justify-content-center">
          <div className="">
            <i className="fa-solid fa-heart text-danger"></i>
            <span className="small count px-1">923</span>
          </div>
          <div className="px-4">
            <i className="fa-solid fa-share-from-square text-info"></i>
            <span className="small count px-1">12</span>
          </div>
          <div className="">
            <i className="fa-solid fa-comment-dots text-info"></i>
            <span className="small count px-1">543</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostActions;
