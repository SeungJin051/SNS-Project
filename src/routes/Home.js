import { dbService } from "fbase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import Mind from "components/Mind";
import MindFactory from "components/MindFactory";

const Home = ({ userObj }) => {
  console.log(userObj);
  // for form
  const [minds, setMinds] = useState([]);
  useEffect(() => {
    // 실시간 구현
    onSnapshot(collection(dbService, "minds"), (snapshot) => {
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
