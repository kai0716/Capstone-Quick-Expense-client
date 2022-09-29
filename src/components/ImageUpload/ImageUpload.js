import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageUpload.scss'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ReceiptAmount, ReceiptPST, ReceiptGST, ReceiptDate } from '../../utils/utils'
import { Button } from "react-bootstrap";


function ImageUpload(props) {
    const { passSelectedFile, setAmount, setGst, setPst, setText, setStartDate, switchButton } = props
    const [selectedFile, setSelectedFile] = useState(); // image file
    const [cropFile, setCropFile] = useState();
    const [getImgURL, setImgURL] = useState(); // url for display image on web page
    const [zoom, setZoom] = useState(false);

    //send img to the upper level for submission
    useEffect(() => {
        passSelectedFile(selectedFile);
    }, [selectedFile])

    const changeHandler = (event) => {
        if (event.target.files[0]) {

            setSelectedFile(event.target.files[0]);
            setImgURL(URL.createObjectURL(event.target.files[0]));
            setCropFile(event.target.files[0])
            setAmount(0)
            setGst(0)
            setPst(0)
            setText("")
            const data = new FormData();
            data.append('receipt', event.target.files[0]);

            // get receive data from database
            console.log(new Date());
            axios.post(`http://localhost:5050/expense/receipt`, data
            ).then((response) => {
                setAmount(ReceiptAmount(response.data))
                setText(response.data.toLowerCase())
                setPst(ReceiptPST(response.data))
                setGst(ReceiptGST(response.data))
                setStartDate(ReceiptDate(response.data))

                // console.log(ReceiptPST(response.data));
                // console.log(ReceiptGST(response.data));
                // console.log(ReceiptAmount(response.data));
                // console.log(ReceiptDate(response.data));
            }).catch(err => console.log(err))

        }

    };

    // Image zoom in and out
    const zoomTrue = () => {
        setZoom(true)
    };
    const zoomFalse = () => {
        setZoom(false)
    };

    // const cropHandler = () => {
    //     setCropFile();
    //     setText("")
    //     const data = new FormData();
    //     data.append('receipt', setCropFile);

    //     // get receive data from database
    //     console.log(new Date());
    //     axios.post(`http://localhost:5050/expense/receipt`, data
    //     ).then((response) => {
    //         setText(response.data)
    //     }).catch(err => console.log(err))

    // };

    // const [image, setImage] = useState(null);
    // const [crop, setCrop] = useState({ aspect: 16 / 9 });
    // const [result, setResult] = useState(null);

    // let width = undefined
    // let height = undefined
    // let img = document.querySelector('.single-upload__img-crop');

    // const onLoadHandler = (event) => {
    //     console.log(event.target.files[0], "THIS IS EVENT");
    //     width = event.naturalWidth / event.width
    //     height = event.naturalHeight / event.height;
    // }
    // const getCroppedImg = async () => {
    //     try {
    //         console.log(width, height)
    //         const canvas = document.createElement("canvas");
    //         const scaleX = width;
    //         const scaleY = height;
    //         canvas.width = crop.width;
    //         canvas.height = crop.height;
    //         const ctx = canvas.getContext("2d");
    //         ctx.drawImage(
    //             img,
    //             crop.x * scaleX,
    //             crop.y * scaleY,
    //             crop.width * scaleX,
    //             crop.height * scaleY,
    //             0,
    //             0,
    //             crop.width,
    //             crop.height
    //         );

    //         const base64Image = canvas.toDataURL("image/jpeg", 1);
    //         setResult(base64Image);
    //         console.log(result);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    return (
        <div className='single-upload'>

            {switchButton === "off" ?
                <>
                    {selectedFile &&
                        <>
                            <img className='single-upload__img' alt='upload image' src={getImgURL} onClick={zoomTrue} />
                            <img className={`${zoom === true ? 'single-upload__img1--active' : 'single-upload__img1'}`} alt='upload image' src={getImgURL} onClick={zoomFalse} />
                        </>
                    }
                </>
                :

                <div className='single-upload__wrapper'>
                    {/* {getImgURL && (
                        <div className='single-upload__wrapper-1'>
                            <ReactCrop
                                src={getImgURL}
                                crop={crop}
                                onChange={e => setCrop(e)}

                            >
                                <img className='single-upload__img-crop' alt='upload image' src={getImgURL} onLoad={e => onLoadHandler(e)} />
                            </ReactCrop>
                            <Button className="cropButton" onClick={getCroppedImg}
                            >
                                Get Text
                            </Button>
                        </div>
                    )}
                    {result && (
                        <div>
                            <img src={result} alt="cropped image" />
                        </div>
                    )} */}
                </div>
            }


            <div className="input-group custom-file-button">
                <label className="input-group-text" htmlFor="inputGroupFile">Upload Receipt</label>
                <input className='form-control' type="file" id="inputGroupFile" name="file" accept="image/svg, image/png, image/jpg, image/jpeg" onChange={changeHandler} />
            </div>
        </div>
    )
}

export default ImageUpload