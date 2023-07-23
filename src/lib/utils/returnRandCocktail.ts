export const returnRandomCocktail = async () => {
    const data = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const jsonData = await data.json();
    const incomingRandomCocktail = jsonData.drinks;
    
    return incomingRandomCocktail;
  };