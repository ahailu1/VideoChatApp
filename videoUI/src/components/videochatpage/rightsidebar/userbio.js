import {React, useState} from 'react';
import styles from './userbio.module.scss';
import {Col, Image} from 'react-bootstrap';
let UserBio = ({username, bio, date, ...props}) => {
return (
    <>
<Col className = {styles.container__image}>
<Image src = {`${process.env.REACT_APP_SITE_URL}/src/components/images/profile/${username}--profilepicture.jpg`} thumbnail className = {styles.bio__image}/>
</Col>
<Col className = {styles.container__username}>
<div className = {styles.bio__header}>Username</div>
<div className = {styles.bio__text}>{username}</div>
</Col>
<Col xl = {12}>
<p className = {styles.bio__header}>Bio</p>
<p className = {styles.bio__text}>{bio}</p>
<p className = {styles.bio__header}>Creation Date</p>
<p className = {styles.bio__text}>{date}</p>
</Col>
</>
)

}

export default UserBio;
