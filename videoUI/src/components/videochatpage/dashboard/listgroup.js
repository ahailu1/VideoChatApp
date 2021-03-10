import {ListGroup} from 'react-bootstrap';
import styles from './listgroup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react';

const ListBar = ({key,setActiveKey,...props}) => {
    
    let [tabSelect, setActive] = useState('two');
    useEffect(() => {
      setActive(key);
    })


    let tabLink = (classname, href = null, name, iconname) => {
        return(
        <ListGroup.Item action href = {href} className = {`${styles.container__listitem} ${key === name && styles.one} ${props.arrow && styles.toggleagain}`} onClick = {() => {setActiveKey(href)}}>
        <FontAwesomeIcon icon = {iconname} className = {`${styles.icon} ${key === name && styles.toggled}`}/>
        {props.arrow ? name : ''}
        </ListGroup.Item>
        )
      }


return (
    <>
    <ListGroup className = {`${styles.container__list} ${!props.arrow && styles.toggled}`}>
    {tabLink('one', '#link1', 'Home', 'home')}
      {tabLink('two', '#link2', 'Friends', 'user')}
      {tabLink('three', '#link3', 'Notifications', 'bell')}
      {tabLink('four', '#search', 'Search', 'search-plus')}
      {tabLink('five', '#link5', 'alex')}

      </ListGroup>
      </>
)
}


export default ListBar;