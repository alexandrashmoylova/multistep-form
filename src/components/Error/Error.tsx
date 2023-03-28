import * as React from "react";

type ErrorProps = {
  title: string;
  message: string;
};

const Error: React.FC<ErrorProps> = ({
  title,
  message
}) => {
  return (
    <>
      <div className="error-modal">
          
          <h2>{title}</h2>
{/* 
          <img 
            className="Error-img"
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
export default Error;
