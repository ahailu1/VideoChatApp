import React, {useState} from 'react';
import {Form, Row, Col, InputGroup, FormControl, Button,Container, Tab, Nav} from 'react-bootstrap';
import styles from './sidebar.module.scss';

const Dashboard = () => {
    let [isActive, activateKey] = useState('');

    let setActiveTab = (e) => {
        console.log(e)
        activateKey(e);
    }

    let Tablayout = () => {
        
}
    return (
        <>
        </>
    )
}

export default Dashboard;