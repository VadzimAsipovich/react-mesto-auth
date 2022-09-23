import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import apiInstance from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: "",
      isAddPlacePopupOpen: "",
      isEditAvatarPopupOpen: "",
      isEditInfoTooltipOpen: "",
      selectedCard: {},
      currentUser: 0,
      cards: [],
      loggedIn: false,
      email: "",
      isRegistrationSuccessful: false,
    };
  }

  handleRegistrationState = (state) => {
      this.setState({isRegistrationSuccessful: state});
  }

  componentDidMount = () => {
    apiInstance
      .getUser()
      .then((userData) => {
        this.setState({ currentUser: userData });
      })
      .catch((e) => console.log(e));
    apiInstance
      .getInitialCards()
      .then((cards) => {
        this.setState({ cards: cards });
      })
      .catch((e) => console.log(e));
    this.tokenCheck();
    console.log(this.state.email);
  };

  handleEditAvatarClick = (e) => {
    this.setState({ isEditAvatarPopupOpen: true });
    e.preventDefault();
  };

  handleEditProfileClick = (e) => {
    this.setState({ isEditProfilePopupOpen: true });
    e.preventDefault();
  };

  handleAddPlaceClick = (e) => {
    this.setState({ isAddPlacePopupOpen: true });
    e.preventDefault();
  };

  openInfoTooltip = () => {
    this.setState({ isEditInfoTooltipOpen: true });
  };

  closeAllPopups = () => {
    this.setState({ isEditAvatarPopupOpen: false });
    this.setState({ isEditProfilePopupOpen: false });
    this.setState({ isAddPlacePopupOpen: false });
    this.setState({ isEditInfoTooltipOpen: false });
    this.setState({ selectedCard: {} });
  };

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  handleUpdateUser = ({ name, about }) => {
    apiInstance
      .updateUser(name, about)
      .then((userData) => {
        this.setState({ currentUser: userData });
      })
      .catch((e) => console.log(e));
    this.closeAllPopups();
  };

  handleUpdateAvatar = ({ avatar }) => {
    apiInstance
      .updateAvatar(avatar)
      .then((userData) => {
        this.setState({ currentUser: userData });
      })
      .catch((e) => console.log(e));
    this.closeAllPopups();
  };

  handleUpdatePlace = ({ name, link }) => {
    apiInstance
      .addNewCard(name, link)
      .then((newCard) => {
        this.setState({ cards: [newCard, ...this.state.cards] });
      })
      .catch((e) => console.log(e));
    this.closeAllPopups();
  };

  setCards = (func) => {
    const newCards = func(this.state.cards);
    this.setState({ cards: newCards });
  };

  handleCardLike = (card) => {
    const isLiked = card.likes.some(
      (i) => i._id === this.state.currentUser._id
    );

    if (isLiked) {
      apiInstance.removeLike(card._id).then((newCard) => {
        this.setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        ).catch((e) => console.log(e));
      });
    } else {
      apiInstance.addLike(card._id).then((newCard) => {
        this.setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        ).catch((e) => console.log(e));
      });
    }
  };

  handleCardDelete = (card) => {
    apiInstance
      .deleteCard(card._id)
      .then(() => {
        this.setCards((state) => {
          const index = state.indexOf(card);
          if (index > -1) {
            state.splice(index, 1);
          }
          return state;
        });
      })
      .catch((e) => console.log(e));
  };

  tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        console.log(res);
        if (res) {
          this.setState(
            {
              loggedIn: true,
              email: res.data["email"]
            },
            () => {
              this.props.history.push("/");
            }
          );
        }
      });
    }
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="App">
          <div className="page flex-column">
            <Header email={this.state.email}/>
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={this.state.loggedIn}
                component={Main}
                onEditAvatar={this.handleEditAvatarClick}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onCardClick={this.handleCardClick}
                cards={this.state.cards}
                onCardLike={this.handleCardLike}
                onCardDelete={this.handleCardDelete}
              />
              <Route path="/sign-up">
                <Register
                  isRegistrationSuccessful={this.state.isRegistrationSuccessful}
                  onRegistrationAttempt={this.openInfoTooltip}
                  handleRegistrationState={this.handleRegistrationState}
                />
              </Route>
              <Route path="/sign-in">
                <Login loggedIn={this.state.loggedIn} />
              </Route>
            </Switch>
            <Footer />
            <EditProfilePopup
              isOpen={this.state.isEditProfilePopupOpen}
              onClose={this.closeAllPopups}
              onUpdateUser={this.handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={this.state.isEditAvatarPopupOpen}
              onClose={this.closeAllPopups}
              onUpdateAvatar={this.handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={this.state.isAddPlacePopupOpen}
              onClose={this.closeAllPopups}
              onUpdatePlace={this.handleUpdatePlace}
            />
            <ImagePopup
              card={this.state.selectedCard}
              onClose={this.closeAllPopups}
            />
            <InfoTooltip
              isOpen={this.state.isEditInfoTooltipOpen}
              onClose={this.closeAllPopups}
              isRegistrationSuccessful={this.state.isRegistrationSuccessful}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default withRouter(App);
