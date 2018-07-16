import axios from 'axios';

import { FILTER_TOOLS, FETCH_TOOLS } from './types';
import { toolsQuery } from './queries';

export const fetchTools = () => {
	return function(dispatch) {
		axios
			.post('/oracle', { query: toolsQuery })
			.then(res => dispatch({ type: FETCH_TOOLS, payload: res.data }));
	};
};

export const filterTools = text => {
	return { type: FILTER_TOOLS, payload: text };
};
