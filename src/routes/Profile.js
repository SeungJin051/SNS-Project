import { authService } from "fbase";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { dbService } from "fbase";
import { updateProfile } from "@firebase/auth";

//1. 로그인한 유저 정보 prop으로 받기
const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newUserName, setNewUserName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // 쿼리 필터링
  //2. 내 minds 얻는 function 생성
  const getMyMinds = async () => {
    //3. 트윗 불러오기
    //3-1. dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    const q = query(
      collection(dbService, "minds"),
      where("creatorID", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    //3-2. getDocs()메서드로 쿼리 결과 값 가져오기
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  //4. 내 minds 얻는 function 호출
  useEffect(() => {
    getMyMinds();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newUserName) {
      await updateProfile(authService.currentUser, {
        displayName: newUserName,
      });
      refreshUser();
    }
  };

  return (
    // Link to = "/"
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="이름을 입력하세요"
          value={newUserName}
        />
        <input type="submit" value="프로필 이름 변경" />
      </form>
      <button onClick={onLogOutClick}>
        {" "}
        <Link to="/">Sign out</Link>
      </button>
    </>
  );
};

export default Profile;
