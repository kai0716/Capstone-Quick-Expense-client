import './LoginPage.scss'
import logo from '../../assets/logo/icon.svg'
import { useState } from 'react';

function LoginPage() {
    const [currentPage, setcurrent] = useState("login");

    const clickHandler = () => {
        setcurrent("signup")
    }
    return (
        <section className="login">
            <div className="login__content">
                <div className="login__background">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        class="img-fluid" alt="Phone image" />
                </div>
                <div className={currentPage === "login" ? 'login__form--active' : `login__form`}>
                    <h1 className='login-page__title'>Login</h1>
                    <form className='login__form-content'>
                        <div className="login__input">
                            <input type="text" id="form__username" className="login__username form-control form-control-lg" />
                            <label className="login__label form-label" htmlFor="form__username">user name</label>
                        </div>

                        <div className="login__input">
                            <input type="password" id="form__password" className="login__password form-control form-control-lg" />
                            <label className="login__label form-label" htmlFor="form__password">Password</label>
                        </div>

                        <div className="login__remember">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form__check" />
                                <label className="form-check-label" htmlFor="form__check"> Remember me </label>
                            </div>
                        </div>

                        <div className='login__button'>
                            <button type="submit" className="login__btn-in btn btn-primary btn-lg btn-block">Login</button>
                            <a type="submit" className="login__btn-up btn btn-primary btn-lg btn-block" onClick={clickHandler}>Sign up</a>
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
                            <button type="submit" className="login__btn-in btn btn-primary btn-lg btn-block" onClick={clickHandler}>Sign Up</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage