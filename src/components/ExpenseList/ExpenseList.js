import './ExpenseList.scss'
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import sort from "../../assets/icons/sort-24px.svg";
import EditComponent from '../EditComponent/EditComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteModal from '../DeleteModal/DeleteModal';


function ExpenseList(props) {
    const { expenseList, categoryList, setExpenseListFn } = props

    // true = descending false = asscending
    const [sortDate, setSortDate] = useState(true);

    // sorting function for clicking the icon beside the title "date"
    const sortDateHandler = () => {

        if (sortDate === true) {
            expenseList.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            setExpenseListFn(expenseList);
            console.log(expenseList, "Asscending");
            setSortDate(false)
        }
        else {
            expenseList.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            setExpenseListFn(expenseList);
            console.log(expenseList, "Descending");
            setSortDate(true)
        }

    }


    return (
        <div className="expense-list__outer-wrapper">
            {expenseList &&
                expenseList.map((data, i) => (
                    <div className="expense-list" key={data.id}>
                        <div className="expense-list__wrapper-data">
                            <div className="expense-list__wrapper-data-left">


                                <div className="expense-list__group expense-list__group-left">
                                    <p className="expense-list__title">
                                        Receipt <img className="expense-list__title-sort" src={sort} />
                                    </p>
                                    <img className="expense-list__receipt expense-list__value" src={`http://localhost:5050/${data.receipt}`} />

                                </div>
                                <div className="expense-list__group expense-list__group-left">
                                    <p className="expense-list__title">
                                        Note <img className="expense-list__title-sort" src={sort} />
                                    </p>
                                    <a
                                        className="expense-list__name expense-list__value"
                                    >
                                        {data.note}
                                    </a>
                                </div>
                                <div className="expense-list__group expense-list__group-left">
                                    <p className="expense-list__title">
                                        Category <img className="expense-list__title-sort" src={sort} />
                                    </p>
                                    <p className="expense-list__note expense-list__value">
                                        {data.category}
                                    </p>
                                </div>
                                <div className="expense-list__group expense-list__group-left">
                                    <p className="expense-list__title">
                                        Amount <img className="expense-list__title-sort" src={sort} />
                                    </p>
                                    <p className="expense-list__contact expense-list__value">
                                        ${data.amount}
                                    </p>
                                </div>

                                <div className="expense-list__group expense-list__group-left">
                                    <p className="expense-list__title">
                                        GST <img className="expense-list__title-sort" src={sort} />
                                    </p>
                                    <p className="expense-list__contact expense-list__value">
                                        ${data.gst}
                                    </p>
                                </div>
                                <div className="expense-list__group expense-list__group-left">
                                    <p className="expense-list__title">
                                        PST <img className="expense-list__title-sort" src={sort} />
                                    </p>
                                    <p className="expense-list__contact expense-list__value">
                                        ${data.pst}
                                    </p>
                                </div>

                                <div className="expense-list__group expense-list__group-left">
                                    <p className="expense-list__title">
                                        Date <img className="expense-list__title-sort" src={sort} onClick={() => { sortDateHandler() }} />
                                    </p>

                                    <p className="expense-list__contact expense-list__value">
                                        {data.date}
                                    </p>
                                </div>

                            </div>



                        </div>
                        <div className="expense-list__wrapper-function">
                            <p className="expense-list__title expense-list__action">
                                Action<img className="expense-list__title-sort sort-fun" src={sort} />
                            </p>
                            <div className="expense-list__functions">
                                <div className="expense-list__functions-img">

                                    <DeleteModal deleteIcon={deleteIcon} expenseid={data.id} setExpenseListFn={setExpenseListFn} />
                                    <EditComponent editIcon={editIcon} setExpenseListFn={setExpenseListFn} categoryList={categoryList} expenseid={data.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ExpenseList