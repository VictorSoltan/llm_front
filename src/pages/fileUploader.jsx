import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]),
    [sessions, setSessions] = useState({ managers: [], observers: [] }),
    ref = useRef();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACK_ADDRESS + "/check_sessions")
      .then((res) => {
        console.log(res.data);
        setSessions({
          managers: res.data.managers,
          observers: res.data.observers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFileUpload = (folder) => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    console.log(selectedFiles);
    if (formData.getAll("files").length === 0) return;
    axios
      .post(
        process.env.REACT_APP_BACK_ADDRESS + `/upload-files_in_${folder}`,
        formData
      )
      .then((response) => {
        setSelectedFiles([]);
        ref.current.value = "";
        alert("Files uploaded successfully");
        setSessions(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files", error);
      });
  };

  const deleteFile = (file, folder) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + `/delete-${file}_in_${folder}`)
      .then((response) => {
        alert("Files deleted successfully");
        setSessions(response.data);
      })
      .catch((error) => {
        console.error("Error deleting files", error);
      });
  };

  return (
    <div className="flex flex-col items-center w-full h-[90vh] justify-center space-y-4 max-w-[1920px] lg:min-w-[1200px] mx-auto">
      {sessions && (
        <h2 className="font-medium text-2xl mb-2">Existing sessions:</h2>
      )}
      <div className="flex space-x-4 w-[40%]">
        <div className="w-1/2 h-[55vh] overflow-y-auto p-2 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Managers</h3>
          {sessions.managers &&
            sessions.managers.map((session, index) => {
              return (
                <div
                  key={index}
                  className="px-2 py-1 flex justify-between items-center bg-white shadow-sm rounded-md mb-2"
                >
                  <p>{session}</p>
                  <button
                    className=" text-red-700 text-lg  rounded-full w-6 h-6"
                    onClick={() => deleteFile(session, "managers")}
                  >
                    &#10005;
                  </button>
                </div>
              );
            })}
        </div>
        <div className="w-1/2 h-[55vh] overflow-y-auto p-2 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Observers</h3>
          {sessions.observers &&
            sessions.observers.map((session, index) => {
              return (
                <div
                  key={index}
                  className="px-2 py-1 flex justify-between items-center bg-white shadow-sm rounded-md mb-2"
                >
                  <p>{session}</p>
                  <button
                    className=" text-red-700 text-lg rounded-full w-6 h-6"
                    onClick={() => deleteFile(session, "observers")}
                  >
                    &#10005;
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-4 w-[40%]">
        <h2 className="font-medium text-2xl mb-2">Upload new sessions:</h2>
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
          <input
            type="file"
            accept=".session"
            multiple
            onChange={handleFileSelect}
            ref={ref}
            className="mt-2 px-4 py-2 rounded-md border-2 border-gray-200 focus:border-green-500 focus:outline-none"
          />
          <div className="flex gap-2">
          <button
            className="w-1/2 py-2 h-auto text-lg font-bold rounded-md border-0 bg-green-600 text-white transition duration-500 ease select-none hover:bg-green-700 focus:outline-none focus:shadow-outline"
            onClick={() => handleFileUpload("managers")}
          >
            Upload manager
          </button>            
          <button
            className="w-1/2 py-2 h-auto text-lg font-bold rounded-md border-0 bg-green-600 text-white transition duration-500 ease select-none hover:bg-green-700 focus:outline-none focus:shadow-outline"
            onClick={() => handleFileUpload("observers")}
          >
            Upload observer
          </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FileUploader;
