import React from "react";
import Recipe from "./Recipe/Recipe";
import styles from "./Recipes.module.css";

function Recipes({
  recipes,
  getRecipes,
  getSingleRecipe,
  singleRecipePage,
  handleModalClick,
  btnNameAndId,
  setRecipes
}) {
  return (
    <>
      <ul className={styles.list}>
        {recipes && recipes.length > 0 ? (
          recipes
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(recipe => (
              <Recipe
                key={recipe._id}
                recipe={recipe}
                handleModalClick={handleModalClick}
                getRecipes={getRecipes}
                getSingleRecipe={getSingleRecipe}
                singleRecipePage={singleRecipePage}
                btnNameAndId={btnNameAndId}
                setRecipes={setRecipes}
              />
            ))
        ) : (
          <p>No recipes found</p>
        )}
      </ul>
    </>
  );
}

export default Recipes;
