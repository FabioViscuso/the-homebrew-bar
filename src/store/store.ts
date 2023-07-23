import { Cocktail } from '@/lib/types/CocktailObj';
import { create } from 'zustand';

interface CocktailsState {
    cocktails: Cocktail[],
    favoriteCocktails: Cocktail[],
    updateCocktails: (newCocktails: Cocktail[]) => void,
    addToFavorites: (toAdd: Cocktail) => void,
    removeFromFavorites: (toRemove: Cocktail) => void,
    clearAllFavorites: () => void,
}

const useCocktailsStore = create<CocktailsState>()(
    (set) => ({
        cocktails: [],
        favoriteCocktails: [],
        updateCocktails: (newCocktails) => set({cocktails: newCocktails}),
        addToFavorites: (toAdd) => set((state) => ({ favoriteCocktails: [...state.favoriteCocktails, toAdd]})),
        removeFromFavorites: (toRemove) => set((state) => ({ favoriteCocktails: state.favoriteCocktails.filter(cocktail => cocktail.idDrink !== toRemove.idDrink)})),
        clearAllFavorites: () => set({favoriteCocktails: []})
    })
)

export default useCocktailsStore