
import React, { useState } from 'react';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLogin = e => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);

        setSuccess(false);


        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);

                if (!result.user.emailVerified) {
                    setLoginError('verfied Email');
                    return;
                }
                else{
                    setSuccess(true)
                }

                
            })
            .catch((error) => {
                console.log('Error:', error.message);
                setLoginError(error.message);
                setSuccess(false)
            });


    }

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 mx-auto">

            <form onSubmit={handleLogin} className="card-body">

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />

                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>

                <div className="form-control mt-4">
                    <button className="btn btn-primary">Login</button>
                </div>

                {
                    success && <p className='text-green-500'>Login Successfully!!!</p>
                }
                {
                    loginError && <p className='text-red-500'>Login Not Successfully!!!</p>
                }

            </form>

            <p>Not a account <Link to={'/signup'}>Sign Up</Link></p>

        </div>

    );
};

export default Login;