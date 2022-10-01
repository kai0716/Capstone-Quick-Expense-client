import './ExpensePage.scss'
import Nav from '../../components/Nav/Nav'
import FormComponent from '../../components/FormComponent/FormComponent'
import ExpenseList from '../../components/ExpenseList/ExpenseList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function ExpensePage() {
    console.log(localStorage.getItem("user"))
    const [expenseList, setExpenseList] = useState(null)
    const [categoryList, setCategory] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:5050/expense/user/${localStorage.getItem("user")}`)
            .then((response) => {

                const newList = response.data.map(element => {
                    let newDate = new Date(element.date).toLocaleDateString();
                    return { ...element, date: newDate };
                });
                newList.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                setExpenseList(newList);
                console.log(newList, "ExpensePage1");
            })
            .catch(err => console.log(err))

        axios.get(`http://localhost:5050/category/user/${localStorage.getItem("user")}`)
            .then((response) => {

                setCategory(response.data);
                console.log(response.data)
            })
            .catch(err => console.log(err))

    }, []);

    // Filter function for expenses in 24hours , 7days, and 30days
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'All', value: '1' },
        { name: '24 Hours', value: '2' },
        { name: '7 Days', value: '3' },
        { name: '30 Days', value: '4' },
    ];
    const dateHandler = (radioValue) => {
        if (radioValue === '1') {
            axios.get(`http://localhost:5050/expense/user/${localStorage.getItem("user")}`)
                .then((response) => {

                    const newList = response.data.map(element => {
                        let newDate = new Date(element.date).toLocaleDateString();
                        return { ...element, date: newDate };
                    });
                    newList.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                    setExpenseList(newList);
                    console.log(newList, "ExpensePage1");
                })
                .catch(err => console.log(err))
            setRadioValue(radioValue)
        }
        if (radioValue === '2') {
            axios.get(`http://localhost:5050/expense/user/${localStorage.getItem("user")}`)
                .then((response) => {

                    const newList = response.data.map(element => {
                        let newDate = new Date(element.date).toLocaleDateString();
                        return { ...element, date: newDate };
                    });
                    newList.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });

                    const currentTimeStamp = new Date().getTime();
                    const dayTimestamp = 86400 * 1000;
                    const day = newList.map((e) => e);
                    const result = day.filter((e) => {
                        const newDate = new Date(e.date).getTime();

                        return currentTimeStamp - newDate <= dayTimestamp
                    })
                    console.log(day)
                    setExpenseList(result);
                    setRadioValue(radioValue)

                })
                .catch(err => console.log(err))

        }
        if (radioValue === '3') {
            axios.get(`http://localhost:5050/expense/user/${localStorage.getItem("user")}`)
                .then((response) => {

                    const newList = response.data.map(element => {
                        let newDate = new Date(element.date).toLocaleDateString();
                        return { ...element, date: newDate };
                    });
                    newList.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });

                    const currentTimeStamp = new Date().getTime();
                    const weekTimestamp = 86400 * 7 * 1000;
                    const week = newList.map((e) => e);
                    const result = week.filter((e) => {
                        const newDate = new Date(e.date).getTime();

                        return currentTimeStamp - newDate <= weekTimestamp
                    })
                    console.log(week)
                    setExpenseList(result);
                    setRadioValue(radioValue)

                })
                .catch(err => console.log(err))

        }
        if (radioValue === '4') {

            axios.get(`http://localhost:5050/expense/user/${localStorage.getItem("user")}`)
                .then((response) => {

                    const newList = response.data.map(element => {
                        let newDate = new Date(element.date).toLocaleDateString();
                        return { ...element, date: newDate };
                    });
                    newList.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });

                    const currentTimeStamp = new Date().getTime();
                    const monthTimestamp = 86400 * 30 * 1000;
                    const month = newList.map((e) => e);
                    const result = month.filter((e) => {
                        const newDate = new Date(e.date).getTime();

                        return currentTimeStamp - newDate <= monthTimestamp
                    })
                    console.log(month, "#")
                    setExpenseList(result);
                    setRadioValue(radioValue)

                })
                .catch(err => console.log(err))

        }
    }
    return (
        <div className='expense-page'>
            <Nav active="expense" />

            <div className='expense-page__wrapper'>
                <div className='expense-page__body'>
                    <div className='expense-page__mid'>

                        <div className='expense-page__expense'>
                            <div className='expense-page__expense-wrapper'>
                                <div className='expense-page__expense-body'>
                                    <div className="expense-page__body-wrapper">
                                        <h1 className='expense-page__expense-title'>Expense</h1>

                                        <ButtonGroup className="mb-2">
                                            {radios.map((radio, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`radio-${idx}`}
                                                    type="radio"
                                                    variant="secondary"
                                                    name="radio"
                                                    value={radio.value}
                                                    checked={radioValue === radio.value}
                                                    onChange={(e) => { dateHandler(e.currentTarget.value) }}

                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                        <FormComponent categoryList={categoryList} setExpenseListFn={(list) => setExpenseList(list)} />
                                    </div>

                                    <ExpenseList expenseList={expenseList} categoryList={categoryList} setExpenseListFn={(list) => setExpenseList(list)} />
                                </div>
                                <div className='expense-page__expense-button'>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default ExpensePage
