import React from "react";
import successImage from "../images/success.svg";
import failureImage from "../images/failure.svg";

class InfoTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClass() {
    let stateClass = "";
    if (this.props.isOpen === true) {
      stateClass = "animation";
    } else {
      if (this.props.isOpen === false) {
        stateClass = "animation_hide";
      } else this.stateClass = "";
    }
    return stateClass;
  }

  handleSubmit = (e) => {
    this.props.onSubmit(e);
  };

  render() {
    return (
      <div
        className={`popup flex-column popup_type_form ${this.handleClass()}`}
        id={`${this.props.name}_form`}
      >
        <button
          onClick={this.props.onClose}
          className="button popup__close-btn popup__close-btn_type_form"
          type="button"
        />
        <div className="info-tooltip flex-column">
          <img
            className="info-tooltip__image"
            src={
              this.props.isRegistrationSuccessful ? successImage : failureImage
            }
            alt="статус регистрации"
          />
          <h2 className="info-tooltip__header">
            {this.props.isRegistrationSuccessful
              ? "Вы успешно зарегистрировались!"
              : this.props.errorMessage}
          </h2>
        </div>

        <span className="popup__overlay"></span>
      </div>
    );
  }
}

export default InfoTooltip;
