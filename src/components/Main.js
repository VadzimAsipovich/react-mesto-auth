import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: "",
      isAddPlacePopupOpen: "",
      isEditAvatarPopupOpen: "",
      userName: "Загружается...",
      userDescription: "Загружается...",
      userAvatar: "Загружается...",
    };
  }

  render() {
    return (
      <main className="main">
        <div className="profile flex-row">
          <div className="profile__container">
            <img
              src={this.context.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <span
              onClick={this.props.onEditAvatar}
              className="profile__overlay"
            ></span>
          </div>
          <div className="profile__text flex-column">
            <div className="profile__info flex-row">
              <h1 className="profile__name text-overflow-prevent">
                {this.context.name}
              </h1>
              <button
                onClick={this.props.onEditProfile}
                className="edit-button profile__edit-button button"
                type="button"
              ></button>
            </div>
            <p className="profile__title text-overflow-prevent">
              {this.context.about}
            </p>
          </div>
          <button
            onClick={this.props.onAddPlace}
            className="button add-button profile__add-button"
            type="button"
          ></button>
        </div>
        <div className="elements main__elements">
          {this.props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onClick={this.props.onCardClick}
              onCardLike={this.props.onCardLike}
              onCardDelete={this.props.onCardDelete}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default Main;
