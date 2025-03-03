import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import MyRedirect from '../../MyRedirect';

import * as sessionActions from '../../../store/session';
import '../session.css';

const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);


    if (sessionUser) return <MyRedirect />

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signupThunk({
                username,
                email,
                password
            })).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        }
        return setErrors(['Passwords do not match']);
    }

    return (
        <div className='splash-container'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {/* {errors.map((error, idx) =>
                        error !== "Invalid value" ?
                            <li key={idx}>{error}</li> :
                            <></>
                    )} */}
                </ul>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        />
                </label>
                <label>
                    Password
                    <input
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        />
                </label>
                <label>
                    Confirm Password
                    <input
                        type="text"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupForm;
