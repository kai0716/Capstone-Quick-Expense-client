import './Nav.scss';
import logo from '../../assets/logo/icon.png';
import menuButton from '../../assets/icons/menu-button.svg';

import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    const { active } = props
    return (
        <div className="nav">
            <div className='nav__wrapper'>
                <div className="nav__avatar">
                    <Avatar />
                    <p>User Name</p>
                    <p></p>
                </div>
                <div className={`nav__links-bg ${active === "dashboard" ? "nav__links-bg--active" : ""}`}>
                    <a className={`nav__link ${active === "dashboard" ? "nav__link--active" : ""}`} src='/dashboard'>Dashboard</a>
                </div>
                <div className={`nav__links-bg ${active === "expense" ? "nav__links-bg--active" : ""}`}>
                    <a className={`nav__link ${active === "expense" ? "nav__link--active" : ""}`} src='/dashboard'>Expense</a>
                </div>
                <div className={`nav__links-bg ${active === "income" ? "nav__links-bg--active" : ""}`}>
                    <a className={`nav__link ${active === "income" ? "nav__link--active" : ""}`} src='/dashboard'>Income</a>
                </div>
                <div className={`nav__links-bg ${active === "setting" ? "nav__links-bg--active" : ""}`}>
                    <a className={`nav__link ${active === "setting" ? "nav__link--active" : ""}`} src='/dashboard'>Setting</a>
                </div>
            </div>
        </div>
    );
}