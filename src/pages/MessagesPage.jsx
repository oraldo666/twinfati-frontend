import React from "react";
import "../styles/MessagesStyle/messagespage.styles.css";

import MessageFriends from "../components/MessagesPageComponents/MessageFriends";
import UserFriendMessages from "../components/MessagesPageComponents/UserFriendMessages";

function MessagesPage() {
  return (
    <div className="messages-page-container">
      <div className="messages-page-friends-container">
        <MessageFriends />
      </div>
      <div className="messages-page-user-messages">
        <UserFriendMessages />
      </div>
    </div>
  );
}

export default MessagesPage;
