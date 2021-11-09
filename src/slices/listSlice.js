import { createSlice } from '@reduxjs/toolkit'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: null,
  },
  reducers: {
    updateList: (state, action) => {
        const newList = action.payload;
        if (!newList.error) {
          state.value = action.payload;
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateList } = listSlice.actions

export default listSlice.reducer