import React, {useState, useEffect} from 'react';
import {Col, Button} from 'react-bootstrap';
import styles from './bio.module.scss'
import axios from 'axios';
const Bio = (props) => {
    let[setValue, setBio] = useState('');
    let[characterLeft, setCharactersLeft] = useState(200);
    let[toggleBio, setToggle] = useState(false);

    let getBio = async () => {
        let {user_id} = props.userdata;
        let bio = await axios.get(`http://localhost:5000/api/dashboard/getbio/${user_id}`);
        let thisBio = bio.data;
    }


    let submitBio = async (e) => {
        e.preventDefault();
        setToggle(false)
        let {user_id} = props.userdata;
    let config = {
        url: `http://localhost:5000/api/dashboard/setbio/${user_id}`,
        method: 'PUT',
        data : {
            bio: setValue 
        }
    }
    console.log('about to set bio');
    try {
        let res = await axios(config);
        console.log(res);
        setToggle(false)
    } catch (err) {
        throw new Error(err);
    }


        let data = e.target.bio.value;
        if(e.key === 'enter'){
            data = data + '</bdffdsr>'
        }
        console.log(data);
    }
    let setVal = (e) => {
        let data = e.target.value;
        let left = 200 - data.length;
        setToggle(true);
        if(e.key === 'enter'){
            data = data + '</br>';
            console.log(data);
        }
        
        if(left <= 0){
            let newVal = 'maximum characters reached'
            setCharactersLeft(newVal);
        } else {
            let message = `${left} characters left`
            setCharactersLeft(message);
        }
        console.log(setValue)
        setBio(data);
    }


 let renderTextBox = () => {
    
    
    return (
    <Col lg = {12} className = {styles.container__bio}>
     
     <Col>
     <form onSubmit = {submitBio}>
        <textarea className = {`${styles.bio} ${toggleBio && styles.toggled}`} name = 'bio' onBlur = {() => setToggle(false)} spellCheck = 'false' placeholder = 'write something about yourself' onChange = {setVal} maxLength = {200} onKeyDown = {setVal}>

     </textarea> 
     </form>
     <span className = {styles.characters}>{characterLeft} </span>
        <span className = {styles.characters}></span>

     <Button className = {styles.bio__button} size = 'sm' variant = 'dark' type = 'submit' disabled = {true}>Update</Button>
     <Button className={styles.bio__button} size = 'sm' variant = 'dark' type = 'submit'>Cancel</Button>        
     
     </Col>

     
     </Col>
    ) 
}   

return (
renderTextBox()
)
}

export default Bio