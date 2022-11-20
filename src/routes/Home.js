import { dbService } from "fbase";
import { useState, useEffect } from "react";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { async } from "@firebase/util";

const Home = () => {
  const [mind, setMind] = useState("");
  const [minds, setMinds] = useState([]);

  const getMinds = async () => {
    const dbMinds = await getDocs(collection(dbService, "minds"));
    dbMinds.forEach((document) => {
      const MindObject = {
        ...document.data(),
        id: document.id,
      };
      setMinds((prev) => [MindObject, ...prev]);
    });
  };

  useEffect(() => {
    getMinds();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "minds"), {
      text: mind,
      createdAt: Date.now(),
    });
    setMind("");
  };

  // event 안에 있는 tartget 안에 있는 value를 가져옴
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMind(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={mind}
          onChange={onChange}
          type="text"
          placeholder="Type your mind"
          laxLength={120}
        />
        <input type="submit" value="Send" />
      </form>
      <div>
        {minds.map((mind) => (
          <div key={mind.id}>
            <h4>{mind.mind}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
