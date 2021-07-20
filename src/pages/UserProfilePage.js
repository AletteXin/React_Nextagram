import React from "react"
import { useParams } from "react-router-dom";
import { useState } from 'react';
import Usernameprofilepage from '../containers/Usernameprofilepage';
import Userimages from '../containers/Userimages';

const UserProfilePage = () => {


    const { id } = useParams();

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"))

    return (
        <div className="userprofilepage">
            <div className="userprofilepageimagesblock">
                <Usernameprofilepage userid={id} />
                <div className="userimagesprofilepage" >
                    <Userimages userid={id} /> 
                </div>
            </div>
        </div>
    )

}

export default UserProfilePage;




