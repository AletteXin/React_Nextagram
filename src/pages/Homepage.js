import { useState, useEffect } from 'react';
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator';
import Userimages from '../containers/Userimages';
import { Link } from "react-router-dom";


function Homepage() {

    const [isLoading, setIsLoading] = useState(true)
    const [userdata, updateUserdata] = useState([])

    useEffect(() => {

        axios({
            method: 'GET',
            url: 'https://insta.nextacademy.com/api/v1/users/',
        })
            .then((resp) => {
                setIsLoading(false);
                const copyuserdata = resp.data;
                updateUserdata(copyuserdata);
            }
            )
            .catch(error => {
                console.log(error);
            })
    }, [])

    if (isLoading) {
        return <div className="homepage"> <LoadingIndicator width="120px" height="120px" color="grey" /> </div>
    }

    return (
        <div className="homepage">
            {
                userdata.map((data) => {

                    return (
                        <div className="homepagerows">
                            <div className="homepageuserdetails">
                                <h7>{data.username}</h7>
                                <img className="profilepic" src={data.profileImage} />
                                <Link to={`/users/${data.id}`}> <button className="showmorebutton"> Show more </button></Link>
                            </div>

                            <div className="homepageuserimagesbox">
                                <Userimages userid={data.id} />
                            </div>
                        </div>
                    )
                })}
        </div>
    )

}

export default Homepage;




