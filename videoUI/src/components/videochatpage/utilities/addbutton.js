import React,{useState, useEffect} from 'react';
import {ListGroup, Spinner,Dropdown, DropdownButton,Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './renderbutton.module.scss';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

const RenderButton = ({type, user_id, userdata,callback = null, callbackData= null}) => {    
    //let [followingBack, setFollowStatus] = useState(false);
    let [loaded, setLoading] = useState(null);
    let [activeSpinner, toggleSpinner] = useState(false);
    let [followStatus, setFollowStatus] = useState('');

    useEffect(() => {
        //setLoading(loading);
    }, [])


    let addFriend = async (friend_id, callback, callbackData, action) => {

        toggleSpinner(true);

        let {user_id} = userdata;
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
        try {
          toggleSpinner(true);
          let info = await axios(config);
            setLoading(setLoadingStatus);
            if(callback !== null){
              callback({type: callbackData, data: friend_id});
              toggleSpinner(false);
              if(action === 'deletefriend'){
                setFollowStatus('follow');
              } else {
                setFollowStatus('following');
              }
            } else {
              toggleSpinner(false);
              return true
            }
        } catch (err) {
            toggleSpinner(false);
            setLoading(false)
        }
    }

    let followButton = (type) => {
      
    let buttom = <Button size = 'sm' className = {styles.button} onClick = {() => {addFriend(user_id, callback, callbackData, 'addfriend') }}>
    {activeSpinner ? <Spinner animation = 'border' size = 'sm'/> :   <FontAwesomeIcon icon = 'plus' className = {styles.icon}/>}
    {type}
    </Button>

     let item =  <Dropdown>
              <Dropdown.Toggle variant="success" className  = {styles.container__toggle}>
                {activeSpinner ? <Spinner animation = 'border'/>
                :                  <FontAwesomeIcon icon = 'check' className = {styles.icon}></FontAwesomeIcon>

                }
                <span className = {styles.container__toggle__text}> Following</span>
                
              </Dropdown.Toggle>

              <Dropdown.Menu className = {styles.container__buttongroup}>
            <Dropdown.Item className = {styles.container__dropdown__item} href="#/action-1" onClick = {() => { addFriend(user_id,callback, callbackData, 'deletefriend')}}>
            <FontAwesomeIcon icon = 'times-circle' className = {styles.icon}/>
              Unfollow
            </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

              if(type == 'follow' || type == 'follow back'){
                return (
                  buttom
                )
              } else {
                return (
                  item
                )
              }
            }

if(followStatus === 'follow'){
  return (
    followButton('follow')
    )
} else if (followStatus === 'following'){
  return (
    followButton('following')
    )
} else {
  return (
    followButton(type)
    )
}

    
  }

  export default RenderButton