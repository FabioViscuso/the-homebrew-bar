import { Cocktail } from "../types/CocktailObj";

export const saveToLocal = (cocktails: Cocktail[]) => {
  localStorage.removeItem("lastSearch");
  localStorage.setItem("lastSearch", JSON.stringify(cocktails));
};
