import React from "react";

const Toast = ({ message }) => {
  return (
    <div
      style={{
        bottom: "150px",
        right: "30px",
      }}
      className="custom-toaster position-absolute m-2 p-3"
    >
      <h4>{message}</h4>
    </div>
  );
};

export default Toast;
