import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import "styles/AuthTest.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  // Social Login
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name == "google") {
      provider = new GoogleAuthProvider();
    } else if (name == "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div className="authContainer">
      <AuthForm />
      <div className="authBtns">
        <button
          onClick={onSocialClick}
          name="google"
          className="authBtn_google"
        >
          구글 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="authBtn_github"
        >
          깃허브 로그인 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
