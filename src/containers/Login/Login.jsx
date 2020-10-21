import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Login = () => {
    const handleSubmit = event => {
        event.preventDefault();
        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        axios.post('http://localhost:3004/users/login', user)
            .then(res => {
                console.log(res)
            })
            .catch(error => console.log(error.response.data))
    }

    return (
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="email" name="email" required placeholder="Introduce tu email" />
                <input type="password" name="password" required placeholder="Introduce tu contraseña" />
                <button type="submit">Log in</button>
            </form>
            <back>
                <Link to ='/'>Home</Link>
            </back>
        </div>
    )
}

export default Login;