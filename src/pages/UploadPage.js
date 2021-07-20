import React, { useState } from 'react';
import ImageLivePreview from '../containers/ImageLivePreview';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';



const UploadPage = () => {

    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')

    const newimagefile = (e) => {
        setImageFile(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmitFile = e => {

        e.preventDefault();

        if (imageFile != null) {
            setPreviewImage(null);
            setMessage(<LoadingIndicator width="100px" height="100px" color="gray" />)
            let JWT = localStorage.getItem("token");
            let formData = new FormData();
            formData.append("image", imageFile);

            axios.post('https://insta.nextacademy.com/api/v1/images/', formData, {
                headers: { Authorization: `Bearer ${JWT}` }
            })
                .then(response => {
                    if (response.data.success) {
                        setMessage("Image Uploaded Successfully!")
                        setPreviewImage(null)
                        setImageFile(null)
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });
        } else {
            alert("Please attach an image file.")
        }
    };


    return (
        <div className="uploadpage">
            <h2>IMAGE UPLOAD</h2>
            <div className="uploadimagepagebox">
                <form onSubmit={handleSubmitFile}>
                    <div>
                        <div className="imageuploadpreview" className="card"> <ImageLivePreview previewImage={previewImage} message={message} /></div>
                        <input
                            className="choosefile"
                            type="file"
                            name="image-file"
                            onChange={newimagefile}
                        />
                        <div color="muted">
                            <h6> Make sure the image being uploaded is a supported format. </h6>
                        </div>
                    </div>
                    <div className="upload" > 
                    <button type="submit" className="uploadbutton">
                        Upload
                    </button> 
                    </div>
                </form>
            </div> 
        </div>
    )
}

export default UploadPage;