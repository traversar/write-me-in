import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import * as AuthActions from '../actions/authentication';
import LoginPanel from './LoginPanel'

const Header = ({
    logout,
    loggedOut
}) => {

    const handleLoginLogout = () => {
        if(loggedOut){
            return <LoginPanel />
        } else {
            logout();
        }
    }

    // if (loggedOut === true) {
    //     return <Redirect to='/login' />
    // }
    // Under header, create girdle of popular tags that
    // rerenders storybrowser by tag as search would function

    return (
        <div className="h-container">
            <div className="h-content-container">
                <div className='.h-title'>
                    <Link style={{textDecoration: 'none'}} to='/'>
                        <h1 style={{cursor: 'pointer', textDecoration: 'none'}} className="site-title">write.<span className='site-title-me'>me</span>.in</h1>
                    </Link>
                </div>
                <div className='.h-searchbar'>
                    <SearchBar />
                </div>
                <div className='h-btns'>
                    <Link to='/write'>
                        <button className='h-writenew-btn'>Write</button>
                    </Link>
                    <button className='h-logout-btn' onClick={handleLoginLogout}>{loggedOut ? "Login" : "Logout"}</button>
                </div>
            </div>
        </div>
    )
}

const HeaderContainer = () => {
    const dispatch = useDispatch();
    const logout = () => dispatch(AuthActions.logout());
    const loggedOut = useSelector(state => !state.authentication.token);

    return <Header logout={logout} loggedOut={loggedOut} />;
}

export default HeaderContainer;
