import React,{useState, useEffect} from 'react';
import {ListGroup, Spinner,Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './renderbutton.module.scss';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

const RenderButton = ({loading = null, user_id, userdata, text = null, callback = null, callbackData= null}) => {    
    //let [followingBack, setFollowStatus] = useState(false);
    let [loaded, setLoading] = useState(null);
    let [activeSpinner, toggleSpinner] = useState(false);

    useEffect(() => {
        setLoading(loading);
    }, [])


    let addFriend = async (friend_id, callback, callbackData, action) => {

        toggleSpinner(true);

        let {user_id} = userdata;
        console.log([user_id, 'this is m fucking idiot'])
        let restMethod = action === 'deletefriend' ? 'DELETE'  : 'POST'
        let config = {
            method: `${restMethod}`,
            url: `${process.env.REACT_APP_SITE_URL}/api/${action}`,
            data: {
                user_id: user_id,
                friend_id: friend_id,
            }
        }
        let setLoadingStatus = action === 'deletefriend' ? null : true;
        console.log(setLoadingStatus);
        try {
          console.log('about to try sdasaddasads');
          console.log([callbackData, callback]);
            let info = await axios(config);
            toggleSpinner(false);
            setLoading(setLoadingStatus);
            if(callback !== null){
              callback({type: callbackData, data: friend_id})

            } else {
              return true
            }
        } catch (err) {
            toggleSpinner(false);
            setLoading(false)
        }
    }

   let followButton = (loaded, user_id,text = null, callback, callbackData) => { 
    let component;
      if(loaded){
        component = 
          <Dropdown className = {styles.dropdown}>
            <Dropdown.Toggle className = {styles.dropdown__toggle}>
             
          {activeSpinner ? 
            <>
            <Spinner animation = "border"/> 
                </>
            : 
            <>
            <FontAwesomeIcon icon = 'check' className = {styles.icon}></FontAwesomeIcon>
            {'following'}
            </>
            }
            </Dropdown.Toggle>

            <Dropdown.Menu className = {styles.dropdown__menu} >

        <Dropdown.Item className = {styles.dropdown__item} onClick = {() => { addFriend(user_id,callback, callbackData, 'deletefriend')}}>
          <FontAwesomeIcon icon = 'times-circle' className = {styles.icon}/>
          Unfollow
          </Dropdown.Item>

            </Dropdown.Menu>
            
          </Dropdown>

                } 
        
        else if (loaded === null){
         component =  
          <ListGroup.Item action onClick = {() => {addFriend(user_id, callback, callbackData, 'addfriend')}} className = {styles.listgroup__item}>
            {text == null ? "follow" : text }
            {activeSpinner ? 
            <>
            <Spinner animation = "border"/> 
                </>
            :<FontAwesomeIcon icon = 'plus' className = {styles.icon}></FontAwesomeIcon>
            }
         </ListGroup.Item>
        } else {
          component = <ListGroup.Item action onClick = {() => {addFriend(user_id, callback, callbackData, 'addfriend')}} className = {styles.listgroup__item}>
            try again
            {activeSpinner ? 
            <>
            <Spinner animation = "border"/><p>...</p> </> :        
            <FontAwesomeIcon icon = 'redo' className = {styles.icon}></FontAwesomeIcon>
            }
         </ListGroup.Item>
        }
    return (
    <>
    <ListGroup horizontal className = {styles.container__listgroup}>
      {component}

    </ListGroup>
    </>
    )
   }

    return (
        followButton(loaded, user_id, text, callback, callbackData)
    )
  }

  export default RenderButton