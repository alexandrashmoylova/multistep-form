import * as React from "react";

type ErrorProps = {
  title: string;
  message: string;
};

const Error: React.FC<ErrorProps> = ({ title, message }) => {
  return (
    <>
      <div className="error-modal modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
      </div>
    </>
  );
};
export default Error;
