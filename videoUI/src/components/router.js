import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import SectionOne from './homepage/homepage';
import Initvideo from './videochatpage/videochat';
import Cookies from 'js-cookie';


const RouterApp = (props) => {

    const [isLogged, authenticate] = useState(false);
    const [userData, setUserData] = useState({username: "", token: "", authenticated: false});

    useEffect(() => {
        let userdata = Cookies.get('userdata');
        if(userdata === 'undefined' || userdata === undefined){
            console.log(userdata);
                authenticate(false);
            } else {
                let info = JSON.parse(userdata);
                let {username, token, authenticated} = info;
                setUserData({username, token, authenticated});
                authenticate(true);
            }
        }, []);

    let handleAuthentication = (username, token, isAuthenticated) => {
        if(isAuthenticated === true){
            Cookies.set('userdata', {username: username, token: token, authenticated: true});
            console.log(username + 'whaat');
            setUserData({username, token, isAuthenticated});
            authenticate(true);          
  
        } else {
            authenticate(false);
        }      

    }

    let handleLogout = () => {
        Cookies.remove('userdata');
        setUserData({});
        authenticate(false);
    }


    return (
        <Router>
        <Switch>
        <Route exact path = "/" render = { (props) => {
            let {username, token, authenticated} = userData;
            return (
          isLogged ? (<Redirect to = {`/dashboard/${username}`} />) : 
                    <SectionOne handleAuthentication = {handleAuthentication}/>
          )
        } }>
            </Route>
            <Route path = "/dashboard/:username" render = {(props) => {
               return  (isLogged ?
                ( <Initvideo userdata = {userData} handleLogout = {handleLogout}/>
                    ) : (<Redirect to = {`/`} />)
               )
            }}/>
        </Switch>
        </Router>
    )

}

export default RouterApp;