import React from "react";

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClass() {
    let stateClass = "";
    if (this.props.card._id) {
      stateClass = "animation";
    } else {
      stateClass = "animation_hide";
    }
    return stateClass;
  }

  render() {
    return (
      <div
        className={`popup popup_type_image flex-column ${this.handleClass()}`}
      >
        <div className="popup__container">
          <button
            onClick={this.props.onClose}
            className="button popup__close-btn popup__close-btn_type_image"
            type="button"
          ></button>
          <img
            className="popup__image"
            src={this.props.card.link}
            alt={this.props.card.name}
          />
          <h2 className="popup__text">{this.props.card.name}</h2>
        </div>
        <span className="popup__overlay"></span>
      </div>
    );
  }
}

export default ImagePopup;
