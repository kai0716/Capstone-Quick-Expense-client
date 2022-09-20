import './Nav.scss';
import logo from '../../assets/logo/icon.png';
import menuButton from '../../assets/icons/menu-button.svg';

import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    const { active } = props
    return (
        <div className="nav">
            <div className={`nav__links ${active === "dashboard" ? "nav__links--active" : ""}`}>
                <a className='nav__link' src='/dashboard'>Dashboard</a>
            </div>
            <div className={`nav__links ${active === "expense" ? "nav__links--active" : ""}`}>
                <a className='nav__link' src='/dashboard'>Expense</a>
            </div>
            <div className={`nav__links ${active === "income" ? "nav__links--active" : ""}`}>
                <a className='nav__link' src='/dashboard'>Income</a>
            </div>
            <div className={`nav__links ${active === "setting" ? "nav__links--active" : ""}`}>
                <a className='nav__link' src='/dashboard'>Setting</a>
            </div>

        </div>
    );
}