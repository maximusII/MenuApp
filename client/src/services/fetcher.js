import axios from "axios";

export const getAllRecipes = async () => {
  try {
    let res = await axios.get(`/recipe`);
    return res.data || [];
  } catch (error) {
    console.error(error);
  }
};

export const getRecipe = async id => {
  try {
    let res = await axios.get(`/recipe/${id}`);
    return [res.data] || [];
  } catch (error) {
    console.error(error);
  }
};

export const addRecipe = async (title, body) => {
  try {
    await axios.post(`/recipe`, {
      name: title,
      description: body
    });
  } catch (error) {
    console.error(error);
  }
};

export const delRecipe = async id => {
  try {
    await axios.delete(`/recipe/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const updRecipe = async (id, title, body) => {
  try {
    await axios.put(`/recipe/${id}`, {
      name: title,
      description: body
    });
  } catch (error) {
    console.error(error);
  }
};
