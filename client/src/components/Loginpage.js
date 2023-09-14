import React, { useContext } from 'react';
import '../../src/form.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Loginpage() {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (response.status != 200) {
            alert('wrong credentials');

        }
        else {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setredirect(true);
            })
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }


    return (
        <div className='container'>
            <div className="wrapper">
                <div className="title">
                    Login
                </div>
                <form action="#" onSubmit={login}>
                    <div className="field">
                        <input type="text" required
                            value={username}
                            onChange={ev => { setusername(ev.target.value) }}
                        />
                        <label>Username</label>
                    </div>
                    <div className="field">
                        <input type="password" required
                            value={password}
                            onChange={ev => { setpassword(ev.target.value) }}
                        />
                        <label>Password</label>
                    </div>

                    <div className="field">
                        <input type="submit" value="Login" />
                    </div>

                </form>
            </div>
        </div>
    )
}
