import React from "react";
import * as auth from '../utils/auth.js';
import { useHistory } from "react-router-dom";

function Login(loggedIn) {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function valueEmailHandleChange(e) {
    setEmail(e.target.value);
  }

  function valuePasswordHandleChange(e) {
    setPassword(e.target.value);
  }

  function onLogin(e) {
    e.preventDefault();
    auth.authorize(email, password).then((res) => {
      console.log(res); 
      if(res.token){
        localStorage.setItem('jwt', res.token);
        loggedIn = true;
        history.push("/");
      }
    })
  }

  return (
    <form className="flex-column auth-form" noValidate>
      <h2 className="auth-form__header">Вход</h2>
      <input value={email} className="auth-form__input" onChange={valueEmailHandleChange} type="email" placeholder="Email"></input>
      <input value={password} className="auth-form__input" onChange={valuePasswordHandleChange} placeholder="Пароль"></input>
      <button type="submit" className="button auth-form__button" name="save" onClick={onLogin}>
        Войти
      </button>
    </form>
  );
}

export default Login;
