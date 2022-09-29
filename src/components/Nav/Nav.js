import './Nav.scss';
import logo from '../../assets/logo/icon.png';
import menuButton from '../../assets/icons/menu-button.svg';

import Avatar from '../Avatar/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import avartar from '../../assets/image/Kevin.jpg'
import empty from '../../assets/image/empty.jpg'

export default function Nav(props) {
    const { active } = props

    const navigate = useNavigate();
    const logout = () => {
        navigate('/login')
    }
    const dashboardLink = () => {
        navigate('/')
    }
    const expenseLink = () => {
        navigate('/expense')
    }
    return (
        <div className="nav">
            <div className='nav__wrapper'>
                <div className="nav__avatar">
                    <Avatar image={localStorage.getItem("user") === "1" ? avartar : empty} />
                </div>
                <div className={`nav__links-bg ${active === "dashboard" ? "nav__links-bg--active" : ""}`}>
                    <a className={`nav__link ${active === "dashboard" ? "nav__link--active" : ""}`} src='/dashboard' onClick={() => dashboardLink()}>Dashboard</a>
                </div>
                <div className={`nav__links-bg ${active === "expense" ? "nav__links-bg--active" : ""}`}>
                    <a className={`nav__link ${active === "expense" ? "nav__link--active" : ""}`} src='/expense' onClick={() => expenseLink()}>Expense</a>
                </div>
                <div className={`nav__links-bg ${active === "setting" ? "nav__links-bg--active" : ""}`}>
                    <a className={`nav__link ${active === "setting" ? "nav__link--active" : ""}`} src='/dashboard' onClick={e => { logout() }}>Log out</a>
                </div>
            </div>
        </div>
    );
}