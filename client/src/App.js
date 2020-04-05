import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import * as services from "./services/fetcher";
import Recipes from "./components/Recipes/Recipes";
import Modal from "./components/Modal/Modal";
import Header from "./components/Header/Header";
import KeyButton from "./components/KeyButton/KeyButton";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [modal, setModal] = useState(false);
  const [nameAndId, setNameAndId] = useState({ name: "", id: "" });
  const [singleRecipePage, setSingleRecipePage] = useState(false);

  useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    let res = await services.getAllRecipes();
    setRecipes(res);
    setSingleRecipePage(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function getSingleRecipe(id) {
    let res = await services.getRecipe(id);
    setRecipes(res);
    setSingleRecipePage(true);
  }

  function handleLogoClick() {
    getRecipes();
  }

  function handleModalClick(e) {
    if (typeof e === "object") {
      btnNameAndId({ name: e.target.name, id: "" });
    }
    if (nameAndId.name === "editBtn") {
      getSingleRecipe(nameAndId.id);
    }
    setModal(!modal);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function btnNameAndId({ name, id }) {
    setNameAndId({ name, id });
  }

  return (
    <div className={styles.App}>
      <Header handleLogoClick={handleLogoClick} />
      <KeyButton
        singleRecipePage={singleRecipePage}
        getRecipes={getRecipes}
        handleModalClick={handleModalClick}
      />
      <Modal
        isModalOpen={modal}
        handleModalClick={handleModalClick}
        getSingleRecipe={getSingleRecipe}
        btnNameAndId={nameAndId}
        recipes={recipes}
        getRecipes={getRecipes}
      />
      <Recipes
        recipes={recipes}
        getRecipes={getRecipes}
        getSingleRecipe={getSingleRecipe}
        handleModalClick={handleModalClick}
        btnNameAndId={btnNameAndId}
        singleRecipePage={singleRecipePage}
        setRecipes={setRecipes}
      />
    </div>
  );
}

export default App;
