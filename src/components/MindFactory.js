import { dbService, storageService } from "fbase";
import { useState } from "react";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const MindFactory = ({ userObj }) => {
  const [mind, setMind] = useState("");
  const [file, setFile] = useState("");

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
      name: userObj.displayName,
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
  );
};

export default MindFactory;
