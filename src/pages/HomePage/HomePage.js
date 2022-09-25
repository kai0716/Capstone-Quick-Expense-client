import './HomePage.scss'
import Nav from '../../components/Nav/Nav'

import FileUpload from '../../components/FileUpload/FileUpload'
import FormComponent from '../../components/FormComponent/FormComponent'

function HomePage() {
    const userid = 1;

    return (
        <div className='home'>
            <Nav active="dashboard" />

            <div className='home__wrapper'>
                <div className='home__body'>
                    <div className='home__mid'>
                        <div className='home__expense'>
                            <div className='home__expense-nav'>
                                <div className='home__expense-header'>
                                    <h1 className='home__expense-title'>Expense</h1>
                                    <FormComponent />
                                </div>
                                <div className='home__expense-button'>
                                </div>
                            </div>
                        </div>
                        <div className='home__wrapper-data'>
                            <div className='home__data home__data1'>

                            </div>
                            <div className='home__data home__data2'>

                            </div>
                        </div>
                        <div className='home__expense'>

                        </div>
                    </div>
                    <div className='home__left'>
                        <div className=''>

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