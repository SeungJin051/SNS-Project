import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { deleteObject, ref } from "@firebase/storage";
import "styles/MindTest.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Mind = ({ mindObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMind, setNewMind] = useState(mindObj.text);
  const MindTextRef = doc(dbService, "minds", `${mindObj.id}`);
  // 삭제

  if (mindObj.photoURL === null) {
    mindObj.photoURL =
      "https://audition.hanbiton.com/images/common/img_default.jpg";
  }

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      // delete mind mindObj의 id를 얻어서 / 삭제 Mind의 객체 / prop으로 보냄
      await deleteDoc(doc(dbService, "minds", mindObj.id));
      const urlRef = ref(storageService, mindObj.fileUrl);
      if (mindObj.attachmentUrl !== "") {
        await deleteObject(urlRef);
      }
    }
  };

  // 예전 값 가져오기
  const toggleEditing = () => setEditing((prev) => !prev);

  // 수정
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(mindObj, newMind);
    // await updateDoc(doc(dbService, "minds", mindObj.id), { text: newMind });
    await updateDoc(MindTextRef, {
      text: newMind,
    });
    setEditing(false);
  };

  // 인풋 값 받기
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMind(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="당신의 생각을 수정하세요."
                  value={newMind}
                  required
                  onChange={onChange}
                  autoFocus
                  className="formInput"
                />
                <input type="submit" value="수정" className="formBtn" />
              </form>
              <button onClick={toggleEditing} className="formBtn cancelBtn">
                취소
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {mindObj.photoURL && (
            <img className="profilePic" src={mindObj.photoURL} />
          )}
          <h3 className="mind-user">{mindObj.name}</h3>
          {/* date().todatestring()  */}
          {/* <h3> {mindObj.timestamp.toDate().toDateString()} </h3> */}
          <h3 className="mind-date">
            {mindObj.timestamp.toDate().toLocaleDateString("ko-KR")}
          </h3>
          <br></br>
          {/* <h4 className="mind-user-email">{mindObj.email}</h4> */}
          <br></br>
          <br></br>
          {mindObj.fileUrl && (
            <img className="nweet-img" src={mindObj.fileUrl} />
          )}
          <h4 className="mind-text">{mindObj.text}</h4>
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Mind;

/* 
    Recap **
    Home = 리스너로 snapshot을 가져옴 snapshot = 데이터베이스에 무슨일이 있을 떄, 알림을 받는다 
    그래서 새로운 스냅샷을 받을 때 배열을 만들고 state에 배열을 집어넣는다.
    (( 모든 배열의 아이템의 형식은 id:doc.id, ...doc.data()
    map으로 Mind componet를 생성
    mindObj = mind의 모든 데이터
    isOwner = 사용자를 구별해줌 아이디가 같다면 true uid => props => router => App userObj prop => onAuthStateChanged (로그인, 로그아웃, 어플리케이션 초기화 ..) => App have 3 State init, isLoggedIn, userObj

*/
