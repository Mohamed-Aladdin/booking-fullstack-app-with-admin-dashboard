import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [info, setInfo] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/auth/register", info);
      alert("Registered Successfully! You may now login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone No."
          id="phone"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rInput"
          onChange={handleChange}
        />
        <button className="rButton" onClick={handleClick}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
