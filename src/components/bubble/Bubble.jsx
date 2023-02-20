import React from "react";

const Bubble = ({ owner, comment_body }) => {
  return (
    <div className=" my-2 text-align-left rounded-4 p-3 w-100 fs-6 d-inline-block bg-light">
      <span className="">From: {owner && owner.toUpperCase()}</span>
      <br />
      <div className="bg-white p-2 rounded-3">{comment_body}</div>
    </div>
  );
};

export default Bubble;
