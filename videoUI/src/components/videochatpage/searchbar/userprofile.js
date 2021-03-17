import React,{useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './userprofile.module.scss';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const Profile = (props) => {
    
    let [myFollowers, setFollowers] = useState(0);
    let [myFollowing, setFollowing] = useState(0);
    
    useEffect(() => {
        let tryme = async () => {
                let {followers, following} = await getFollowers();
                setFollowers(followers);
                setFollowing(following)
        }
        tryme();
    }, [])
    
    let getFollowers = async() => {
        let res = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendcount/${props.user_id}`);
        let data = res.data;
        if(data.length === 0){
          let following = 0;
          let followers = 0;
          return {
            followers,
            following
          }
        } else {
          let {followers, following} = data[0];
          return {
            followers,
            following
          }
        }
      };
      let ReturnProfile = React.memo(({username, bio, friendname,date, user_id, addFriend}) => {

        return (
            <Col className = {styles.container__userprofile} lg = {3}>
                   <Col className = {styles.container__image} lg = {12}>
                   <img src = {`/test123--profilepicture.jpg`} alt = "" className = {styles.images}/> 
                   <div className = {styles.container__username}>
                   <span className = {`${styles.profile__text} ${styles.username}`}>
                   {username}
                   </span>
                   </div>
                </Col>
                    <Col lg = {12}>
                        <div className = {styles.container__followers}>
                        <span className = {`${styles.profile__header} ${styles.followers}`}>Followers </span><span className = {`${styles.profile__text} ${styles.followers}`}>{myFollowers} </span>
                    <span className = {`${styles.profile__header} ${styles.followers}`}>Following </span><span className = {`${styles.profile__text} ${styles.followers}`}> {myFollowing} </span>
    
                        </div>
                    </Col>
                <Col lg = {12} className = {styles.container__text}>
                    <span className = {styles.profile__text}>{friendname}</span>
                </Col>
                
                    { bio !== null
                    
                    && <>
                                    <Col lg = {12} className = {styles.container__bio}>  
                    <span className = {styles.profile__header}> Bio:</span> <span  className = {styles.profile__bio}> {bio}</span> 
                </Col>
                </> }
                <Col lg = {12} className = {styles.container__date}>
                    <span className = {styles.profile__header}>Created</span>
                    <span className = {styles.profile__text}>{date}</span>
                </Col>
                
                <Col className = {styles.container__button} lg = {12}>
                   {props.render()}
                </Col>
            </Col>
        )}
      )
    return (
        <>
    <ReturnProfile {...props}/>
</>
    )
}

export default Profile