import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Mind = ({ mindObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMind, setNewMind] = useState(mindObj.text);

  // 삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      // delete mind mindObj의 id를 얻어서 / 삭제 Mind의 객체 / prop으로 보냄
      deleteDoc(doc(dbService, "minds", mindObj.id));
    }
  };

  // 예전 값 가져오기
  const toggleEditing = () => setEditing((prev) => !prev);

  // 수정
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(mindObj, newMind);
    updateDoc(doc(dbService, "minds", mindObj.id), { text: newMind });
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
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              {" "}
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="당신의 생각을 수정하세요."
                  value={newMind}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update" />
              </form>
              <button onClick={toggleEditing}>취소</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{mindObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
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
