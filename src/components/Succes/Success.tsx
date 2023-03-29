import * as React from "react";
import { useSelector } from "react-redux";

type SuccessProps = {
  title: string;
  message: string;
};

const Success: React.FC<SuccessProps> = ({ title, message }) => {
  const state = useSelector((state) => state);
  // console.log(state);

  return (
    <>
      <div className="success-modal modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
      </div>
    </>
  );
};
export default Success;
