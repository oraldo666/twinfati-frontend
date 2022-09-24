import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessageFriends } from "../../services/reducers/actions/messagesActions/messageFriendsAction";
import { getUserMessages } from "../../services/reducers/actions/messagesActions/getUserMessages";
import { getFriendMessages } from "../../services/reducers/actions/messagesActions/getFriendMessages";
import "../../styles/MessagesStyle/messagefriends.styles.css";
import { setFriendName } from "../../services/reducers/actions/messagesActions/getUserMessages";

function MessageFriends() {
  const dispatch = useDispatch();

  // Getting User Friends
  const userMessageFriends = useSelector(
    (state) => state.userMessageFriends.friends
  );
  const errMessage = useSelector(
    (state) => state.userMessageFriends.errMessage
  );
  const friendsArray = Array.isArray(userMessageFriends);
  useEffect(() => {
    dispatch(getUserMessageFriends()); // Getting user Friends
  }, [dispatch]);

  const capitalizeFirst = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  };

  const handleUserFriendMessages = (
    friendId,
    friendFirstName,
    friendLastName
  ) => {
    console.log(friendId);
    const friendFullName =
      capitalizeFirst(friendFirstName) + " " + capitalizeFirst(friendLastName);
    console.log(friendFullName);
    dispatch(getUserMessages(friendId)); //Getting User Messages
    dispatch(setFriendName(friendFullName));
    // dispatch(getFriendMessages(friendId)); //Getting Friend Messages
  };

  if (friendsArray) {
    return (
      <div className="message-friends-component-container">
        {userMessageFriends?.map((friend) => (
          <div
            key={friend.id}
            className="friend-message-container"
            onClick={() =>
              handleUserFriendMessages(
                friend.friend.id,
                friend.friend.first_name,
                friend.friend.last_name
              )
            }
          >
            <div className="friend-message-image-container">
              <img
                src={friend.friend.profile_photo}
                alt=""
                className="friend-message-image"
              />
            </div>
            <div className="friend-message-name-container">
              {capitalizeFirst(friend.friend.first_name)}{" "}
              {capitalizeFirst(friend.friend.last_name)}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>{errMessage && <h1>{errMessage}</h1>}</div>;
  }
}

export default MessageFriends;
