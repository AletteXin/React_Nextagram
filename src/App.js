import { Route, Switch } from "react-router-dom";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Homepage from './pages/Homepage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Navbar';
import UploadPage from './pages/UploadPage'


function App() {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"))
  const [currentUser, Updatecurrentuser] = useState({})

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    Updatecurrentuser({});
    setLoggedIn(false);
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  return (

    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} Updatecurrentuser={Updatecurrentuser} logOut={logOut} />

      {loggedIn ?
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/users/:id" component={UserProfilePage} />
          <Route path="/upload" component={UploadPage} />
        </Switch>
        :
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/users/:id" component={UserProfilePage} />
          <Route path="/upload" component={Homepage} />
        </Switch>
      }

      <ToastContainer />
    </div >
  )
}

export default App;



