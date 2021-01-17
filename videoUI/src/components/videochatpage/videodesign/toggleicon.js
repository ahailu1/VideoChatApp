import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './icon.module.scss';


let SetIcon = (props) => {



let Videoicon = () => {
    // change state of props
    return (
    <div className = {`${styles.container__iconfont} ${!props.icon && styles.toggled}`} onClick = {props.callBack}>
          <FontAwesomeIcon icon = {`${props.iconName}`}/>
          </div>  
    )
}
return (
    <Videoicon/>
)


}

export default SetIcon;