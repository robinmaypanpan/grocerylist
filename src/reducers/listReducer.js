export default function listReducer(state = [], action) {
    switch (action.type) {
      case "UPDATE_LIST":
        return {
            list: action.payload
        };
      default:
        return state;
    }
  };