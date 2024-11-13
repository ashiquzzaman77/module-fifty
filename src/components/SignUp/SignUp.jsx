
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { createUserWithEmailAndPassword,sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase.init';

const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSingUp = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;

        console.log('Email:', email);
        console.log('Password:', password);

        setErrorMessage('');
        setSuccess(false);

        if (password.length < 6) {
            setErrorMessage('Password Lenght minnimum 6 Char');
            return;
        }


        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At Password Uppercase & Lowercase');
            return;
        }

        if (!terms) {
            setErrorMessage('Fill Up terms');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

                console.log(result.user);
                setSuccess(true);

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Email Sent Verfication')
                    });
            })

            .catch((error) => {

                console.log(error.message);
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

                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-12 pt-1'>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name='terms' className="checkbox me-3" />
                        <span className="label-text">Remember me</span>
                    </label>
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