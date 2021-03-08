import {React, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './searchbar.module.scss';
import {Container, Row, Col,ListGroup, Image, Button} from 'react-bootstrap';
import axios from 'axios';
import Profile from './userprofile';
import RenderButton from '../utilities/addbutton';
const Searchbar = ({myFollowers,myFollowing,userdata, dispatch}) => {

let [allUsers, setAllUsers] = useState([]);
let [inputValue, setInputValue] = useState(false);
let [filteredUsers, setFilteredUsers] = useState([]);

useEffect(async () => {
    await getAll(userdata);
},[myFollowers, myFollowing]);

let setSearchBar = () => {
   return (
       <> 
    <div className = {styles.container__searchbar__wrapper} lg = {12}>
        <div className = {styles.container__searchbar__input}>
        <input type = 'text' className = {styles.search__input} placeholder = 'Search...' onChange = {getInputValue} onFocus = { () =>  {setInputValue(true) } } onBlur = { () =>  {setInputValue(false) }}/>
        </div>
        <div className = {styles.container__searchbar__icon}>
        <FontAwesomeIcon icon = 'search-plus' className = {styles.search__icon}  onClick = {getAll}/>
        </div>
    </div>
        <div className = {`${styles.container__friendslist} ${inputValue && styles.toggled}`} lg = {6}>
            <ul className = {`${styles.container__list} ${inputValue && styles.toggled}`}>
            {filteredUsers.length > 0 && filteredUsers.map(el => {
                return <li className = {styles.container__list__item}>{el.username}</li>
            })}

            </ul>
        </div>
        </>
   )
}
let getInputValue = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if(value === '') {
        setInputValue(false);
        setFilteredUsers(allUsers);
    } else {
        setInputValue(true);
        let users = allUsers.filter(el => {
            if(el.username.includes(value)){
                return el.username
            }
        })
        setFilteredUsers(users)
    }
}
let getAll = async (userdata) => {
    let {user_id} = userdata;
    try {
    let users = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/fetch/allusers/${user_id}`);
    //let requests = await axios.get(`http://localhost:5000/api/getrequests/${user_id}`);
     let totalUsers = users.data.users;
     setAllUsers(totalUsers);   
     setFilteredUsers(totalUsers);   
} catch (err) {
    throw new Error(err);
    }
}
    return (
<>
    <Row className = {styles.container__row__search} noGutters = {true}>
        {setSearchBar()}
    </Row>
  <Row className = {styles.container__row__profile} noGutters = {true}>
        {filteredUsers.map(el => {
            let date = new Date(el.creation_date).toLocaleDateString();
            if(el.user_id === userdata.user_id){
            } else if (myFollowing.includes(el.user_id) && myFollowers.includes(el.user_id)){
                return <Profile user_id = {el.user_id} bio = {el.bio} date = {date} username = {el.username} render = {(props) => {
                    return <RenderButton user_id = {el.user_id} username = {el.username} loading = {true} userdata = {userdata} callback = {dispatch} callbackData = 'unfollow'  /> }}/>   
            } else if(myFollowers.includes(el.user_id) && !myFollowing.includes(el.user_id)){
                return <Profile user_id = {el.user_id} bio = {el.bio} date = {date} username = {el.username} render = {(props) => {
                    return <RenderButton user_id = {el.user_id} username = {el.username} text = 'Follow Back' callback = {dispatch} callbackData = {'follow'} loading = {null} userdata = {userdata}  /> }}/>   
            } else if( myFollowing.includes(el.user_id) && !myFollowers.includes(el.user_id)) {
                return <Profile user_id = {el.user_id} bio = {el.bio} date = {date} username = {el.username} render = {(props) => {
                    return <RenderButton user_id = {el.user_id} username = {el.username} loading = {true} userdata = {userdata} callback = {dispatch} callbackData = {'unfollow'}   /> }}/>   
            } else {
                return <Profile user_id = {el.user_id} bio = {el.bio} date = {date} username = {el.username} render = {(props) => {
                    return <RenderButton user_id = {el.user_id} username = {el.username} loading = {null} userdata = {userdata} callback = {dispatch} callbackData = {'follow'} /> }} />
                }
                })}
  </Row>
</>
    )
}

export default Searchbar;