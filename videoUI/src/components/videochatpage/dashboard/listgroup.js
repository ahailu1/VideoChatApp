import {ListGroup} from 'react-bootstrap';
import styles from './listgroup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react';

const ListBar = ({key,tabKey,setActiveKey,...props}) => {
    
    let [tabSelect, setActive] = useState('two');
    useEffect(() => {
      console.log(tabKey + 'is defined');
      setActive(tabKey);
    }, []);


    let tabLink = (classname, href = null, name, iconname) => {
        return(
        <ListGroup.Item action href = {href} className = {`${styles.container__listitem} ${tabKey === href && styles.item}`} onClick = {() => {setActiveKey(href)}}>
        <FontAwesomeIcon icon = {iconname} className = {`${styles.icon} ${tabKey === href && styles.toggled}`}/>
        {props.arrow ? <span className = {`${styles.icon__name} ${tabKey === href && styles.toggled}`} >{name}  </span> : ''}
        </ListGroup.Item>
        )
      }


return (
    <>
    <ListGroup className = {`${styles.container__list} ${!props.arrow && styles.toggled}`}>
    {tabLink('one', '#link1', 'Home', 'home')}
      {tabLink('two', '#link2', 'Friends', 'user')}
      {tabLink('four', '#search', 'Search', 'search-plus')}
      </ListGroup>
      </>
)
}


export default ListBar;