import AppRouter from "./Router";
import React, { useState, useEffect } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // login => onAuthStateChanged => save => UserObj
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        // setUserObj({
        //   displayName: user.displayName,
        //   uid: user.uid,
        //   updateProfile: (args) => user.updateProfile(args),
        // });
        // 로컬 닉네임 설정 ** 고민 후 결정하자 ~~~~~~~~~~~~~~~~
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          // const name = "Anonymous";
          user.displayName = name;
        }
        if (user.photoURL === null) {
          user.photoURL =
            "https://audition.hanbiton.com/images/common/img_default.jpg";
        }
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // *
  const refreshUser = () => {
    const user = authService.currentUser;
    // 복사본을 만들어 랜더링을 유도
    setUserObj(Object.assign({}, user));
  };

  return (
    <div>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "100%",
            fontSize: "30px",
            fontWeight: "900",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}

export default App;
