import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const withSignupRequired = (WrappedComponent) => {
const WithSignupRequired = (props) => {
const [isLoggedIn, setLoggedIn] = useState(false);
const navigate = useNavigate();

const handleSignupRequired = async (isSignupSuccesful) => {
    // Check if the user is logged in
    if (!isLoggedIn && !isSignupSuccesful) {
    // Redirect the user to the login page or perform any other action
        navigate("/login");
    } else {
        setLoggedIn(true);
        navigate("/temp");
    } 
};



return <WrappedComponent {...props} onSignupRequired={handleSignupRequired} />;
};

return WithSignupRequired;
};

export default withSignupRequired;
