import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log(selectedFile)
            if (selectedFile.type === 'application/pdf' ||
                selectedFile.name.endsWith('.pdf')) {
                setFile(selectedFile);

                setError('');
            } else {
                setError('Please upload a PDF or DOCX file');
                setFile(null);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post(backendUrl + '/api/v1/resumeupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate(`/jobs?name=${response.data.name}`, { state: response.data });
        } catch (error) {
            console.log(error)
            setError('Upload failed. Please try again.');
        }
    };

    return (
        <StyledWrapper>
            <div className="upload-container">
                <h1>Upload Your Resume</h1>

                <label className="custum-file-upload" htmlFor="file">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path fill d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                    </div>
                    <div className="text">
                        <span>{file ? file.name : 'Click to upload resume (PDF/DOCX)'}</span>
                    </div>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                    />
                </label>

                {error && <div className="error-message">{error}</div>}

                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={!file}
                >
                    Analyze Resume
                </button>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;

  .upload-container {
    width: 100%;
    max-width: 600px;
    text-align: center;
  }

  h1 {
    margin-bottom: 2rem;
    color: #2d3748;
  }

  .custum-file-upload {
    height: 200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    cursor: pointer;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0,0,0,0.1);
    transition: border-color 0.3s ease;

    &:hover {
      border-color: #4299e1;
    }

    .icon svg {
      height: 80px;
      fill: currentColor;
      color: #718096;
    }

    .text span {
      font-weight: 400;
      color: #718096;
      word-break: break-word;
      text-align: center;
    }
  }

  input[type="file"] {
    display: none;
  }

  .submit-button {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    background-color: #4299e1;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3182ce;
    }

    &:disabled {
      background-color: #cbd5e0;
      cursor: not-allowed;
    }
  }

  .error-message {
    color: #e53e3e;
    margin-top: 1rem;
    font-size: 0.875rem;
  }
`;

export default UploadPage;