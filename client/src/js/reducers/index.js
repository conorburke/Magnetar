import { combineReducers } from 'redux';

import toolsReducer from './toolsReducer';

export default combineReducers({
	tools: toolsReducer
});
