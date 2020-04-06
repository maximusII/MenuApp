import React, { useState } from "react";
import styles from "./Recipe.module.css";
import shortid from "shortid";
import * as services from "../../../services/fetcher";

function Recipe({
  recipe,
  getRecipes,
  getSingleRecipe,
  singleRecipePage,
  handleModalClick,
  btnNameAndId
}) {
  const [prevVers, setPrevVers] = useState(false);
  const [prevVersRecipes, setPrevVersRecipes] = useState([]);

  const { _id, name, date, description } = recipe;

  function formattedDate(date) {
    let getTheDate = new Date(date);
    let month = getTheDate.getMonth() + 1;
    let day = getTheDate.getDate();
    let year = getTheDate.getFullYear();
    let fullDate = day + "/" + month + "/" + year;
    return fullDate;
  }

  function handleDelClick(e) {
    btnNameAndId({ name: e.target.name, id: _id });
    services.delRecipe(_id);
    getRecipes();
  }

  function handleEditClick(e) {
    btnNameAndId({ name: e.currentTarget.name, id: _id });
    handleModalClick();
  }

  async function handlePrevClick(e) {
    btnNameAndId({ name: e.target.name, id: _id });

    let res = await services.getRecipe(_id);
    let prevRecipesArray = res[0].versions;
    if (prevRecipesArray.length !== 0) {
      setPrevVers(!prevVers);
      setPrevVersRecipes(prevRecipesArray);
    }
  }

  function backToLatestVer() {
    setPrevVers(!prevVers);
  }

  function handleSingleRecipeClick() {
    btnNameAndId({ name: "", id: _id });
    getSingleRecipe(_id);
    setPrevVers(false);
  }

  return (
    <>
      {prevVers && singleRecipePage ? (
        <div className={styles.container__prev}>
          <button className={styles.button__back} onClick={backToLatestVer}>
            To latest version
          </button>
          <h2 className={styles.versions__title}>
            Previous versions of {name}
          </h2>
          <ul className={styles.list}>
            {prevVersRecipes
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(recipe => (
                <li
                  key={recipe._id + shortid.generate()}
                  className={styles.recipe__prev}
                >
                  <div className={styles.bgFrame}></div>
                  <h2 className={styles.recipe__name__single}>{recipe.name}</h2>
                  <h3 className={styles.recipe__date}>
                    {formattedDate(recipe.date)}
                  </h3>
                  <p className={styles.recipe__description__prevVers}>
                    {recipe.description}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <li
          className={singleRecipePage ? styles.recipe__single : styles.recipe}
        >
          <div className={styles.bgFrame}></div>
          <h2
            className={
              singleRecipePage
                ? styles.recipe__name__single
                : styles.recipe__name
            }
          >
            {name}
          </h2>
          <h3 className={styles.recipe__date}>{formattedDate(date)}</h3>
          <p
            onClick={handleSingleRecipeClick}
            className={
              singleRecipePage
                ? styles.recipe__description__single
                : styles.recipe__description
            }
          >
            {description}
          </p>

          {singleRecipePage ? (
            <div className={styles.buttons}>
              <button
                className={styles.prevBtn}
                name="prevVers"
                onClick={handlePrevClick}
              >
                <i className="fa fa-history"></i>
              </button>
              <button
                className={styles.editBtn}
                name="editBtn"
                onClick={handleEditClick}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className={styles.delBtn}
                name="delBtn"
                onClick={handleDelClick}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          ) : null}
        </li>
      )}
    </>
  );
}

export default Recipe;
