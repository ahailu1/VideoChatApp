import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import SectionOne from './homepage/homepage';
import Initvideo from './videochatpage/videochat';
import Cookies from 'js-cookie';


const RouterApp = (props) => {

    const [isLogged, authenticate] = useState(false);
    const [userData, setUserData] = useState({username: "", token: "", authenticated: false, user_id: ''});

    useEffect(() => {
        let userdata = Cookies.get('userdata');
        console.log(userdata);
        
        if(userdata === 'undefined' || userdata === undefined){
                authenticate(false);
            } else {
                console.log(typeof userdata);

               let userdataz = JSON.parse(userdata);
               console.log(userdataz);
                console.log(typeof userdataz);
                let {username, token, authenticated, user_id} = userdataz;
                console.log([username, token, authenticated, user_id]);
                setUserData({username, token, authenticated, user_id});
                authenticate(true);
            }
        }, []);

    let handleAuthentication = (thisUsername, thisToken, isAuthenticated, uId) => {
        if(isAuthenticated === true){
            Cookies.set('userdata', JSON.stringify({username: thisUsername, token: thisToken, authenticated:isAuthenticated, user_id: uId }));
            let reply = Cookies.get('userdata');
            let item = JSON.parse(reply)

            let {username, token,authenticated, user_id} = item;
            console.log([username, token, authenticated, user_id]);
            console.log('finally idiot')
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
            console.log([username, token, authenticated]);
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