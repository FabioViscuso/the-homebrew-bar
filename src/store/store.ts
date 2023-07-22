import { Cocktail } from '@/lib/types/CocktailObj';
import { create } from 'zustand';

interface CocktailsState {
    cocktails: Cocktail[]
    updateCocktails: (newCocktails: Cocktail[]) => void
}

const useCocktailsStore = create<CocktailsState>()(
    (set) => ({
        cocktails: [],
        updateCocktails: (newCocktails) => set({cocktails: newCocktails})
    })
)

export default useCocktailsStore