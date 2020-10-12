import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import * as AuthActions from '../actions/authentication';

const Header = ({
    logout,
    loggedOut
}) => {

    const handleLogout = () => {
        logout();
    }

    if (loggedOut === true) {
        return <Redirect to='/login' />
    }
    // Under header, create girdle of popular tags that
    // rerenders storybrowser by tag as search would function

    return (
        <div className="h-container">
            <div className="h-content-container">
                <div className='.h-title'>
                    <h1 className="site-title">write.<span className='site-title-me'>me</span>.in</h1>
                </div>
                <div className='.h-searchbar'>
                    <SearchBar />
                </div>
                <div className='h-btns'>
                    <NavLink to='/write'>
                        <button className='h-writenew-btn'>Write</button>
                    </NavLink>
                    <button className='h-logout-btn' onClick={handleLogout}>Logout</button>
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
