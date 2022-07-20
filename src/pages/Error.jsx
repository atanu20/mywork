import React from 'react';
import { useHistory } from 'react-router-dom';

const Error = () => {
  const his = useHistory();
  return (
    <>
      <div className="error">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12 mx-auto">
              <h1>404 Error !! Page Not Found</h1>
              <button
                className="btn btn-warning mt-3"
                onClick={() => his.goBack()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
