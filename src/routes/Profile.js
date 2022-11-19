import { authService } from "fbase";
import { Link } from "react-router-dom";

const Profile = () => {
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    // Link to = "/"
    <div>
      <button onClick={onLogOutClick}>
        {" "}
        <Link to="/">Log Out</Link>
      </button>
    </div>
  );
};

export default Profile;
