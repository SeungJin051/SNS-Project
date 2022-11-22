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
          value={newAccount ? "회원가입" : "로그인"}
          className=" authSubmitInput"
        />
        {error && <span className="authError">{error}</span>}
      </form>

      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "회원가입" : "로그인"}
      </span>
    </>
  );
};

export default AuthForm;
