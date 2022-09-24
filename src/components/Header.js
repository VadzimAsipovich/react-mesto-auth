import logo from "../images/logo.svg";
import { Link, useHistory, Switch, Route} from "react-router-dom";
import React from "react";

function Header(props) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    props.handleLoginState(false);
    history.push("/sign-in");
  }

  return (
    <header className="header flex-row">
      <a href="#">
        <img src={logo} alt="лого" className="header__logo" />
      </a>
      <Switch>
        <Route exact path={"/"}>
          <div className="flex-row">
            <p className="header__email">{props.email}</p>
            <button className="header__link" onClick={signOut}>
              Выйти
            </button>
          </div>
        </Route>
        <Route path={"/sign-up"}>
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path={"/sign-in"}>
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
