import React, {useState, useEffect} from 'react';
import {Row,Nav, Col, Container,ListGroup, Collapse, Tab} from 'react-bootstrap';
import VideoUi from './videodesign/myvideo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Profilepicture from './dashboard/profilepicture';
import styles from './videochat.module.scss';
import Logout from './dashboard/logout';
import ListBar from './dashboard/listgroup';
const Initvideo = (props) => {

useEffect(() => {
    console.log(props);
    let {username, token, authenticated} = props.userdata;
    console.log(username);
});
  let [arrow, setArrow] = useState(true);

let toggleSidebar = () => {
  setArrow(!arrow);
}



return( <div className = {styles.container__document}>
    <Tab.Container defaultActiveKey="#link1">
 <Row className = {styles.container__row}>
    
    <Col lg = {arrow ? 2 : 1} className = {styles.container__first}>
    
    <Col sm = {2} xs = {4} lg = {12} className = {styles.container__image}>
    <Profilepicture userdata = {props.userdata}/>   
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


    
    <Logout lg = {12} handleLogout = {props.handleLogout}/>


    </Col>
    <Col className = {styles.container__column__tabcontent}>
    <Tab.Content className = {styles.container__tabcontent}>
        <Tab.Pane eventKey="#link1" className = {styles.container__tabpane}>
            <VideoUi userdata = {props.userdata}/>
        </Tab.Pane>
        <Tab.Pane eventKey="#link2">
        </Tab.Pane>
        <Tab.Pane eventKey="#link3">
        </Tab.Pane>
        <Tab.Pane eventKey="#link">
        </Tab.Pane>
        <Tab.Pane eventKey="#link2">
        </Tab.Pane>
      </Tab.Content>
    </Col>
    </Row>
    </Tab.Container>
</div>
)

}
export default Initvideo;