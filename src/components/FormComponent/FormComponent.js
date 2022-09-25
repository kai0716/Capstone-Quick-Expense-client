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
    //state for modal on/off
    const [modalShow, setModalShow] = useState(false);
    const handleModelClose = () => { setModalShow(false); setAmount(0); }
    const handleModalShow = () => setModalShow(true);


    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("Grocery");
    const [note, setNote] = useState("");
    const [recurring, setRecurring] = useState("Never");


    // state for selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // state for date
    const [startDate, setStartDate] = useState(new Date());
    useEffect(() => {
        let date = new Date(startDate);
        if (date) {
            let utcDate = new Date(date.toUTCString());
            utcDate.setHours(utcDate.getHours() - 7);
            let caDate = new Date(utcDate).toISOString().slice(0, 19).replace('T', ' ');
        }
    }, [startDate])

    // handler for submiting a expense
    const onsubmit = (event) => {
        let date = new Date();
        let utcDate = new Date(date.toUTCString());
        utcDate.setHours(utcDate.getHours() - 7);
        let caDate = new Date(utcDate);

        if (!amount || !selectedFile || !category || !recurring || !date) {
            alert("Invaild data");
            handleModalShow();
        }
        else {
            handleModelClose();
            const data = new FormData();
            data.append('user_id', 1);
            data.append('amount', amount);
            data.append('note', note);
            data.append('receipt', selectedFile);
            data.append('category', category);
            data.append('date', caDate.toISOString().slice(0, 19).replace('T', ' '));
            data.append('recurring', recurring);

            axios.post(`http://localhost:5050/expense`, data
            ).then((response) => {
                console.log(response.data);
                getDB();
            }).catch(err => console.log(err))
        }

    };
    const getDB = () => {
        axios.get(`http://localhost:5050/expense`)
            .then((response) => {


            }).catch(err => console.log(err))
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
                            <ImageUpload passSelectedFile={(file) => { setSelectedFile(file) }} />
                        </div>
                    </div>
                    <Form className="form-component__form">
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                placeholder={`$${amount}`}
                                autoFocus
                                onChange={(event) => { setAmount(event.target.value) }}
                                type='number'
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(event) => { setCategory(event.target.value) }}>
                                <option>Income</option>
                                <option></option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Recurring</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(event) => { setRecurring(event.target.value) }}>
                                <option>Never</option>
                                <option>Every day</option>
                                <option>Every week</option>
                                <option>Every year</option>
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