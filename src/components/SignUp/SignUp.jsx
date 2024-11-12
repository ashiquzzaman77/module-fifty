
import React, { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.init';

const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSingUp = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log('Email:', email);
        console.log('Password:', password);

        setErrorMessage('');
        setSuccess(false);

        if (password.length < 6) {
            setErrorMessage('Password Lenght minnimum 6 Char');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

                console.log(result.user);
                setSuccess(true)
            })
            .catch((error) => {

                console.error(error.message);
                setErrorMessage(error.message);
                setSuccess(false)
            });
    }

    return (
        <div className="card bg-base-100 w-full max-w-lg shrink-0 mx-auto">

            <form onSubmit={handleSingUp} className="card-body">

                <h1 className='text-2xl'>Sign Up</h1>

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

                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>

                {
                    errorMessage && <p className='text-red-600'>{errorMessage}</p>

                }
                {
                    success && <p className='text-success'>User Register Create Successfully</p>
                }

            </form>
        </div>
    );
};

export default SignUp;