import React, {useState, useEffect} from 'react';
import {Col, Button} from 'react-bootstrap';
import styles from './bio.module.scss'
import axios from 'axios';
const Bio = (props) => {
    let[setValue, setBio] = useState('');
    let[characterLeft, setCharactersLeft] = useState(200);
    let[toggleBio, setToggle] = useState(false);
    let[userBio, storeBio] = useState('');
    let [disabled, setButton] = useState(true)

    useEffect(() => {
        getBio();
    }, []);

    let getBio = async () => {
        let {user_id} = props.userdata;
        let bio = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/dashboard/getbio/${user_id}`);
        let thisBio = bio.data[0].bio;
        console.log(thisBio);
        console.log(typeof thisBio)
         if(thisBio === null || thisBio === "null"){
            console.log(thisBio + 'phaggot')
        }
          else {
            setBio(thisBio);
            storeBio(thisBio);
            setButton(true);
         } 
    }


    let submitBio = (e) => {
        e.preventDefault();
        setToggle(false)
        let {user_id} = props.userdata;
    let config = {
        url: `${process.env.REACT_APP_SITE_URL}/api/dashboard/setbio/${user_id}`,
        method: 'PUT',
        data : {
            bio: setValue 
        }
    }
    console.log(setValue)
    try {
        let res = axios(config);
        console.log(res);
        let userBio = setValue;
        console.log('hello world')
        storeBio(setValue);
        setBio(setValue);
        setToggle(false)
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}
    let setVal = (e) => {
        let data = e.target.value;
        let left = 200 - data.length;
        setToggle(true);
        if(left <= 0){
            let newVal = 'maximum characters reached'
            setCharactersLeft(newVal);
        } else {
            let message = `${left} characters left`
            setCharactersLeft(message);
        }
        setButton(false);
        setBio(data);
    }

    let cancelBio = () => {
        setButton(true);
        setBio(userBio);
    }


 let renderTextBox = () => {
    
    
    return (
    <Col lg = {12} className = {styles.container__bio}>
     
     <Col>
     <form onSubmit = {submitBio}>
        <textarea value = {setValue} className = {`${styles.bio} ${toggleBio && styles.toggled}`} name = 'bio' onBlur = {() => setToggle(false)} spellCheck = 'false' placeholder = 'write something about yourself' onChange = {setVal} maxLength = {200} onKeyDown = {setVal}>

     </textarea> 
     <span className = {styles.characters}>{toggleBio && characterLeft} </span>
        <span className = {styles.characters}></span>

     <Button className = {styles.bio__button} size = 'sm' variant = 'dark' type = 'submit' disabled = {disabled}>Update</Button>
     <Button className={styles.bio__button} size = 'sm' variant = 'dark' onClick = {cancelBio}>Cancel</Button>        
     </form>
     
     </Col>

     
     </Col>
    ) 
}   

return (
renderTextBox()
)
}

export default Bio