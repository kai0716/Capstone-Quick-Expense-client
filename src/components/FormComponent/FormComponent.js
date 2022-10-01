import "react-datepicker/dist/react-datepicker.css";
import './FormComponent.scss'

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { useEffect } from "react";
import axios from "axios";

import ImageUpload from '../../components/ImageUpload/ImageUpload'

function FormComponent(props) {
    const { categoryList, setExpenseListFn } = props
    //state for modal on/off
    const [modalShow, setModalShow] = useState(false);
    const handleModelClose = () => {
        setModalShow(false);
        setAmount(0);
        setGst(0)
        setPst(0)
        setStartDate(new Date())
        setText("");
    }
    const handleModalShow = () => setModalShow(true);

    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("Entertainment");
    const [note, setNote] = useState("");
    const [text, setText] = useState("");
    const [gst, setGst] = useState(0);
    const [pst, setPst] = useState(0);


    useEffect(() => {
        console.log(note)
    }, [note])
    // state for selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // state for date
    const [startDate, setStartDate] = useState(new Date());

    // handler for adding, submiting a expense
    const onsubmit = (event) => {
        let date = new Date(startDate);
        let utcDate = new Date(date.toUTCString());
        utcDate.setHours(utcDate.getHours() - 7);
        let caDate = new Date(utcDate);
        console.log(event.target.note)
        if (!amount || !selectedFile || !date || !note) {
            handleModalShow();
            alert("Invaild information");

        }
        else if (pst < 0 || gst < 0 || amount < 0) {
            handleModalShow();
            alert("Cannot set nagetive value");

        }
        else if (amount < gst || amount < pst) {
            handleModalShow();
            alert("Your tax value is higher then your total amount");

        }
        else if (note === "") {
            handleModalShow();
            alert("Please enter somenote");

        }
        else {
            handleModelClose();
            if (note === undefined) {
                setNote("")
            }
            if (gst === undefined) {
                setGst(0)
            }
            if (pst === undefined) {
                setPst(0)
            }

            console.log("PST:", pst)
            const data = new FormData();
            data.append('user_id', parseInt(localStorage.getItem("user")));
            data.append('amount', amount);
            data.append('pst', pst);
            data.append('gst', gst);
            data.append('note', note);
            data.append('receipt', selectedFile);
            data.append('category', category);
            data.append('date', caDate.toISOString().slice(0, 19).replace('T', ' '));
            console.log(data, "ADD")

            axios.post(`http://localhost:5050/expense`, data
            ).then((response) => {
                console.log(response.data);
                getDB();
            }).catch(err => console.log(err))
        }

    };
    // calls by the sumbit handler after data submited - to request the latest updated expenses list from the database
    const getDB = () => {
        axios.get(`http://localhost:5050/expense/user/${localStorage.getItem("user")}`)
            .then((response) => {

                const newList = response.data.map(element => {
                    let newDate = new Date(element.date).toLocaleDateString();
                    return { ...element, date: newDate };
                });
                newList.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                //pass the latest updated expenses list to the top parent.
                setExpenseListFn(newList);
                console.log(newList, "FormComponent");
            })
            .catch(err => console.log(err))
    }

    const [switchButton, setSwitchButton] = useState("off");
    const cropSwitch = () => {
        if (switchButton == "off") {
            setSwitchButton("on")
        }
        else {
            setSwitchButton("off")
        }
    }

    return (
        <div className='form-component'>
            <a className='home__expense-btn btn btn-primary btn-md btn-block' onClick={handleModalShow}>Add Expense</a>

            <Modal show={modalShow} onHide={handleModelClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-component__receipt">
                        <div className="form-component__img">
                            {/* <Button className={`cropButton--${switchButton}`} onClick={cropSwitch}>
                                Crop {switchButton}
                            </Button> */}
                            <ImageUpload
                                passSelectedFile={(file) => { setSelectedFile(file) }}
                                setAmount={setAmount}
                                setText={setText}
                                setGst={setGst}
                                setPst={setPst}
                                setStartDate={setStartDate}
                                switchButton={switchButton}
                            />
                            <div className="form-component__text">
                                <p>{text}</p>
                            </div>
                        </div>
                    </div>
                    <Form className="form-component__form">
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                placeholder={0}
                                autoFocus
                                onChange={(event) => { setAmount(event.target.value) }}
                                value={amount === 0 ? '' : amount}
                                type='number'
                                name="amount"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>GST</Form.Label>
                            <Form.Control
                                placeholder={0}
                                autoFocus
                                onChange={(event) => { setGst(event.target.value) }}
                                value={gst === 0 ? '' : gst}
                                type='number'
                                name="gst"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>PST</Form.Label>
                            <Form.Control
                                placeholder={0}
                                autoFocus
                                onChange={(event) => { setPst(event.target.value) }}
                                value={pst === 0 ? '' : pst}
                                type='number'
                                name="pst"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" name="category" onChange={(event) => { setCategory(event.target.value) }}>
                                {categoryList && categoryList.map(element => {
                                    return <option key={element.id}>{element.title}</option>
                                }
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" rows={3} name="note" onChange={(event) => { setNote(event.target.value) }} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Date</Form.Label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModelClose}>
                        Close
                    </Button>
                    <input className=" btn btn-primary btn-md btn-block" type="submit" value="Send Request" onClick={onsubmit} />
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FormComponent