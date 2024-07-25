import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const initialValues = { email: '', password: '', confirmPassword: '' };

export default function Register() {
    const [error, setError] = useState('')
    const register = useRegister();
    const navigate = useNavigate();
    const { values, changeHandler, submitHandler } = useForm(
        initialValues,
        async ({ email, password, confirmPassword }) => {
            if (password !== confirmPassword) {
                setError('Passwords dont match')
                return;
            }
            try {
                await register(email, password);
                navigate('/')
            } catch (err) {
                setError(err.message)
                console.log(err.message)
            }
        }
    );
    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={submitHandler} >
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        placeholder="maria@email.com"
                        onChange={changeHandler}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        id="register-password"
                        onChange={changeHandler}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        value={values.confirmPassword}
                        onChange={changeHandler}
                    />

                    <input className="btn submit" type="submit" value="Register" />
                    {error &&
                        <p>
                            <span style={ {fontSize: "18px" , color: "red"}} >{error}</span>
                        </p>}
                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
}