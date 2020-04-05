import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import * as services from "../../services/fetcher";

function Modal({
  isModalOpen,
  handleModalClick,
  btnNameAndId,
  getSingleRecipe,
  recipes,
  getRecipes
}) {
  let title;
  let body;

  if (btnNameAndId.name === "editBtn" && recipes.length > 0) {
    title = recipes.find(el => el._id === btnNameAndId.id).name;
    body = recipes.find(el => el._id === btnNameAndId.id).description;
  }

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    setNewRecipe({ title, body });
  }, [title, body]);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, body } = newRecipe;

    if (!title || !body) {
      return setNewRecipe({ title: title || "", body: body || "" });
    }

    if (btnNameAndId.name === "editBtn") {
      services.updRecipe(btnNameAndId.id, title, body);
      getSingleRecipe(btnNameAndId.id);
      handleModalClick();
      setNewRecipe({ title, body });
    } else {
      services.addRecipe(title, body);
      setNewRecipe({ title: "", body: "" });
      handleModalClick();
      getRecipes();
    }
  }

  function handleChange(e) {
    if (e.target.name === "title") {
      setNewRecipe({ title: e.target.value, body: newRecipe.body });
    } else if (e.target.name === "body") {
      setNewRecipe({ title: newRecipe.title, body: e.target.value });
    }
  }

  return (
    <div>
      {isModalOpen ? (
        <div className={styles.modal}>
          <form className={styles.modal__form} onSubmit={handleSubmit}>
            <span
              className={styles.modal__form_close}
              onClick={handleModalClick}
            ></span>
            <input
              type="text"
              name="title"
              className={styles.modal__title}
              placeholder="Title"
              value={newRecipe.title || ""}
              onChange={handleChange}
              autoComplete="off"
            ></input>
            <textarea
              type="text"
              name="body"
              cols="40"
              rows="5"
              className={styles.modal__body}
              placeholder="Recipe"
              value={newRecipe.body || ""}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className={styles.modal__button}>
              Send
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
