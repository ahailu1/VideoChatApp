import React, {useState, useEffect} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {Row,Nav, Col, Container,ListGroup, Tab} from 'react-bootstrap';
import VideoUi from './videodesign/myvideo';
import Dashboard from './dashboard/sidebar';
import Profilepicture from './dashboard/profilepicture';
import styles from './videochat.module.scss';
const Initvideo = (props) => {

useEffect(() => {
    console.log(props);
    let {username, token, authenticated} = props.userdata;
    console.log(username);

});


return( <div className = {styles.container__document}>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
 <Row className = {styles.container__row}>
    <Col lg = {3}>

    <Profilepicture userdata = {props.userdata}/>    

    <Col lg = {12} className = {styles.container__columnaz}>
    <ListGroup className = {styles.container__list}>
        <ListGroup.Item action href="#link1">
          Link 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2">
          Link 2
        </ListGroup.Item>
      </ListGroup>
    </Col>

    </Col>

    <Col>
    <Tab.Content>
        <Tab.Pane eventKey="#link1">
            <VideoUi userdata = {props.userdata}/>
        <h2>idiot</h2>
        </Tab.Pane>
        <Tab.Pane eventKey="#link2">
        <h2>hello world</h2>
        </Tab.Pane>
      </Tab.Content>
    </Col>
    </Row>
    </Tab.Container>
</div>
)

}
export default Initvideo;