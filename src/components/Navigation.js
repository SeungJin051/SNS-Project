import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import "styles/NavAnimation.css";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link to="/" tyle={{ marginRight: 10 }}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            color={"#8f8fff"}
            size="2x"
            className="search"
          />
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
          <FontAwesomeIcon
            icon={faUserEdit}
            color={"#8f8fff"}
            size="2x"
            className="search"
          />
          {userObj.displayName} 프로필
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
