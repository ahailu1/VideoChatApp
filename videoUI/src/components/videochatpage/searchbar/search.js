import {React, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './searchbar.module.scss';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import axios from 'axios';
const Searchbar = (props) => {

let [allUsers, setAllUsers] = useState([]);
let [inputValue, setInputValue] = useState(false);
let [filteredUsers, setFilteredUsers] = useState([]);
useEffect(() => {
    getAll();
},[]);


let UserProfile = (friend_id,friendname, callback) => {
    return (
        <Col className = {styles.container__userprofile} lg = {4}>
               <div className = {styles.container__image}>
            <img src = {`/images/${friendname}--profilepicture.jpg`} alt = "" className = {styles.images}/>
            
            <p className = {styles.container__text}>{props.friendname}</p>
            </div>
            <div className = {styles.container__username}>
                <Button size = 'sm' bsPrefix = {styles.button} onClick = {() => {callback(friend_id)}}>Add</Button>
            </div>
        </Col>
    )
}

let addFriend = async (friend_id) => {
    let {user_id} = props.userdata;
    console.log([user_id, 'this is m fucking idiot'])
    let config ={
        method: 'post',
        url: 'http://localhost:5000/api/addfriend',
        data: {
            user_id: user_id,
            friend_id: friend_id,
        }
    }
    try {
        let info = await axios(config);
    } catch (err) {
        // set error

    }


}




let setSearchBar = () => {
   return (
       <> 
    <div className = {styles.container__searchbar__wrapper}>
        <div className = {styles.container__searchbar__input}>
        <input type = 'text' className = {styles.search__input} placeholder = 'Search...' onChange = {getInputValue} onFocus = { () =>  {setInputValue(true) } } onBlur = { () =>  {setInputValue(false) }}/>
        </div>
        <div className = {styles.container__searchbar__icon}>
        <FontAwesomeIcon icon = 'search-plus' className = {styles.search__icon}  onClick = {getAll}/>
        </div>
    </div>
        <div className = {`${styles.container__friendslist} ${inputValue && styles.toggled}`}>
            <ul className = {`${styles.container__list} ${inputValue && styles.toggled}`}>
            {filteredUsers.length > 0 && filteredUsers.map(el => {
                return <li className = {styles.container__list__item}>{el.username}</li>
            })}

            </ul>
        </div>
        </>
   )
}

let setFocus = () => {
    setInputValue(!inputValue);
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
            console.log(el);
            if(el.username.includes(value)){
                return el.username
            }
        })
        setFilteredUsers(users)
    }
}
let getAll = async () => {
    let {user_id} = props.userdata;
    console.log([user_id, 'is a fucking bitch']);
    try {
    let users = await axios.get('http://localhost:5000/api/fetch/allusers');
    let requests = await axios.get(`http://localhost:5000/api/getrequests/${user_id}`);
    console.log(requests.data);
     let totalUsers = users.data.users;
     setAllUsers(totalUsers);   
     setFilteredUsers(totalUsers);   

} catch (err) {

    }
}



    return (
<>
<Container className = {styles.container__searchbar} fluid>
    <Row className = {styles.container__row__search}>
        {setSearchBar()}
    </Row>
  <Row className = {styles.container__row__profile} noGutters = {true}>
        {filteredUsers.map(el => {
            return <UserProfile friendname = {el.username} friend_id = {el.user_id}/>;
        })}
  </Row>
</Container>
</>
    )
}

export default Searchbar;