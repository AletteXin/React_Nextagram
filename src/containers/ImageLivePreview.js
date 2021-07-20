



function ImageLivePreview({ previewImage, message }) {

    return (
        <div >
            <div >
                {previewImage ? (
                    <img
                        src={previewImage}
                        width="50%"
                        height="50%"
                    />
                ) : (
                    <h6 className="text-center">
                        {message ? message : "Live Preview"}
                    </h6>
                )}
            </div>
            </div>
    )
}

export default ImageLivePreview;
