import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]),
    [sessions, setSessions] = useState([]),
    ref = useRef();



  useEffect(() => {
    axios.get(process.env.REACT_APP_BACK_ADDRESS + '/check_sessions')
    .then(res => {
      console.log(res.data)
      setSessions(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])


  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    console.log(selectedFiles)
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + '/upload-files', formData)
      .then((response) => {
        setSelectedFiles([]);
        ref.current.value = "";
        alert('Files uploaded successfully')
        setSessions(response.data)
      })
      .catch((error) => {
        console.error('Error uploading files', error);
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '90vh',
      justifyContent: 'center',
    }}>
      {sessions.length > 0 && 
      <h2>Existing sessions:</h2>}
      {sessions.map((session, index) => {
        return(
          <div key={index}>
            <p>{session}</p>
          </div>
        )
      })}
      <div>
        <h2>Upload new sessions:</h2>
        <input type="file" accept=".session" multiple onChange={handleFileSelect} ref={ref}/>
        <button style={{
          width: '200px',
          marginTop: '30px',
          height: '40px',
          fontSize: '20px',
          fontWeight: 'bold',
          borderRadius: '10px',
          borderWidth: '0px',
          backgroundColor: '#4CAF50',
          color: 'white',
        }} onClick={handleFileUpload}>Upload</button>
      </div>

    </div>
  );
};

export default FileUploader;