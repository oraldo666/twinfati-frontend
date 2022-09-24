import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/MessagesStyle/messagestyle.styles.css";
import { getUserMessages } from "../../services/reducers/actions/messagesActions/getUserMessages";

function UserFriendMessages() {
  const dispatch = useDispatch();

  const [allMessages, setAllMessages] = useState(null);
  const userMessages = useSelector((state) => state.getUserMessages.messages);
  const friendName = useSelector((state) => state.getUserMessages.friendName);
  // const friendMessages = useSelector(
  //   (state) => state.getFriendMessages.messages
  // );

  // useEffect(() => {
  //   const allMessages = userMessages
  //     .concat(friendMessages)
  //     .sort((a, b) => a.id - b.id);
  //   setAllMessages(allMessages);
  // }, [userMessages, friendMessages]);

  // const isMessagesArray = Array.isArray(allMessages);
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getUserMessages(2));
  //   }, [1000]); //Getting User Messages
  // });

  useEffect(() => {
    if (allMessages !== userMessages) {
      setAllMessages(userMessages);
    }
  }, [userMessages, allMessages]);

  const isMessagesArray = Array.isArray(userMessages);
  if (isMessagesArray && userMessages.length > 0) {
    return (
      <div className="all-messages-container">
        <div className="friend-full-name-container">
          <h1 className="friend-full-name">{friendName && friendName}</h1>
        </div>
        <div className="only-messages-container">
          <div className="only-messages">
            {allMessages?.map((message) => {
              const userId = parseInt(localStorage.getItem("userId"));
              if (message.sender === userId) {
                return (
                  <div className="all-messages-user-messages" key={message.id}>
                    {" "}
                    <p className="messages-user-messages">
                      {message.message}
                    </p>{" "}
                  </div>
                );
              } else {
                return (
                  <div
                    className="all-messages-friend-messages"
                    key={message.id}
                  >
                    <p className="messages-friend-messages">
                      {message.message}
                    </p>{" "}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="friend-full-name-container">
          <h1 className="friend-full-name ">{friendName && friendName}</h1>
        </div>
        <div className="no-messages-container">
          <h1>No messages to display</h1>
        </div>
      </div>
    );
  }
}

export default UserFriendMessages;
