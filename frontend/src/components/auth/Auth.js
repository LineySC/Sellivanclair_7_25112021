
import Login from "./login/Login";
import Register from "./register/Register"
import "boxicons";

import React, { useState } from 'react';


function Auth() {
    const [isHidden, setIsHidden] = useState(false);
    const handleCallBack = (childData) => {
        setIsHidden(childData)
    }

    return isHidden ? (
        <Register hidden={handleCallBack} />
    ) : (
        <Login hidden={handleCallBack}/>
    )
}

export default Auth