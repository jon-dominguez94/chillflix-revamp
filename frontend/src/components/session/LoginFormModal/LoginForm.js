import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MyRedirect from '../../MyRedirect';

import * as sessionActions from '../../../store/session';

const LoginForm = ({signup}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const demoRef = useRef();

    const [credential, setCredential] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [demoComplete, setDemoComplete] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setCredential('');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }, [signup]);

    useEffect(() => {
        if (demoComplete) tryLogin();
    }, [demoComplete]);

    useEffect(() => {
        let labels = document.getElementsByTagName("label");
        const inputs = [credential, email, username, password, confirmPassword]
        if (inputs.some(el => el !== "")) {
            for (let label of labels) {
                label.style.top = "4px";
                label.style.fontSize = "10px";
            }
        } else {
            for (let label of labels) {
                label.style.top = "33%";
                label.style.fontSize = "16px";
            }
        }

    }, [credential, email, username, password, confirmPassword]);

    useEffect(() => {
        let changed = false;
        const errorsCopy = [...errors];
        const changes = ["email must be unique", "username must be unique"];
        changes.forEach(err => {
            const index = errorsCopy.indexOf(err);

            if (~index) {
                errorsCopy[index] = `Account with that ${err.split(' ')[0]} already exists`;
                changed = true;
            }
        })
        if (changed) setErrors(errorsCopy);
    }, [errors]);

    const tryLogin = () => {
        return dispatch(sessionActions.loginThunk({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (signup) {
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
        } else {
            setErrors([]);
            return tryLogin();
        }
    }

    const demoLogin = (e) => {
        e.preventDefault();
        demoRef.current.setAttribute('disabled', '');

        setDemoComplete(false);
        setErrors([]);
        setCredential('');
        setPassword('');

        fillEmail('demo@gmail.com');
    }

    function fillEmail(demoEmail) {
        if (!demoEmail) {
            fillPassword('password');
            return;
        }
        setCredential((prev) => prev + demoEmail[0]);
        setTimeout(() => {
            fillEmail(demoEmail.slice(1));
        }, 50);
    }

    function fillPassword(demoPassword) {
        if (!demoPassword) {
            demoRef.current.removeAttribute('disabled');
            return setDemoComplete(true);
        }
        setPassword((prev) => prev + demoPassword[0]);
        setTimeout(() => {
            fillPassword(demoPassword.slice(1));
        }, 50);
    }


    if (sessionUser) return <MyRedirect />

    return (
        <div className="splash-container">
            <div className="modal">
                <section className="modal-screen">
                    <div className="main-header">
                        <Link to="/">
                            <img className="main-logo" src="https://fontmeme.com/permalink/181212/c5c4b3134061f86d06de9895b1ea5522.png" border="0" />
                        </Link>
                    </div>
                    <section className="modal-form">
                        <form className="session-form" onSubmit={handleSubmit}>
                            <div className="form-info">
                                <p className="form-header">{signup ? "Sign Up" : "Sign In"}</p>
                                <div className="form-inputs">
                                    {errors.length > 0 && (
                                        <div className="center-flex form-input form-text form-errors">
                                            <ul className="errorList">
                                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                                {/* {errors.map((error, idx) =>
                                                    error !== "Invalid value" ?
                                                        <li key={idx}>{error}</li> :
                                                        <></>
                                                )} */}
                                            </ul>
                                        </div>
                                    )}
                                    {signup ? (
                                        <>
                                            <div className="center-flex form-input form-text">
                                                <label>
                                                    Email
                                                    <br />
                                                </label>
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="center-flex form-input form-text">
                                                <label>
                                                    Username
                                                    <br />
                                                </label>
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="center-flex form-input form-text">
                                                <label>
                                                    Username or Email
                                                    <br />
                                                </label>
                                                <input
                                                    type="text"
                                                    value={credential}
                                                    onChange={(e) => setCredential(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </>
                                        )}
                                        <div className="center-flex form-input form-text">
                                            <label>
                                                Password
                                                <br />
                                            </label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {signup && (
                                            <div className="center-flex form-input form-text">
                                                <label>
                                                    Confirm Password
                                                    <br />
                                                </label>
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        )}


                                    <button className="form-input form-btn" type="submit">{signup ? "Sign Up" : "Sign In"}</button>

                                    {!signup && (<button ref={demoRef} className="form-input form-btn demo-btn" onClick={demoLogin}>Demo Login</button>)}
                                </div>
                                <div className="prompt">
                                    <span className="grey-text">{signup ? "Already have an acount? " : "New to Chillflix? "}</span>
                                    <span>
                                        {signup ? (
                                            <Link to="/login">Log in now.</Link>
                                        ) : (
                                            <Link to="/signup">Sign up now.</Link>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </form>
                    </section>
                </section>
            </div>


            <div className="footer">
                <div>
                    Created by <a className="go-white" href="http://jondoom.com">Jon Dominguez</a>
                </div>
                <a href="https://github.com/jon-dominguez94">
                    <div className="fa fa-github social" />
                </a>
                <a href="https://www.linkedin.com/in/jondominguez94/">
                    <div className="fa fa-linkedin social" />
                </a>
            </div>
        </div>
    );
}

export default LoginForm;
