import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.init";
import { useState } from "react";

const SignUp = () => {
    const [errorMessage , setErrorMessage] = useState('');

    const handleSignUp = (e) => {
        //For Removing the reload function
        e.preventDefault();

        // Display in the Dom that my data are going
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log('Email : ', email)
        console.log('Password : ', password)

        //Reset error and status
        setErrorMessage('');

        //Firebase Setup

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)

            })
            .catch(error => {
                console.log('ERROR', error.message)
                setErrorMessage(error.message)

            })


    }



    return (
        
                
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                    <h3 className="text-3xl ml-9 font-bold">Sign Up Now</h3>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>

                    {
                        errorMessage && <p className="text-red-300">{errorMessage}</p>
                    }

                </div>
       
        
    );
};

export default SignUp;