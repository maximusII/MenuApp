import React from "react";
import styles from "./KeyButton.module.css";

function KeyButton({ singleRecipePage, getRecipes, handleModalClick }) {
  return (
    <>
      {singleRecipePage ? (
        <button className={styles.button} onClick={getRecipes}>
          To main page
        </button>
      ) : (
        <button
          name="addBtn"
          className={styles.button}
          onClick={handleModalClick}
        >
          Add new recipe
        </button>
      )}
    </>
  );
}

export default KeyButton;
