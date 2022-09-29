import './HomePage.scss'
import Nav from '../../components/Nav/Nav'
import RadarChartComponent from '../../components/RadarChartComponent/RadarChartComponent'
import { useEffect, useState } from 'react'
import axios from 'axios'
import tip from '../../assets/image/tip.svg'
import BarChartComponent from '../../components/BarChartComponent/BarChartComponent'
import entertain from '../../assets/icons/cat4.svg'
import lifestyle from '../../assets/icons/cat3.svg'
import housing from '../../assets/icons/cat2.svg'
import food from '../../assets/icons/cat0.svg'
import transport from '../../assets/icons/cat1.svg'
import { Button, ProgressBar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    console.log(localStorage.getItem("user"))
    const [user, setUser] = useState(null)
    const [expenseList, setExpenseList] = useState(null)
    const [categoryList, setCategory] = useState(null)

    //Loading data
    useEffect(() => {
        axios.get(`http://localhost:5050/expense/user/${localStorage.getItem("user")}`)
            .then((response) => {

                setExpenseList(response.data);
                console.log(response.data)
            })
            .catch(err => console.log(err))

        axios.get(`http://localhost:5050/category/user/${localStorage.getItem("user")}`)
            .then((response) => {

                setCategory(response.data);
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }, []);

    // Generate data for radar chart
    const [radarData, setRadarData] = useState(null)
    useEffect(() => {
        const data = [];
        if (categoryList) {
            categoryList.forEach(cate => {
                const expenseCategory = expenseList.filter((e) => e.category === cate.title)
                let total = 0;

                expenseCategory.forEach(element => {
                    total = total + element.amount
                });
                const obj = { category: `${cate.title}`, total: total }
                data.push(obj)
            });
        }
        console.log(data, "DT")
        setRadarData(data)
    }, [expenseList]);

    // generate data for bar chart
    const [barData, setBarData] = useState([])
    useEffect(() => {
        const data = [];
        let weeDay = {
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
            0: 'Sunday'
        }
        if (expenseList) {
            const currentTimeStamp = new Date().getTime();
            const weekTimestamp = 86400 * 1000 * 7;
            const temp = expenseList.map((e) => e);
            const weekList = temp.filter((e) => {
                const listDate = new Date(e.date);
                return currentTimeStamp - listDate <= weekTimestamp
            })

            for (let i = 0; i < 7; i++) {

                const dayList = weekList.filter((e) => {
                    const day = new Date(e.date).getDay();
                    // const time
                    return day === i;
                })
                let totalAmount = 0;
                let totalGst = 0;
                let totalPst = 0;
                let date = "";
                dayList.map((e) => {
                    totalAmount = totalAmount + (e.amount - e.gst - e.pst);
                    totalGst = totalGst + e.gst;
                    totalPst = totalPst + e.pst
                    date = new Date(e.date).toLocaleDateString()
                })


                // if (dayList.length === 0) {
                //     const currentDay = new Date().getDay();
                //     const current = new Date();
                //     let diff = parseInt(Math.abs(currentDay - i));

                //     if (currentDay >= i) {
                //         const temp1 = current.getDate() - diff;
                //         date = new Date(temp1).toLocaleDateString();
                //         console.log("CHECK", current.getDate(), diff)
                //     }
                //     else {
                //         const temp2 = current.getDate() + diff;
                //         date = new Date(temp2).toLocaleDateString();
                //     }
                // }

                const obj = {
                    subtotal: totalAmount,
                    gst: totalGst,
                    pst: totalPst,
                    weekday: weeDay[i],
                    date: date
                }
                data.push(obj);
            }

        }
        data.sort(function (a, b) {
            return new Date(b.date).getDate() - new Date(a.date).getDate();
        });
        console.log(data, "BAR")
        setBarData(data.reverse())
    }, [expenseList]);

    // today list
    const [todayExpList, setTodayExpList] = useState([])
    useEffect(() => {
        if (expenseList) {
            const tempList = expenseList.filter((e) => {
                const newDate = new Date().toLocaleDateString();
                const eDate = new Date(e.date).toLocaleDateString();
                console.log(e.date, eDate === newDate, newDate);
                return eDate === newDate;
            })

            setTodayExpList(tempList)
        }

    }, [expenseList]);
    console.log(todayExpList, "TDF")

    //view all button
    const navigate = useNavigate();
    const viewAll = () => {
        navigate('/expense')
    }

    const [montlySpending, setMontyleSpending] = useState([])
    const [montlySpendingTotal, setMontyleSpendingTotal] = useState([])
    useEffect(() => {
        const data = [];
        if (categoryList) {
            categoryList.forEach(cate => {
                const expenseCategory = expenseList.filter((e) => e.category === cate.title)
                let total = 0;

                const monthExpCate = expenseCategory.filter((e) => {
                    const monthList = new Date(e.date).getMonth();
                    const newDate = new Date().getMonth();

                    return newDate === monthList;
                })
                const yearExpCate = monthExpCate.filter((e) => {
                    const yearList = new Date(e.date).getFullYear();
                    const newDate = new Date().getFullYear();

                    return newDate === yearList;
                })


                yearExpCate.forEach(element => {
                    total = total + element.amount
                });
                const obj = { category: `${cate.title}`, total: parseFloat(total) }
                data.push(obj)
            });
            let sumTotal = 0;
            const temp = data.map(obj => ({ ...obj, sum: 0 }))

            for (let i in temp) {
                sumTotal = sumTotal + parseFloat(temp[i].total);
            }
            for (let i in temp) {
                if (sumTotal !== 0) {
                    let tempValue = temp[i].total / sumTotal * 100;
                    temp[i].sum = tempValue.toFixed(2);
                }
                else {
                    temp[i].sum = 0;
                }
            }
            setMontyleSpending(temp)
        }


    }, [expenseList]);
    console.log(montlySpending, "HHH");


    return (
        <div className='home'>
            <Nav active="dashboard" />

            <div className='home__wrapper'>
                <div className='home__body'>
                    <div className='home__mid'>

                        <div className='home__wrapper-data'>
                            <div className='home__data home__data1'>
                                <p style={{ textAlign: 'center', fontSize: "0.8125rem" }}>Week Record</p>
                                <BarChartComponent data={barData} />
                            </div>
                            <div className='home__data home__data2'>
                                <p style={{ textAlign: 'center', fontSize: "0.8125rem" }}>History Record</p>
                                <RadarChartComponent radarData={radarData} />

                            </div>
                        </div>

                        <div className='home__expense'>
                            <div className='home__expense-nav'>
                                <div className='home__expense-header'>
                                    <div className="home__expense-wrapper">
                                        <div className='home__expense-wrapper-title'>
                                            <h2 className='home__expense-title'>Today, Thursday, 29 Sep</h2>
                                            <Button variant="dark" onClick={() => { viewAll() }}>
                                                View All
                                            </Button>
                                        </div>
                                        <div className='home__item-list'>
                                            {todayExpList && todayExpList.map((e) => (
                                                <div key={e.id} className="home__item">
                                                    <div className='home__item-content'>
                                                        <img className="home__item-img" src={e.category === "Entertainment" ? entertain
                                                            : e.category === "Housing" ? housing
                                                                : e.category === "Food and Drinks" ? food
                                                                    : e.category === "Transportation" ? transport
                                                                        : e.category === "Lifestyle" ? lifestyle : ''}
                                                        />
                                                        <div className="home__item-wrapper">
                                                            <p className='home__item-text'>{e.category}</p>
                                                            <p className='home__item-subtext'> {e.note}</p>
                                                        </div>

                                                        <p className='home__item-text-amount'>-${e.amount}</p>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='home__left'>
                        <div className='home__left-data'>
                            <h2 style={{ width: '70%', textAlign: 'center', margin: "auto", paddingTop: '0.5rem' }}>Your spending on September</h2>
                            <div className='home__left-data-content'>
                                {montlySpending && montlySpending.map((element, i) =>
                                (
                                    <div className='home__left-data-text'>
                                        <div className='home__left-month'>
                                            <p key={i}>{element.category}</p>
                                            <p>${element.total}</p>
                                        </div>
                                        <ProgressBar variant="success" now={element.sum} label={`${element.sum}%`} />
                                    </div>
                                )
                                )}
                            </div>
                        </div>
                        <div className='home__tips'>
                            <img className='home__tips-img' src={tip} alt='tips' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage

{/* <h1>Logo</h1>


<FileUpload /> */}


        // axios.put(`http://localhost:5050/expense/5`, data
        // ).then((response) => {
        //     getDB();
        // }).catch(err => console.log(err))