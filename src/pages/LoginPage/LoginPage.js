import './LoginPage.scss'
import logo from '../../assets/logo/icon.svg'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [currentPage, setcurrent] = useState("login");
    const [userList, setUserList] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const clickHandler = () => {
        setcurrent("signup")
    }
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:5050/users`)
            .then((response) => {
                setUserList(response.data)
            })
            .catch(err => console.log(err))
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        if (userList != null) {
            userList.forEach(user => {
                if (user.username === event.target.username.value) {

                    if (user.password === event.target.password.value) {
                        localStorage.setItem('user', user.id);
                        navigate("/");

                    }
                    else {
                        alert("Wrong password")
                    }
                }

            });
        }
    }
    return (
        <section className="login">
            <div className="login__content">
                <div className="login__background">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid" alt="Phone image" />
                </div>
                <div className={currentPage === "login" ? 'login__form--active' : `login__form`}>
                    <h1 className='login-page__title'>Login</h1>
                    <form className='login__form-content' onSubmit={e => submitHandler(e)}>
                        <div className="login__input">
                            <label className="login__label form-label" htmlFor="form__username">User Name</label>
                            <input type="text" id="form__username" name="username" className="login__username form-control form-control-lg" />

                        </div>

                        <div className="login__input">
                            <label className="login__label form-label" htmlFor="form__password">Password</label>
                            <input type="password" id="form__password" name="password" className="login__password form-control form-control-lg" />

                        </div>

                        <div className='login__button'>
                            <button type="submit" className="login__btn-in btn btn-primary btn-lg btn-block" >Login</button>
                            {/* <a type="submit" className="login__btn-up btn btn-primary btn-lg btn-block" onClick={clickHandler}>Sign up</a> */}
                        </div>
                    </form>
                </div>

                <div className={currentPage === "signup" ? `login__form--active` : `login__form`}>
                    <h1 className='login-page__title'>Sign Up</h1>
                    <form className='login__form-content'>
                        <div className="login__input">
                            <input type="text" id="form__username" className="login__username form-control form-control-lg" />
                            <label className="login__label form-label" htmlFor="form__username">user name</label>
                        </div>

                        <div className="login__input">
                            <input type="password" id="form__password" className="login__password form-control form-control-lg" />
                            <label className="login__label form-label" htmlFor="form__password">Password</label>
                        </div>

                        <div className="login__input">
                            <input type="password" id="form__confirm" className="login__password form-control form-control-lg" />
                            <label className="login__label form-label" htmlFor="form__confirm">Confrim Password</label>
                        </div>


                        <div className='login__button'>
                            <button type="submit" className="login__btn-in btn btn-primary btn-lg btn-block" onSubmit={clickHandler}>Sign Up</button>
                        </div>

                    </form>
                </div>
            </div >
        </section >
    )
}

export default LoginPage