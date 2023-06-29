import './FileUploader.css';
import '../App.css'
import axios from 'axios';
import React, { Component,useState } from 'react';

class FileUploader extends Component {


    state = {
        selectedFile: null,
        fileUploadedSuccessfully: false,
        message:""

    }


    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    onFileUpload = () => {
        if(this.state.selectedFile===null || !this.state.selectedFile){
            this.setState({ message: 'upload a file' });
            console.log("lol-=-=-=-=--=-=-=-=-=-=-=",this.state.message)
            return

        }
        else {
            this.setState({ message: 'uploading........' });

            const formData = new FormData();
            formData.append(
                "demo file",
                this.state.selectedFile,
                this.state.selectedFile.name
            )
            axios.post("https://rdoueyevn5.execute-api.ap-south-1.amazonaws.com/prod/file-upload", formData).then(() => {

                this.setState({selectedFile: null});
                this.setState({fileUploadedSuccessfully: true});
                console.log("hellooo");
                this.setState({ message: 'uploaded' });

            })

        }
        // call api
    }
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                < div >
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Name: {this.state.selectedFile.type}</p>
                    <p>Last Modified: {" "}
                        {this.state.selectedFile.lastModified.toDateString}
                    </p>
                </div >
            );
        } else if (this.state.fileUploadedSuccessfully) {
            return (
                <div>
                    <br />
                    <h4> file has been uploaded successfully</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>  Choose a file and then press the upload button</h4>
                </div>
            );
        }


    }
    render() {
        const { message } = this.state;

        return (
            <div className='container'>
                <h2> File Upload System</h2>
                <h3> File Upload with React and a Serverless API </h3>
                <div>
                    <input type="file" onChange={this.onFileChange}>

                    </input>
                    <button onClick={this.onFileUpload}>
                        Upload
                    </button>
                </div>
                {this.fileData()}

                <p className="message">{message}</p>
            </div>
        )
    }
}

export default FileUploader;