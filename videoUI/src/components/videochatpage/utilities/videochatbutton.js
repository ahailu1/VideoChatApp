import React,{useState, useEffect} from 'react';
import {ListGroup,Col, Spinner,Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './videobutton.module.scss';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';


let VideoButton  = ({setActiveKey, ...props}) => {

let returnVidPage = () => {

}


    return (
        <>
        <Col xl = {12} className = {styles.container__column}>
            <div className = {styles.container__icon}>
            <FontAwesomeIcon icon = 'video' className = {styles.icon__video} onClick = {() => {setActiveKey('#link1')}}/>

            </div>
        </Col>
        </>
    )
}

export default VideoButton;