import './App.css';
// pages 
import ConfigEditor from './pages/configEditor';
import FaqEditor from './pages/faqEditor';
import FileUploader from './pages/fileUploader';
import UserMessages from './pages/userMessages';

// import Login from './components/login';

// import Button from 'react-bootstrap/Button';

import { Routes, Route, Link, useLocation } from "react-router-dom";

function App() {
  const links = [
    { value: "Config", link: "/" },
    { value: "FAQ", link: "/faq_editor" },
    { value: "Messages", link: "/user_messages" },
    { value: "Upload sessions", link: "/upload_sessions" },
  ],
  location = useLocation();
  
  return (
    <div className="App">
      <header style={{
        padding: "0 20px",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}>
        <div className='max-w-[1920px] flex justify-between items-center w-full h-[60px] m-auto'>

        <h3 className='text-xl font-medium'>LLM admin panel</h3>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={location.pathname === item.link ? "text-[#4065ca] border-b-2 border-blue-200 pt-[2px]" : ""}
              style={{ font: "400 16px/24px 'e-Ukraine', sans-serif", margin: '0 4px' }}
            >
              {item.value}
            </Link>
          ))}
        </div>
        </div>

      </header>
      <Routes>
        <Route
          path="/"
          element={<ConfigEditor />}
        />
        <Route
          path="/faq_editor"
          element={<FaqEditor />}
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
