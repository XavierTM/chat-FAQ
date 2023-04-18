import { ACTIONS } from "./constants";

function setCurrentRouteReducer(state, payload) {
   const { route:currentRoute } = payload;
   return { ...state, currentRoute };
}







function reducer(state, action) {

   const { type, payload } = action;

   switch (type) {

      case ACTIONS.SET_CURRENT_ROUTE:
         return setCurrentRouteReducer(state, payload);


      default:
         console.info('Invalid action type:', type);
         return state;
   }
}


export default reducer;