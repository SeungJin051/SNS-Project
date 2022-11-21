import { dbService, storageService } from "fbase";
import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Mind from "components/Mind";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid";

const Home = ({ userObj }) => {
  console.log(userObj);
  // for form
  const [mind, setMind] = useState("");
  const [minds, setMinds] = useState([]);
  const [file, setFile] = useState("");

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";

    // reference
    if (file !== "") {
      //파일 경로 참조 만들기
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const response = await uploadString(fileRef, file, "data_url");
      // console.log(response);
      //storage 참조 경로에 있는 파일의 URL을 다운로드해서 fileUrl 변수에 넣어서 업데이트
      fileUrl = await getDownloadURL(response.ref);
    }

    // 게시글 오브젝트
    const mindObj = {
      text: mind,
      createdAt: Date.now(),
      creatorID: userObj.uid,
      email: userObj.email,
      fileUrl,
    };

    // 작성하기 누르면 mindObj 형태로 새로운 document 생성하여 minds 콜렉션에 넣기
    await addDoc(collection(dbService, "minds"), mindObj);

    //state 비워서 form 비우기
    setMind("");
    //파일 미리보기 img src 비워주기
    setFile("");
  };

  // event 안에 있는 tartget 안에 있는 value를 가져옴
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMind(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    // get file
    const theFile = files[0];
    // make read
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFile(result);
    };
    // read file
    reader.readAsDataURL(theFile);
  };
  // clear file
  const onClearFile = () => setFile("");

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          required={true}
          minLength={5}
          value={mind}
          onChange={onChange}
          type="text"
          placeholder="Type your mind"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Send" />
        {file && (
          <div>
            <img src={file} width="50px" height="50px" />
            <button onClick={onClearFile}>취소</button>
          </div>
        )}
      </form>
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
