import React from "react";
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import { useHistory } from "react-router-dom";

function Register(props) {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function valueEmailHandleChange(e) {
    setEmail(e.target.value);
  }

  function valuePasswordHandleChange(e) {
    setPassword(e.target.value);
  }
  
  function onRegister(e) {
    e.preventDefault();
    auth.register(email,password).then((res)=>{
      if(res){
        history.push("/sign-in");
        props.handleRegistrationState(true);
      } else {
        props.handleRegistrationState(false);
      }
      props.onRegistrationAttempt();
    })
  }

  return (
    <form className="flex-column auth-form" noValidate>
      <h2 className="auth-form__header">Регистрация</h2>
      <input value={email} className="auth-form__input" onChange={valueEmailHandleChange} type="email" placeholder="Email"></input>
      <input value={password} className="auth-form__input" onChange={valuePasswordHandleChange} placeholder="Пароль"></input>
      <button type="submit" className="button auth-form__button" name="save" onClick={onRegister}>
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="auth-form__link">Уже зарегистрированы? Войти</Link>
    </form>
  );
}

export default Register;
