import React, {useState, useEffect, useReducer} from 'react';
import {Spinner, Tab} from 'react-bootstrap';
import Sidebar from './sidebar/tabcontainer';
import fetchFriendsList from './helpers/initfriendslist';
const Initvideo = ({userdata,handleLogout,tabKey = '#link2', ...props}) => {

let [loaded, setLoading] = useState(null);
useEffect(() => {
  try {
    let {user_id} = userdata;
    fetchFriendsList({user_id, dispatch, setLoading});
  } catch (err) {

  }
}, []);
let modifyState = (myFriendsList, action) => {
  switch(action.type){
    case 'follow' :
      return {
        following: myFriendsList.following.concat(action.data),
        followers: myFriendsList.followers
      }
    case 'initFriendsList' : 
    return {
      followers: action.followers,
      following: action.following
    }
    case 'unfollow' : 
    let newList = myFriendsList.following.filter(el => {
      return el !== action.data
    })
    return {
      following: newList,
      followers: myFriendsList.followers
    }
  }
}
let friendsList = {
  following: [],
  followers: []
}
let [myFriendsList, dispatch] = useReducer(modifyState, friendsList);

  if(loaded){
return(
<Sidebar userdata = {userdata} followers = {myFriendsList.followers} following = {myFriendsList.following} dispatch = {dispatch} handleLogout = {handleLogout}/>
)
} else {
  return (
    <Spinner animation = 'border' />
  )
}
}
export default Initvideo;