import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Forms({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "login" : "register";
 

  async function handleSubmit(e) {
    // The momenet we submit the form set loading to true
    setLoading(true);
    e.preventDefault();

    try {
      const response = await api.post(route, {username, password})
       if (method === "login") {
         localStorage.setItem(ACCESS_TOKEN, response.data.access);
         localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
         navigate("/");
       }
       else{
          navigate("/login");
       }
      
    } catch (error) {
      alert(error.message);
      
    }finally{
      // After the request is done, set loading to false
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>

      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Forms;
