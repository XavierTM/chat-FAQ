
import reducer from "./reducer";
import { createStore } from 'redux';


const initialState = {
   currentRoute: '/',
}

const store = createStore(
   reducer,
   initialState
);

export default store;