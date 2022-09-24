import logo from "../images/logo.svg";
import { useLocation, Link, useHistory } from 'react-router-dom';
import React from "react";

function Header(props) {
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    props.handleLoginState(false);
    history.push('/sign-in');
  }
  const location = useLocation();
  let link;
  if (location.pathname == "/") {
    link = <div className="flex-row">
      <p className="header__email">{props.email}</p>
      <button className="header__link" onClick={signOut}>Выйти</button>
    </div>
  } else if (location.pathname == "/sign-up") {
    link = <Link className="header__link" to="/sign-in">Войти</Link>;
  } else if (location.pathname == "/sign-in") {
    link = <Link className="header__link" to="/sign-up">Регистрация</Link>;
  }
  return (
    <header className="header flex-row">
      <a href="#">
        <img src={logo} alt="лого" className="header__logo" />
      </a>
      {link}
    </header>
  );
}

export default Header;
