import * as React from "react";
import { useSelector } from "react-redux";

type SuccessProps = {
  title: string;
  message: string;
};

const Success: React.FC<SuccessProps> = ({
  title,
  message
}) => {
  const state = useSelector(state => state);
  console.log(state);
  
  return (
    <>
      <div className="success-modal">
          
          <h2>{title}</h2>
{/* 
          <img 
            className="success-img"
            src={} 
            alt={title}
          /> */}

          <p>
            {message}
          </p>

      </div>
      </>
  );
};
export default Success;
