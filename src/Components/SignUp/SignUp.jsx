import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.init";
import { useState } from "react";

const SignUp = () => {
    const [errorMessage , setErrorMessage] = useState('');
    const [success , setSuccess] = useState(false);

    const handleSignUp = (e) => {
        //For Removing the reload function
        e.preventDefault();

        // Display in the Dom that my data are going
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log('Email : ', email)
        console.log('Password : ', password)

        //password length Validation
        if(password.length < 6){
            setErrorMessage('Password should be 6 characters or Longer');
            return;
        }

        //Password Validations
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if(!passwordRegex.test(password)){
            setErrorMessage('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).');
            return;
        }

        //Reset error and status
        setErrorMessage('');
        setSuccess(false);

        //Firebase Setup

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true);

            })
            .catch(error => {
                console.log('ERROR', error.message)
                setErrorMessage(error.message)
                setSuccess(false);

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

                    {/* Display Error Message */}
                    {
                        errorMessage && <p className="text-red-300">{errorMessage}</p>
                    }

                    {/* Display Success Message */}
                    {
                        success && <p className="text-green-600">Sign up is Successful.</p>
                    }

                </div>
       
        
    );
};

export default SignUp;