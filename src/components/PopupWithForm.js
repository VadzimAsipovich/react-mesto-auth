import React from "react";

class PopupWithForm extends React.Component {
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
        <form
          className="form flex-column"
          id={`${this.props.name}-form`}
          name={this.props.name}
          noValidate
        >
          <h2 className="form__header">{this.props.title}</h2>
          {this.props.children}

          <button
            type="submit"
            className="form__save-btn button"
            name="save"
            onClick={this.handleSubmit}
          >
            {this.props.buttonText}
          </button>
        </form>

        <span className="popup__overlay"></span>
      </div>
    );
  }
}

export default PopupWithForm;
