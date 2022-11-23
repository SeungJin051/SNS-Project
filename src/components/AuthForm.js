import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "styles/AuthTest.css";
import { useState } from "react";
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // createUserWithEmailAndPassword
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        const auth = getAuth();
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // login
        const auth = getAuth();
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <img
          className="login-image"
          src="https://www.waca.associates/jp/knowledge/wp-content/uploads/2020/06/2020-06-26-sns-manager-03-1000x525.png"
        />
        <h1 className="main-title">Mind Share</h1>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
          minLength={6}
          className="authInput"
        />

        <input
          type="submit"
          value={newAccount ? "로그인" : "가입하기"}
          className=" authSubmitInput"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <div onClick={toggleAccount} className="authSwitch">
        {newAccount ? (
          <div>
            <p>계정이 없으신가요?</p> <br></br>
            <span className="change-login">
              {newAccount ? " 가입" : " 로그인"}
            </span>
            <span>하기</span>
          </div>
        ) : (
          <div>
            <p>이미 가입하셨나요?</p> <br></br>
            <span className="change-login">
              {newAccount ? " 가입" : " 로그인"}
            </span>
            <span>하기</span>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthForm;
