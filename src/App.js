import './App.css';
// pages 
import ConfigEditor from './pages/configEditor';
import FileUploader from './pages/fileUploader';
import UserMessages from './pages/userMessages';

// import Login from './components/login';

// import Button from 'react-bootstrap/Button';

import { Routes, Route, Link } from "react-router-dom";

function App() {
  const links = [
    { value: "Config", link: "" },
    { value: "Messages", link: "/user_messages" },
    { value: "Upload sessions", link: "/upload_sessions" },
  ]

  return (
    <div className="App">
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        height: "60px",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}>
        <h3>LLM admin panel</h3>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              style={{ font: "400 16px/24px 'e-Ukraine', sans-serif", margin: '0 4px' }}
            >
              {item.value}
            </Link>
          ))}
        </div>
      </header>
      <Routes>
        <Route
          path="/llm_front"
          element={<ConfigEditor />}
        />
        <Route
          path="/user_messages"
          element={<UserMessages />}
        />
        <Route
          path="/upload_sessions"
          element={<FileUploader />}
        />        
      </Routes>
    </div>
  );
}

export default App;
