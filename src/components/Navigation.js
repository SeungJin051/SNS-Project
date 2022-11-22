import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUserEdit,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link to="/" tyle={{ marginRight: 10 }}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            color={"#04AAFF"}
            size="2x"
            className="search"
          />
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          <FontAwesomeIcon
            icon={faUserEdit}
            color={"#04AAFF"}
            size="2x"
            className="search"
          />
          {userObj.displayName}의 프로필
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
