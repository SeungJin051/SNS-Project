import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import "styles/NavAnimation.css";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <li>
        <Link to="/" tyle={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faHomeAlt} size="2x" />
          {/* <p style={{ fontWeight: "bold", marginLeft: 9 }}>홈</p> */}
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <FontAwesomeIcon icon={faUserEdit} size="2x" />
          {userObj.displayName}님의 프로필
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
