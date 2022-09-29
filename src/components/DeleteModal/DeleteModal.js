import './DeleteModal.scss'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


function DeleteModal(props) {
    const { expenseid, deleteIcon, setExpenseListFn } = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        console.log(expenseid, "sdsd");
    };
    const deleteHandler = () => {
        console.log(expenseid, "AAS");
        axios.delete(`http://localhost:5050/expense/${expenseid}`)
            .then((response) => {
                getNewExpenseList()
                setShow(false);
            })
            .catch(err => console.log(err))

    }

    const getNewExpenseList = () => {
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
                console.log(newList, "ExpenseList2");
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <img
                src={deleteIcon}
                alt="delete"
                onClick={() => { handleShow() }}
            />
            <Modal show={show} onHide={handleClose} className="delete-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body className='delete-modal__body'>Please confirm that you’d like to delete</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { deleteHandler() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal