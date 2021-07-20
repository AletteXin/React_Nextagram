import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import ModalForm from './ModalForm';
import SignUpForm from './SignUpForm'



function Navbar({ loggedIn, currentUser, Updatecurrentuser, logOut, setLoggedIn }) {

    const [show, setShow] = useState(false)

    const [isLogin, setisLogin] = useState(true)

    const closemodal = () => {
        setShow(false)
    }

    const changebetweensignupandlogin = () => {
        if (isLogin === true) {
            setisLogin(false)
        } else {
            setisLogin(true)
        }
    }

    const history = useHistory()

    const myprofile = (e) => {
        e.preventDefault();
        history.push(`/users/${currentUser.id}`);
        window.location.reload(false);
    }


    return (
        <div className="navigator">
            <div className="navbarleft">
                <>
                    <Link to="/"> <h3> NEXTAGRAM </h3> </Link>
                </>
            </div>

            <div className="navbarright">

                {loggedIn ? <>
                    <Link to="/upload"> <button className="uploadbutton"> + Upload </button> </Link>
                    <img className="thumbnailpic" src={currentUser.profile_picture} />
                    <button className="thumbnailuser" onClick={(e) => { myprofile(e) }} > {currentUser.username} </button>
                    <button className="loginsignup" onClick={(e) => { logOut(e) }}> Logout </button>
                </> :
                    <button className="loginsignup" onClick={() => setShow(true)} > Login / Signup </button>
                }

                {isLogin ? <ModalForm show={show} currentUser={currentUser} setLoggedIn={setLoggedIn} 
                changebetweensignupandlogin={changebetweensignupandlogin} closemodal={closemodal} Updatecurrentuser={Updatecurrentuser} />
                    : <SignUpForm show={show} changebetweensignupandlogin={changebetweensignupandlogin} closemodal={closemodal} />}

            </div>
        </div>

    )
}



export default Navbar;