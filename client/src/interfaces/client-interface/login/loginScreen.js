import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginScreen.css";
import Button from "react-bootstrap/Button";
import { failedToLogin } from "../../../components/clientapp/alerts/failed-to-login.components";

function Login() {
  const [userCid, setUserCid] = useState("");
  const [users, setUsers] = useState([]);
  const [showFailedToLogin, setShowFailedToLogin] = useState(false);
  const [timerId, setTimerId] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/customer").then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  const handleDropdownChange = (event) => {
    setUserCid(event.target.value);
  };

  const login = () => {
    if (userCid === "") {
      displayFailedToLoginAlert();
      return;
    }
    navigate(`/home/` + userCid);
  };

  const displayFailedToLoginAlert = () => {
    setShowFailedToLogin(true);
    // reset timer if add to cart clicked before 3 seconds is up
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowFailedToLogin(false);
    }, 3000);
    setTimerId(newTimerId);
  };

  return (
    <div className="App">
      {showFailedToLogin && failedToLogin()}
      <header className="App-header white">
        <h1>Welcome To Restaurant-App</h1>
        <p className="pad">
          <select
            id="dropdown"
            className="border rounded px-2 py-1"
            onChange={handleDropdownChange}
            value={userCid}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.cid} value={user.cid}>
                {user.name}
              </option>
            ))}
          </select>
        </p>
        <Button variant="outline-success" size="lg" onClick={login}>
          Login
        </Button>
      </header>
    </div>
  );
}

export default Login;
