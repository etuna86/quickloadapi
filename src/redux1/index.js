import reducer1 from './reducer';
import { combineReducers } from 'redux'


const reducerCombined = combineReducers({
    reducer1,
});

export default reducerCombined;