import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function ModalForm({ show, closemodal, changebetweensignupandlogin, Updatecurrentuser, setLoggedIn, currentUser }) {


    const [username, UpdateUsername] = useState("")
    const [password, UpdatePassword] = useState("")

    const history = useHistory()

    const login = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/login`,
            data: { username: username, password: password }
        })
            .then((resp) => {
                localStorage.setItem("token", resp.data.auth_token)
                console.log(localStorage)
                fetchUserdata();
                setLoggedIn(true);
                closemodal(e);
                history.push("/");
                toast.success("Logged in successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchUserdata()
        }
    }, [])

    const fetchUserdata = () => {

        axios({
            method: "GET",
            url: `https://insta.nextacademy.com/api/v1/users/me`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }

        })
            .then((resp) => {
                Updatecurrentuser(resp.data);
            })

            .catch(error => {
                console.log(error);
            })

    }



    if (!show) {
        return null
    }


    return (

        <div className="modalcontainer" onClick={() => { closemodal() }}>
            <div className="modalbox" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4> LOGIN </h4><button className="closebutton" onClick={() => { closemodal() }}> X </button>
                </div>
                <div className="modalcontent"> <h6> Welcome back!</h6> </div>
                <div className="formtosubmit">
                    <form onSubmit={login} >
                        <h8> Username </h8>
                        <input className="entertext" onChange={(e) => { UpdateUsername(e.target.value) }} value={username} type="text" placeholder="Claire Dunphy" />
                        <div className="spaceinform"></div>
                        <h8> Password </h8>
                        <input className="entertext" onChange={(e) => { UpdatePassword(e.target.value) }} value={password} type="password" placeholder="********" />
                        <div className="spaceinform"></div>
                        <div>
                            <input className="submitbutton" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
                <button className="modalswitch" onClick={() => changebetweensignupandlogin()} > Don't have an account? Sign up now! </button>
            </div>
        </div>
    )
}


export default ModalForm;