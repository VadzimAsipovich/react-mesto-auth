import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function valuePlaceNameHandleChange(e) {
    setPlaceName(e.target.value);
  }

  function valuePlaceLinkHandleChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      name="location"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place-input"
        placeholder="Название"
        className="form__text form__text_type_name"
        name="name"
        value={placeName}
        minLength="2"
        maxLength="30"
        onChange={valuePlaceNameHandleChange}
        required
      />
      <span className="place-input-error form__input-error"></span>
      <input
        type="url"
        id="url-input"
        placeholder="Ссылка на картинку"
        className="form__text form__text_type_title"
        name="title"
        value={placeLink}
        onChange={valuePlaceLinkHandleChange}
        required
      />
      <span className="url-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
