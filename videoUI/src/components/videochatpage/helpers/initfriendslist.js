import React, {useState, useEffect} from 'react';
import axios from 'axios';

let fetchFriendsList = ({user_id, dispatch,setLoading, ...props}) => {

    let myFriendsList = async (user_id, dispatch, setLoading) => {
      console.log(user_id  + 'is working buddy');
      setLoading(false);
      try {
        let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendinfo/${user_id}`);
        let following  = [];
          let followers  = [];
          if(data.length > 0) {
            data.forEach(el => {
              if(el.followers !== null){
                followers.push(el.followers);
              }
              if(el.following !== null){
                following.push(el.following)
              }
            });
          }
          console.log(data);
          console.log([followers, following]);
          let allUsers = data;
          dispatch({type: 'initFriendsList', followers:followers, following:following});
          setLoading(true);
          return allUsers;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    }

    return (
      myFriendsList(user_id, dispatch, setLoading)
    )
  }

    export default fetchFriendsList;