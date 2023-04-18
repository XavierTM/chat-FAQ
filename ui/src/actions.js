
import { ACTIONS } from "./constants";
import store from "./store";



function setCurrentRoute(route) {

   const action = {
      type: ACTIONS.SET_CURRENT_ROUTE,
      payload:  { route }
   }

   store.dispatch(action);

}



const actions = {
   setCurrentRoute,
}


export default actions;