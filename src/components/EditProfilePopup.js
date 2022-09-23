import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function valueNameHandleChange(e) {
    setName(e.target.value);
  }

  function valueDescriptionHandleChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      valueDescription={description}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        placeholder="Имя"
        className="form__text form__text_type_name"
        name="name"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={valueNameHandleChange}
        required
      />
      <span className="name-input-error form__input-error"></span>
      <input
        type="text"
        id="title-input"
        placeholder="Должность"
        className="form__text form__text_type_title"
        name="title"
        minLength="2"
        maxLength="200"
        value={description || " "}
        onChange={valueDescriptionHandleChange}
        required
      />
      <span className="title-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
