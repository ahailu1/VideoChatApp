import {React, useState} from 'react';
import styles from './userbar.module.scss';
import {Tabs, Nav, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Listbar from '../dashboard/listgroup';
const Userbar = () => {


    let renderItem = (iconname) => {
        return (
            <ListGroup.Item className = {styles.container__listitem}>
            <FontAwesomeIcon icon = {iconname} />
    
        </ListGroup.Item>
        )
    } 


    return (
            <>
          <ListGroup className = {styles.container__listgroup}>
        {renderItem('comment-dots')}
        {renderItem('user-plus')}
          </ListGroup>

                        </>
    )

}

export default Userbar;