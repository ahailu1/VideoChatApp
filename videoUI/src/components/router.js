import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import SectionOne from './homepage/homepage';
import Initvideo from './videochatpage/videochat';
import Cookies from 'js-cookie';


const RouterApp = (props) => {

    const [isLogged, authenticate] = useState(false);
    const [userData, setUserData] = useState({username: "", token: "", authenticated: false, user_id: ''});

    useEffect(() => {
        console.log(process.env.REACT_APP_SITE_URL);
        let userdata = Cookies.get('userdata');
        console.log(userdata);
        if(userdata === 'undefined' || userdata === undefined){
            console.log(userdata);
                authenticate(false);
            } else {
                let info = JSON.parse(userdata);
                let {username, token, authenticated, user_id} = info;
                setUserData({username, token, authenticated, user_id});
                authenticate(true);
            }
        }, []);

    let handleAuthentication = (username, token, isAuthenticated, user_id) => {
        if(isAuthenticated === true){
            Cookies.set('userdata', {username: username, token: token, authenticated: true, user_id: user_id});
            console.log(username + 'whaat');
            setUserData({username, token, isAuthenticated, user_id});
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
            <Route exact path = "/dashboard/:username" render = {(props) => {
               return  (isLogged ?
                ( <Initvideo userdata = {userData} handleLogout = {handleLogout} tabKey = '#link3'/>
                    ) : (<Redirect to = {`/`} />)
               )
            }}/>
            
            
        </Switch>
        </Router>
    )

}

export default RouterApp