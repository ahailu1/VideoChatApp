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
                authenticate(false);
            } else {
                let info = JSON.parse(userdata);
                let {username, token, authenticated} = info;
                        authenticate(true);
                setUserData({username, token, authenticated});
            }
        }, []);

    let handleAuthentication = (username, token, isAuthenticated) => {
        if(isAuthenticated === true){
            Cookies.set('userdata', {username: username, token: token, authenticated: true});
            authenticate(true);          
  
        } else {
            authenticate(false);
        }      

    }


    return (
        <Router>
        <Switch>
        <Route exact path = "/" render = { (props) => {
            let {username, token, authenticated} = userData;
            return (
          !isLogged ? (<SectionOne handleAuthentication = {handleAuthentication}/>) : 
                    <Redirect to = {`/dashboard/${username}`} />
          )
        } }>
            </Route>
            <Route path = "/dashboard/:username" render = {(props) => {
                return ( <Initvideo userdata = {userData}/>
                    )
            }}/>
        </Switch>
        </Router>
    )

}

export default RouterApp;