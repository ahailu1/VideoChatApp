import {ListGroup} from 'react-bootstrap';
import styles from './listgroup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';

const ListBar = (props) => {
    
    let [tabSelect, setActive] = useState('one');

    let tabLink = (classname, href = null, name, iconname) => {
        return(
        
        <ListGroup.Item action href = {href} className = {`${styles.container__listitem} ${tabSelect === classname && styles.one} ${props.arrow && styles.toggleagain}`} onClick = {() => {setActive(classname)}}>
                
                <FontAwesomeIcon icon = {iconname} className = {`${styles.icon} ${tabSelect === classname && styles.toggled}`}/>
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