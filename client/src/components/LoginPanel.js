import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as AuthActions from '../actions/authentication';

const LoginPanel = ({ token, login, signup }) => {
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password');
    const [username, setUsername] = useState('');
    const [suEmail, setSuEmail] = useState('');
    const [suPassword, setSuPassword] = useState('');
    const [suConfirmPassword, setSuConfirmPassword] = useState('');

    const handleLoginSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    const handleSignupSubmit = e => {
        e.preventDefault();
        signup(username, suEmail, suPassword, suConfirmPassword);
    };

    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateUsername = e => setUsername(e.target.value);
    const updateSuEmail = e => setSuEmail(e.target.value);
    const updateSuPassword = e => setSuPassword(e.target.value);
    const updateSuConfirmPassword = e => setSuConfirmPassword(e.target.value);

    if(token) {
        return <Redirect to='/' />;
    }

    return (
        <main>
            <div className='lp-container'>
                <div className='site-title'>write.me.in</div>
                <div>
                    <h2>Welcome</h2>
                    <form  className='lp-container-form' onSubmit={handleLoginSubmit}>
                        <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={updateEmail} />
                        <input
                            type='text'
                            placeholder='Password'
                            value={password}
                            onChange={updatePassword} />
                        <button type='submit'>Login</button>
                    </form>
                </div>
                <p>-OR-</p>
                <div>
                    <h2>Register</h2>
                    <form className="lp-container-form" onSubmit={handleSignupSubmit}>
                        <input
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={updateUsername} />
                        <input
                            type='text'
                            placeholder='Email'
                            value={suEmail}
                            onChange={updateSuEmail} />
                        <input
                            type='text'
                            placeholder='Password'
                            value={suPassword}
                            onChange={updateSuPassword} />
                        <input
                            type='text'
                            placeholder='Confirm Password'
                            value={suConfirmPassword}
                            onChange={updateSuConfirmPassword} />
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

const LoginPanelContainer = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);
    const login = (email, password) => dispatch(AuthActions.login(email, password));
    const signup = (username, email, password, confirmPassword) => dispatch(AuthActions.signup(username, email, password, confirmPassword));
    return <LoginPanel token={token} login={login} signup={signup} />;
};

export default LoginPanelContainer;
