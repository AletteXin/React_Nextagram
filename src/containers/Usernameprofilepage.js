import React from "react"
import { useState, useEffect } from 'react';
import axios from 'axios'
import Image from 'react-graceful-image';


import LoadingIndicator from '../components/LoadingIndicator';


const Usernameprofilepage = ({ userid }) => {


    const [usernamedata, updateusernamedata] = useState([])
    const [isLoadingusername, setIsLoadingusername] = useState(true)

    useEffect(() => {

        axios({
            method: 'GET',
            url: `https://insta.nextacademy.com/api/v1/users/${userid}`,
        })
            .then((resp) => {

                setIsLoadingusername(false);
                const copyusernamedata = resp.data;
                console.log(resp.data)
                updateusernamedata(copyusernamedata);
            })

            .catch(error => {
                console.log(error);
            })
    }, [])

    if (isLoadingusername) {
        return <LoadingIndicator width="100px" height="100px" color="gray" />
    }


    return (
        <div  >
            <h1 className="usernameindividual" >{usernamedata.username}</h1>
            <div className="lineunderusernameindividual"> </div>
            <div> <Image className="profilepicindividual" src={usernamedata.profileImage} /> </div>
        </div>
    )
}

export default Usernameprofilepage;

