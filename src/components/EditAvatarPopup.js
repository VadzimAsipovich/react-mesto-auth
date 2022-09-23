import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const urlValueRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: urlValueRef.current.value,
    });
    urlValueRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="url-input-avatar"
        placeholder="URL"
        className="form__text form__text_type_name"
        name="avatar"
        minLength="2"
        ref={urlValueRef}
        required
      />
      <span className="url-input-avatar-error form__input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
