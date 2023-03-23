import React from "react";
// import { ContextInfo } from "../context/Context";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const navigateToOwnerPage = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <h1>Account</h1>
      <div>Welcome User </div>
      <div></div>
      {"" !== null ? (
        <button onClick={navigateToOwnerPage}>
          Redirect to Main Rest_owner App
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Account;
