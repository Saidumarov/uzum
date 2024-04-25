import { create } from "zustand";

const useCardStore = create((set) => ({
  cards: JSON.parse(localStorage.getItem("cards")) || [],
  loading: true,
  error: "",

  addCard: (newCard) => {
    const newCardObj = {
      ...newCard,
      count: 1,
    };
    set((state) => {
      const cardExists = state.cards.some((card) => card._id === newCard._id);
      if (!cardExists) {
        const updatedCards = [...state.cards, newCardObj];
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        return { cards: updatedCards };
      }
      return state;
    });
  },

  removeCard: (cardId) => {
    set((state) => {
      const updatedCards = state.cards.filter((el) => el._id !== cardId);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return { cards: updatedCards };
    });
  },

  updateCard: (updatedCard) => {
    console.log(updatedCard);
    set((state) => {
      const updatedCards = state.cards.map((card) =>
        card._id === updatedCard._id ? updatedCard : card
      );
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return { cards: updatedCards };
    });
  },

  setError: (errorMessage) => set({ error: errorMessage }),

  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useCardStore;
