import React from 'react';
import axios from 'axios';

export default function Login() {


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        alert(data.username + " " + data.password);
        axios.post('http://localhost:5000/api/login', data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }




  return (
    <div>
        <h1>Login</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
  );
}