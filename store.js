import { configureStore, createSlice } from '@reduxjs/toolkit';

const interactionSlice = createSlice({
  name: 'interaction',
  initialState: {
    hcpName: '',
    interactionType: 'Meeting',
    date: '',
    sentiment: 'Neutral',
    topics: '',
    chatHistory: [],
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    populateFromAI: (state, action) => {
      // Auto-fill form from LangGraph structured data extraction
      return { ...state, ...action.payload };
    }
  },
});

export const { updateField, addChatMessage, populateFromAI } = interactionSlice.actions;

export const store = configureStore({
  reducer: {
    interaction: interactionSlice.reducer,
  },
});