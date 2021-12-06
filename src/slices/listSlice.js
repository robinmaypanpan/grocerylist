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
          // Process the returned list of categories to also have a list of items
          const categoryItemArrays = newList.categories.map((category) => {
            return category.items.map((item) => {
              // Add the category id to the items.
              return {
                ...item,
                categoryId: category.id
              };
            });
          });
          const items = Array.prototype.concat(...categoryItemArrays);

          newList.items = items;
          state.value = newList;
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateList } = listSlice.actions

export default listSlice.reducer