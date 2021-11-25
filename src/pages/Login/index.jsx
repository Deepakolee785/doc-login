import { useState } from "react";
import { Navigate } from "react-router-dom";

import Logo from "../../assests/svg/Logo";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../context/auth";
import { validateEmail } from "../../validation";

import style from "./style.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const {
    state: { isLoggingIn, error, isLoggedIn },
    login,
  } = useAuth();

  const validate = () => {
    let validationError = {};
    if (credentials?.email) {
      if (!validateEmail(credentials?.email)) {
        validationError.email = "Please enter valid email address.";
      }
    } else {
      validationError.email = "Please enter your email address.";
    }
    if (!credentials?.password)
      validationError.password = "Please enter your password.";
    return validationError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErros = validate();
    setErrors(validationErros);
    if (Object.keys(validationErros).length === 0) {
      login(credentials);
    }
  };

  const handleChange = (e) => {
    e.persist();
    const key = e.target.name;
    const value = e.target.value;
    if (!!errors[key] && !!value) {
      const tempErrors = { ...errors };
      delete tempErrors[key];
      setErrors(tempErrors);
    }
    setCredentials({ ...credentials, [key]: value });
  };

  if (isLoggedIn) return <Navigate replace to="/home" />;

  return (
    <main className={style.container}>
      <div className={style.loginContainer}>
        <div className={style.logoContainer}>
          <Logo classes={style.logo} />
        </div>
        <form onSubmit={handleSubmit} className={style.formContainer}>
          <h3 className={style.heading}>Login to Docsumo</h3>
          <Input
            type="text"
            name="email"
            placeholder="Work Email"
            value={credentials.email}
            onChange={handleChange}
            error={errors?.email}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            error={errors?.password}
          />
          {error && <p className="error text-center">{error}</p>}
          <div className={style.loginBtn}>
            <Button type="submit" loading={isLoggingIn} block>
              LOGIN
            </Button>
          </div>
          <div className={style.footer}>
            <p>Don't have an account?</p>
            <Button variant="outlined">Sign up</Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
