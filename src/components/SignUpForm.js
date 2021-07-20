import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormFeedback, Input, Form, FormGroup, FormFeedbackProps } from 'reactstrap';

function SignUpForm({ show, closemodal, changebetweensignupandlogin }) {

    const [textusername, setTextUsername] = useState('')
    const [textemail, setTextEmail] = useState('')
    const [textpw, setTextPw] = useState('')
    const [textconfirmpw, setTextConfirmpw] = useState('')
    const history = useHistory()

    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(true);

    const checkUsername = newUsername => {
        console.log("Making API call to check username!");
        axios
            .get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            )
            .then(response => {
                console.log(response.data);
                if (response.data.valid) {
                    setUsernameValid(true);
                } else {
                    setUsernameValid(false);
                }
            });
    };

    const handleUsernameInput = e => {
        clearTimeout(delay);
        const newUsername = e.target.value;
        setTextUsername(newUsername);

        const newDelay = setTimeout(() => {
            checkUsername(newUsername);
        }, 500);

        setDelay(newDelay);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if ((textpw.trim().length && textemail.trim().length && textusername.trim().length) > 0) {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(textemail)) {

                if (textpw === textconfirmpw) {
                    createnewuser();
                    setTextUsername('');
                    setTextEmail('');
                    setTextPw('');
                    setTextConfirmpw('')
                    closemodal(e);
                    history.push("/");
                    toast.success("Signed up successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
                else {
                    alert("Passwords do not match")
                }
            }

            else {
                alert("Please enter a valid email address")
            }
        }
        else {
            alert("Please complete all input fields.")
        }
    }

    const createnewuser = () => {

        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: { username: textusername, email: textemail, password: textpw }
        })
            .then((resp) => {
                console.log(resp);
            })
            .catch(error => {
                console.error(error.response)
            })

    }


    const getInputprop = () => {
        if (!textusername.length) {
            return null;
        }

        else if (textusername.length <= 6) {
            return { invalid: true };
        }

        else if (textusername.length > 20) {
            return { invalid: true };
        }

        else if (usernameValid == true) {
            return { valid: true };
        }

        else {
            return { invalid: true };
        }

    }

    const getFormFeedback = () => {
        if (!textusername.length) {
            return null;
        }

        else if (textusername.length <= 6) {
            return <FormFeedback invalid> Must be at least 6 characters! </FormFeedback>
        }

        else if (textusername.length > 20) {
            return <FormFeedback invalid> Must be below 21 characters! </FormFeedback>
        }
        else if (usernameValid == true) {
            return <FormFeedback valid> This username is available! </FormFeedback>

        }

        else {
            return <FormFeedback invalid> Sorry this username is taken! </FormFeedback>
        }
    }


    const getInputpasswordprop = () => {
        if (textconfirmpw.trim().length > 0) {
            if (textpw === textconfirmpw) {
                return { valid: true };
            } else {
                return { invalid: true }
            }
        }
    }


    const getFormFeedbackpassword = () => {

        if (textpw === textconfirmpw) {
            return <FormFeedback valid> Passwords match! </FormFeedback>
        } else {
            return <FormFeedback invalid> Passwords do not match. </FormFeedback>
        }
    }


    const getInputemailprop = () => {
        if (textemail.trim().length > 0) {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(textemail)) {
                return { valid: true };
            } else {
                return { invalid: true };
            }
        }
    }

    const getFormFeedbackemail = () => {

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(textemail)) {

            return <FormFeedback valid> </FormFeedback>
        } else {
            return <FormFeedback invalid> Please enter a valid email address. </FormFeedback>
        }
    }

    if (!show) {
        return null
    }

    return (

        <div className="modalcontainer" onClick={() => { closemodal() }}>
            <div className="modalbox" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4>CREATE A NEW ACCOUNT</h4><button className="closebutton" onClick={() => { closemodal() }}> X </button>
                </div>
                <div> <h6> Enter your details to set up a new account </h6> </div>

                <div className="formtosubmit">

                    <Form onSubmit={handleSubmit} >

                        <FormGroup>
                            <h8> Username </h8>
                            <Input className="entertext" onChange={(e) => { handleUsernameInput(e) }} value={textusername} type="text" placeholder="Choose a username between 6-20 characters" {...getInputprop()} />
                            {getFormFeedback()}
                            <div className="spaceinform"></div>
                        </FormGroup>
                        <FormGroup>
                            <h8> Email </h8>
                            <Input className="entertext" onChange={(e) => { setTextEmail(e.target.value) }} value={textemail} type="text" placeholder="claire@modernfamily.com" {...getInputemailprop()} />
                            {getFormFeedbackemail()}
                            <div className="spaceinform"></div>
                        </FormGroup>
                        <FormGroup>
                            <h8> Password </h8>
                            <Input className="entertext" onChange={(e) => { setTextPw(e.target.value) }} value={textpw} type="password" placeholder="********" />
                            <div className="spaceinform"></div>
                        </FormGroup>
                        <FormGroup>
                            <h8> Confirm Password </h8>
                            <Input className="entertext" onChange={(e) => { setTextConfirmpw(e.target.value) }} value={textconfirmpw} type="password" placeholder="********" {...getInputpasswordprop()} />
                            {getFormFeedbackpassword()}
                            <div className="spaceinform"></div>
                        </FormGroup>

                        <div>
                            <input className="submitbutton" type="submit" value="Create an account" />
                        </div>
                    </Form>
                </div>
                <button className="modalswitch" onClick={() => changebetweensignupandlogin()} > Already have an account? Click here to login! </button>
            </div>
        </div>
    )
}


export default SignUpForm;