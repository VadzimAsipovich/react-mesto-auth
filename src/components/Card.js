import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class Card extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.onClick(this.props.card);
  };

  handleLikeClick = (e) => {
    e.stopPropagation();
    this.props.onCardLike(this.props.card);
  };

  handleDeleteClick = (e) => {
    e.stopPropagation();
    this.props.onCardDelete(this.props.card);
  };

  render() {
    const isOwn = this.props.card.owner._id === this.context._id;
    const cardDeleteButtonClassName = `button element__trash ${
      isOwn ? "" : "element__trash_hidden"
    }`;
    const isLiked = this.props.card.likes.some(
      (i) => i._id === this.context._id
    );
    const cardLikeButtonClassName = `button element__button ${
      isLiked ? "element__button_active" : ""
    }`;
    return (
      <div
        className="elements__element element"
        id={this.props.card._id}
        onClick={this.handleClick}
      >
        <img
          className="element__image"
          src={this.props.card.link}
          alt={this.props.card.name}
        />
        <button
          className={cardDeleteButtonClassName}
          onClick={this.handleDeleteClick}
          type="button"
        ></button>
        <div className="element__info flex-row">
          <h2 className="element__title text-overflow-prevent">
            {this.props.card.name}
          </h2>
          <div className="flex-column">
            <button
              className={cardLikeButtonClassName}
              onClick={this.handleLikeClick}
              type="button"
            ></button>
            <p className="element__likes">{this.props.card.likes.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
