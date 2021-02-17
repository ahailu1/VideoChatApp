import React, {useState, useEffect} from 'react';
import {Row,Nav, Col, Container,ListGroup, Collapse, Tab} from 'react-bootstrap';
import VideoUi from './videodesign/myvideo';
import Bio from '../videochatpage/dashboard/bio';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Profilepicture from './dashboard/profilepicture';
import Userbar from './rightsidebar/userbar';
import Searchbar from './searchbar/search';
import styles from './videochat.module.scss';
import Logout from './dashboard/logout';
import ListBar from './dashboard/listgroup';
import RequestNotification from './notifications/Requestnotification';
const Initvideo = (props) => {

useEffect(() => {
    console.log(props);
    let {username, token, authenticated, user_id} = props.userdata;
    console.log(user_id);
});
  let [arrow, setArrow] = useState(true);

let toggleSidebar = () => {
  setArrow(!arrow);
}





return(
   <div className = {styles.container__document}>
    <Tab.Container defaultActiveKey="#link3">
 <Row className = {styles.container__row}>
    
    <Col lg = {arrow ? 2 : 1} className = {styles.container__first}>
    
    
    <Col sm = {2} xs = {4} lg = {12} className = {styles.container__image}>
              {arrow ? 
              <>
              <Profilepicture userdata = {props.userdata}/>  
              <Bio userdata = {props.userdata} />  
              </>
    :  null
      }
    </Col> 

    <Col lg = {12} className = {`${styles.container__icon} ${!arrow && styles.toggled}`} onClick = {toggleSidebar}>
      <div className = {`${styles.icon__div} ${!arrow && styles.toggled}`}>

      {arrow ?   <FontAwesomeIcon icon = 'arrow-left' className = {`${styles.icon} `}/>
:   <FontAwesomeIcon icon = 'arrow-right' className = {`${styles.icon} ${!arrow && styles.toggled}`}/>
}
    </div>

    </Col>

    <Col lg = {12} className = {styles.container__columnaz}>
    <ListBar arrow = {arrow}/>
    </Col>
    <Logout lg = {12} handleLogout = {props.handleLogout} arrow = {arrow}/>


    </Col>
    <Col className = {styles.container__column__tabcontent} lg = {10}>
    <Tab.Content className = {styles.container__tabcontent}>
        
        <Tab.Pane eventKey="#link1" className = {styles.container__tabpane}>
         <Row>
          <Col lg = {9} className = {styles.container__column__ui}>
          <VideoUi userdata = {props.userdata}/>
          </Col>
        <Col lg = {3} className = {styles.container__column__userbar}>
  <Userbar/>
        </Col>
        </Row>
        </Tab.Pane>
        
        <Tab.Pane eventKey="#link2">
        
        </Tab.Pane>

        <Tab.Pane eventKey="#link3" className = {styles.container__tabpane__notifications}>
          <RequestNotification userdata = {props.userdata} />
        
        </Tab.Pane>

        <Tab.Pane eventKey="#link">
        </Tab.Pane>

        <Tab.Pane eventKey="#search" className = {styles.container__tabpane__search}>
          <Col className = {styles.container__tabpane__column__search} lg = {12}>
          <Searchbar userdata = {props.userdata} />
          </Col>
        </Tab.Pane>
        </Tab.Content>
    </Col>
    </Row>
    </Tab.Container>
</div>
)

}
export default Initvideo;