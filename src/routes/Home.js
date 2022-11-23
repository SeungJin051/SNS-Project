import { dbService } from "fbase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Mind from "components/Mind";
import MindFactory from "components/MindFactory";

const Home = ({ userObj }) => {
  console.log(userObj);
  // for form
  const [minds, setMinds] = useState([]);
  useEffect(() => {
    // 실시간 구현
    const q = query(
      collection(dbService, "minds"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const mindArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMinds(mindArray);
    });
  }, []);
  return (
    <div>
      <MindFactory userObj={userObj} />
      <div>
        {minds.map((mind) => (
          <Mind
            key={mind.id}
            mindObj={mind}
            isOwner={mind.creatorID === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
