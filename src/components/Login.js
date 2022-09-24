import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function valueEmailHandleChange(e) {
    setEmail(e.target.value);
  }

  function valuePasswordHandleChange(e) {
    setPassword(e.target.value);
  }

  function onLogin(e) {
    props.onLogin(e,email,password,props.handleLoginState);
  }

  return (
    <form className="flex-column auth-form">
      <h2 className="auth-form__header">Вход</h2>
      <input value={email} className="auth-form__input" onChange={valueEmailHandleChange} type="email" placeholder="Email"></input>
      <input value={password} className="auth-form__input" onChange={valuePasswordHandleChange} type="password" placeholder="Пароль"></input>
      <button type="submit" className="button auth-form__button" name="save" onClick={onLogin}>
        Войти
      </button>
    </form>
  );
}

export default Login;
