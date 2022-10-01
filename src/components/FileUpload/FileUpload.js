import { useState } from "react";
import './FileUpload'

// Allow user to upload an pdf, not implement yet
function FileUpload() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {

    };

    return (
        <div>
            <input type="file" name="file" accept="application/pdf" onChange={changeHandler} />
            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile && selectedFile.name}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile && selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}

export default FileUpload