import "react-datepicker/dist/react-datepicker.css";
import './EditComponent.scss'

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { useEffect } from "react";
import axios from "axios";

function EditComponent(props) {
    const { categoryList, editIcon, setExpenseListFn, expenseid } = props
    //state for modal on/off
    const [modalShow, setModalShow] = useState(false);
    const handleModelClose = () => { setModalShow(false) }
    const handleModalShow = () => setModalShow(true);

    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("Entertainment");
    const [note, setNote] = useState("");
    const [gst, setGst] = useState(0);
    const [pst, setPst] = useState(0);
    const [receipt, setReceipt] = useState(null);


    // state for date
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        axios.get(`http://localhost:5050/expense/${expenseid}`)
            .then((response) => {

                setAmount(response.data.amount)
                setCategory(response.data.category)
                setGst(response.data.gst)
                setPst(response.data.pst)
                setNote(response.data.note)
                setStartDate(new Date(response.data.date))
                setReceipt(`http://localhost:5050/${response.data.receipt}`)
            })
            .catch(err => console.log(err))
    }, [setModalShow])

    // handler for edit, submit a expense
    const onsubmit = (event) => {
        console.log("editDatass:", expenseid)
        let date = new Date(startDate);
        let utcDate = new Date(date.toUTCString());
        utcDate.setHours(utcDate.getHours() - 7);
        let caDate = new Date(utcDate);
        const obj = {
            amount: amount,
            pst: pst,
            gst: gst,
            note: note,
            category: category,
            date: caDate.toISOString().slice(0, 19).replace('T', ' ')
        }
        console.log(caDate.toISOString().slice(0, 19).replace('T', ' '))
        if (!amount || !category || !note) {
            handleModalShow();
            alert("Invaild information Edit");

        }
        else if (pst < 0 || gst < 0 || amount < 0) {
            handleModalShow();
            alert("Cannot set nagetive value");

        }
        else if (amount < gst || amount < pst) {
            handleModalShow();
            alert("Your tax value is higher then your total amount");
        }

        else {
            if (note === undefined) {
                setNote("")
            }
            if (gst === undefined) {
                setGst(0)
            }
            if (pst === undefined) {
                setPst(0)
            }
            handleModelClose();
            axios.put(`http://localhost:5050/expense/${expenseid}`, obj
            ).then((response) => {
                getDB();
            }).catch(err => console.log(err))

        }

    };
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
                setExpenseListFn(newList);
                console.log(newList, "Edit component");
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

    const [zoom, setZoom] = useState(false);
    // Image zoom in and out
    const zoomTrue = () => {
        setZoom(true)
    };
    const zoomFalse = () => {
        setZoom(false)
    };

    return (
        <div className='form-component'>
            <a onClick={handleModalShow}>
                <img src={editIcon} alt="edit" />
            </a>
            <Modal show={modalShow} onHide={handleModelClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-component__receipt">
                        <div className="form-component__img">
                            <img src={receipt} className='single-upload__img' onClick={zoomTrue}></img>
                            <img className={`${zoom === true ? 'single-upload__img1--active' : 'single-upload__img1'}`} alt='upload image' src={receipt} onClick={zoomFalse} />
                        </div>
                    </div>
                    <Form className="form-component__form">
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                placeholder={0}
                                autoFocus
                                onChange={(event) => { setAmount(parseFloat(event.target.value)) }}
                                value={amount}
                                type='number'
                                name="amount"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>GST</Form.Label>
                            <Form.Control
                                placeholder={0}
                                autoFocus
                                onChange={(event) => { setGst(parseFloat(event.target.value)) }}
                                value={gst === 0 ? 0 : gst}
                                type='number'
                                name="gst"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>PST</Form.Label>
                            <Form.Control
                                placeholder={0}
                                autoFocus
                                onChange={(event) => { setPst(parseFloat(event.target.value)) }}
                                value={pst === 0 ? 0 : pst}
                                type='number'
                                name="pst"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" name="category" value={category === "Entertainment" ? "Entertainment" : category} onChange={(event) => { setCategory(event.target.value) }}>
                                {categoryList && categoryList.map(element => {
                                    return <option key={element.id}>{element.title}</option>
                                }
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" rows={3} name="note" onChange={(event) => { setNote(event.target.value) }} value={note === "" || note === undefined ? "" : note} />
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

export default EditComponent