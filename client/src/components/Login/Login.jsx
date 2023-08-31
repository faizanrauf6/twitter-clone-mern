import React, { useState, useEffect } from "react";
import backdrop from "../../assets/backdrop4.jpg";
import "./Login.css";
import Spinner from "../../elements/Spinner/Spinner";
import validate from "../../helpers/inputValidator";
import { actionTypes } from "../../contexts/StateReducers";
import { useStateValue } from "../../contexts/StateContextProvider";
import request from "../../utils/request";
import { api } from "../../constants";
import { toast } from "react-toastify";

const Login = () => {
  const [auth, setAuth] = useState(false); // a state to change auth mode
  const initialSignup = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const initialLogin = {
    email: "",
    password: "",
  };
  const [{ user }, dispatch] = useStateValue();
  const [signupState, setSignupState] = useState(initialSignup);
  const [loginState, setLoginState] = useState(initialLogin);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isSigning, setIsSigning] = useState(false);

  const cleanupState = () => {
    setIsSigning(false);
    setSignupState(initialSignup);
    setLoginState(initialLogin);
    setError("");
    setLoading(false);
  };

  const toggleAuth = () => {
    setAuth((auth) => !auth);
    cleanupState();
  };

  const auths = (user, token) => {
    try {
      user.password = undefined;
      localStorage.setItem("token", JSON.stringify(token));

      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginState;
    const loginError = validate({ email, password }, "login");

    if (loginError) {
      setError(loginError);
    } else {
      setLoading(true);
      try {
        const response = await request.post(api.auth.login, {
          email,
          password,
        });

        if (!response?.data?.statusCode) {
          setError(response?.data?.statusCode || "Something went wrong!");
        } else {
          auths(response?.data?.data, response?.data?.token);
          toast.success(response?.data?.message || "Signin successful");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const preSignup = (e) => {
    e.preventDefault();
    setIsSigning(true);
    setError(validate(signupState, "signup"));
  };

  useEffect(() => {
    const signup = async () => {
      const { name, username, email, password } = signupState;

      if (isSigning && !error.length) {
        setLoading(true);
        try {
          const response = await request.post(api.auth.signup, {
            fullName: name,
            username,
            email,
            password,
          });

          toggleAuth();
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };

    signup();
  }, [isSigning, error]);

  return (
    <section className='login__section'>
      <div className={`login__container ${auth ? "active" : ""}`}>
        <div className='user signinBc'>
          <div className='imgBc'>
            <img src={backdrop} alt='backdrop' />
          </div>
          <div className='formBc'>
            <form autoComplete='off' onSubmit={onSubmitLogin}>
              <h2>Log In</h2>
              <input type='email' name='email' placeholder='Email' value={loginState.email} onChange={(e) => setLoginState({ ...loginState, email: e.target.value })} />
              <input type='password' name='password' placeholder='Password' value={loginState.password} onChange={(e) => setLoginState({ ...loginState, password: e.target.value })} />
              <button type='submit' className='button'>
                {loading ? <Spinner /> : "Log in"}
              </button>
              {error.length > 0 && <div className='error'>{error}</div>}
              <p className='signup'>
                Don't have an account? <span onClick={toggleAuth}>Sign up</span>
              </p>
            </form>
          </div>
        </div>
        <div className='user signupBc'>
          <div className='formBc'>
            <form autoComplete='off' onSubmit={preSignup}>
              <h2>Create an Account</h2>
              <input type='text' name='name' placeholder='Full Name' value={signupState.name} onChange={(e) => setSignupState({ ...signupState, name: e.target.value })} />
              <input type='text' name='username' placeholder='Username' value={signupState.username} onChange={(e) => setSignupState({ ...signupState, username: e.target.value })} />
              <input type='text' name='email' placeholder='Email' value={signupState.email} onChange={(e) => setSignupState({ ...signupState, email: e.target.value })} />
              <input type='password' name='password' placeholder='Create Password' value={signupState.password} onChange={(e) => setSignupState({ ...signupState, password: e.target.value })} />
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={signupState.confirmPassword}
                onChange={(e) =>
                  setSignupState({
                    ...signupState,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {error.length > 0 && <div className='error'>{error}</div>}
              <button type='submit' className='button'>
                {loading ? <Spinner /> : "Sign up"}
              </button>
              <p className='signup'>
                have an account? <span onClick={toggleAuth}>Log in</span>
              </p>
            </form>
          </div>
          <div className='imgBc'>
            <img src={backdrop} alt='backdrop' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
