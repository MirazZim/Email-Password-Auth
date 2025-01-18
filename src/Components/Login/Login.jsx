import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    //use ref function add kora hoisegi
    const emailRef = useRef();

    //Forget PAssword er handle ekhane hoise
    const handleForgetPassword = () => {
        console.log('get me a email password',emailRef.current.value)
        const email = emailRef.current.value;
        
        if (!email) {
            console.log('Please provide me a valid Email Address ')
        } else {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password Email sent Please check Your email Kindly')
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        setErrorMessage('');
        setSuccess(false);

        /* Major change only here that is signInWithEmailandPassword */
        signInWithEmailAndPassword(auth, email, password)
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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            {/* Ekhane ref use kora hoise karon email ref newa hoise  */}
                            <input ref={emailRef} type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password"
                                placeholder="password" className="input input-bordered" required />
                            
                            {/* EKhane Handle Function ta call kora hoise */}

                            <label onClick={handleForgetPassword}
                             className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>

                        {/* Display Error Message */}
                        {
                            errorMessage && <p className="text-red-300">{errorMessage}</p>
                        }
                        {
                            success && <p className="text-green-600">Log In is Successful.</p>
                        }

                        <p>New to This website? Please <Link to ="/signUp"><a href="#" className="text-xl text-blue-300 label-text-alt link link-hover">Sign Up</a></Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;