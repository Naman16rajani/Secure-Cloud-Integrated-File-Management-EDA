import './FileUploader.css';
import '../App.css'
import axios from 'axios';
import React, { Component } from 'react';

class FileUploader extends Component {
    state = {
        selectedFile: null,
        fileUploadedSuccessfully: false,
        message: "",
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    onFileUpload = () => {
        if (this.state.selectedFile === null || !this.state.selectedFile) {
            this.setState({ message: 'Upload a file' });
            return;
        } else {
            this.setState({ message: 'Uploading........' });

            const formData = new FormData();
            formData.append(
                "demo file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            axios.post("https://rdoueyevn5.execute-api.ap-south-1.amazonaws.com/prod/file-upload", formData).then(() => {
                this.setState({ selectedFile: null });
                this.setState({ fileUploadedSuccessfully: true });
                this.setState({ message: 'Uploaded' });
            })
                .catch(error => {
                    this.setState({ message: 'Upload failed' });
                });
        }
    }

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
                </div>
            );
        } else if (this.state.fileUploadedSuccessfully) {
            return (
                <div>
                    <br />
                    <h4>File has been uploaded successfully</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose a file and then press the upload button</h4>
                </div>
            );
        }
    }

    render() {
        const { message } = this.state;

        return (
            <div className='container'>
                <h2>File Upload System</h2>
                <h3>File Upload with React and a Serverless API</h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>Upload</button>
                    <a href="https://u58abcovbg.execute-api.ap-south-1.amazonaws.com/prod/download" download>
                        <button>Download</button>
                    </a>
                </div>
                {this.fileData()}
                <p className="message">{message}</p>
            </div>
        )
    }
}

export default FileUploader;
