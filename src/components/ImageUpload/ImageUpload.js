import './ImageUpload.scss'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import { createWorker } from 'tesseract.js';

function ImageUpload(props) {
    const { passSelectedFile } = props
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [getImgURL, setImgURL] = useState();
    const [zoom, setZoom] = useState(false);

    useEffect(() => {
        passSelectedFile(selectedFile);
    }, [selectedFile])

    const changeHandler = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            setImgURL(URL.createObjectURL(event.target.files[0]));

            const data = new FormData();
            data.append('receipt', event.target.files[0]);

            // get receive data from database
            console.log(new Date());
            axios.post(`http://localhost:5050/expense/receipt`, data
            ).then((response) => {
                response.data.toLowerCase().split(/\r?\n/).forEach(element => {

                    if (element.match(new RegExp("\\b" + "total" + "\\b")) || element.match(new RegExp("\\b" + "amount" + "\\b"))) {
                        console.log(element.replace(/[^0-9.]/g, ''));
                    }
                    console.log(element)
                });
                console.log(new Date());
            }).catch(err => console.log(err))


        }
    };

    const zoomTrue = () => {
        setZoom(true)
    };
    const zoomFalse = () => {
        setZoom(false)
    };

    return (
        <div className='single-upload'>
            {selectedFile &&
                <>
                    <img className='single-upload__img' alt='upload image' src={getImgURL} onClick={zoomTrue} />
                    <img className={`${zoom === true ? 'single-upload__img1--active' : 'single-upload__img1'}`} alt='upload image' src={getImgURL} onClick={zoomFalse} />

                </>
            }

            <div className="input-group custom-file-button">
                <label className="input-group-text" htmlFor="inputGroupFile">Upload Receipt</label>
                <input className='form-control' type="file" id="inputGroupFile" name="file" accept="image/svg, image/png, image/jpg, image/jpeg" onChange={changeHandler} />
            </div>
        </div>
    )
}

export default ImageUpload