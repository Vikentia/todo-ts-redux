import { legacy_createStore as createStore, combineReducers } from 'redux';
import { todoReducer } from './reducers/todoReducer';

//@ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

export const rootReducer = combineReducers({
    todo: todoReducer,
})

export type AppStateType = ReturnType<typeof store.getState>
type RootReducerType = typeof rootReducer
export type AppStoreType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, composeEnhancers());




