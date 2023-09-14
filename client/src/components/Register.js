import React from 'react';
import { useState } from 'react';

export default function Register() {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/register", {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.status !== 200) {
            alert('registration failed');
        }
        else {
            alert('successfully registered');
        }
    }

    return (
        <div className='container'>
            <div className="wrapper">
                <div className="title">
                    Register
                </div>
                <form action="#" onSubmit={register}>
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
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    )
}
