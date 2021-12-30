import {React, useState} from 'react';
import styles from './userbar.module.scss';
import {Tabs,TabContainer, Nav, ListGroup, Tab} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import UserBio from './userbio';
import Listbar from '../dashboard/listgroup';
const Userbar = ({username,bio,date,user_id, ...props}) => {

  let [currentKey, setCurrentKey] = useState('#chat')

    let renderItem = (keyname, iconname) => {
        
      return (
            <ListGroup.Item className = {`${styles.container__listitem} ${keyname === currentKey && styles.toggled}`} onClick = {() => {setCurrentKey(keyname)}}>
            <FontAwesomeIcon icon = {iconname} className = {`${styles.icon} ${keyname === currentKey && styles.toggled}`} />
        </ListGroup.Item>
        )
    }
    return (
            <>
            <TabContainer activeKey = {currentKey} className = {styles.container__alltabs}>
            <ListGroup className = {styles.container__listgroup}>
        {renderItem('#bio','user-plus')}
          </ListGroup>

              <Tab.Content>
<Tab.Pane eventKey = '#chat'> 
<h1>hello world</h1>
</Tab.Pane>

<Tab.Pane eventKey = '#bio'> 
<UserBio username = {username} bio = {bio} date = {date} user_id = {user_id}/>
</Tab.Pane>
          </Tab.Content>
          </TabContainer>
          </>
    )

}

export default Userbar;