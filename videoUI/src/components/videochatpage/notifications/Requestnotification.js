import {React, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './requestnotification.module.scss';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import axios from 'axios';


const RequestNotification =  (props) => {

    useEffect (() => {
        fetchRequests();

    }, []);
    let [getFriendRequests, setFriendRequests] = useState([]);




let fetchRequests = async () => {
   
    let {user_id} = props.userdata;
    console.log([user_id, 'is tring to test moron']);
    let friendRequests = await axios.get(`http://localhost:5000/api/getrequests/${user_id}`);
    let friends = friendRequests.data;
    console.log(friends);
    setFriendRequests(friends);
}


let DisplayNotification = (username, date) => {
let newDate = new Date(date);
let thisDate = newDate.toLocaleDateString();
return (
<Col className = {styles.mycolumn} lg = {10} xl = {8}>
<Col className = {styles.container__image} lg = {3}>
<img src = '/test123--profilepicture.jpg' className = {styles.notification__image} alt = 'profile'/>
</Col>
<Col lg = {4}>
<span className = {styles.request__header}>{username} </span> 
<span className = {styles.request__text}>has added you as a friend!</span>
<br/>

<span className = {styles.request__date}>{thisDate}</span>

</Col>

<Col lg = {4}>
<Button>
    Ignore
    </Button>
    <Button>
        Accept
        </Button>

</Col>
</Col>  
)  
}    

return (
    <Container fluid className = {styles.container}>
    <Col className = {styles.notification__header} lg = {12}>
    <p className = {styles.page__header}>Notifications</p>

        <FontAwesomeIcon icon = 'cog' className = {styles.icon} />
    </Col>
    {getFriendRequests.length > 0 && getFriendRequests.map(el => {
        return DisplayNotification(el.username, el.creation_date)

    })}
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className = {styles.svg}>
  <path fill="#272727" d="M44.5,-55C59.1,-50.7,73.3,-39.5,75.4,-26.1C77.5,-12.7,67.4,3,58.4,15.3C49.3,27.6,41.2,36.6,31.6,48C22.1,59.5,11,73.5,-2,76.2C-14.9,78.9,-29.9,70.3,-45,60.6C-60.1,50.9,-75.4,40.2,-81.1,25.6C-86.9,11.1,-83,-7.3,-73.7,-20.1C-64.3,-32.9,-49.4,-40.2,-36.1,-44.9C-22.9,-49.7,-11.5,-52.1,1.7,-54.5C15,-56.9,29.9,-59.3,44.5,-55Z" transform="translate(100 100)" />
</svg>
    </Container>
)

}

export default RequestNotification;