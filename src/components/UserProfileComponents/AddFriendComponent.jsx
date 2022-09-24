import React, { useEffect, useState } from "react";
import { getUserMessageFriends } from "../../services/reducers/actions/messagesActions/messageFriendsAction";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/UsersSearch/isfriend.styles.css";

import IsFriend from "./IsFriend";
import AddFriend from "./AddFriend";

function AddFriendComponent({ userId }) {
  const [isFriend, setIsFriend] = useState(false);
  const [freindshipId, setFreindshipId] = useState(null);
  const dispatch = useDispatch();
  const userFriends = useSelector((state) => state.userMessageFriends.friends);
  useEffect(() => {
    dispatch(getUserMessageFriends());
    console.log(userId);
    setIsFriend(false);
  }, [userId]);
  useEffect(() => {
    console.log(userFriends);
    userFriends?.forEach((friend) => {
      if (friend.friend.id === userId) {
        console.log("This user is a friend");
        setIsFriend(true);
        console.log(friend.id, "blablalbva");
        setFreindshipId(friend.id);
        return;
      }
    });
  }, [userId, userFriends]);

  return (
    <div>
      {isFriend ? (
        <div style={{ color: "red" }}>
          <IsFriend
            userId={userId}
            freindshipId={freindshipId}
            setIsFriend={setIsFriend}
          />
        </div>
      ) : (
        <div style={{ color: "red" }}>
          <AddFriend userId={userId} />
        </div>
      )}
    </div>
  );
}

export default AddFriendComponent;
