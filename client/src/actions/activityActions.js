import axios from 'axios';
import { FETCH_USER_PAGE, FETCH_ACTIVITIES, CLEAR_ACTIVITIES } from './types';

export const addActivity = (values, history, userName) => async dispatch => {
  const res = await axios.post('/api/activity/new', values);
  history.push(`/users/${userName}`);
  dispatch({ type: FETCH_USER_PAGE, payload: res.data });
};

export const fetchActivities = id => async dispatch => {
  const res = await axios.get(`/api/activities/${id}`);
  dispatch({ type: FETCH_ACTIVITIES, payload: res.data });
};

export const deleteActivity = id => async dispatch => {
  const res = await axios.delete(`/api/activity/${id}`);
  dispatch({ type: FETCH_USER_PAGE, payload: res.data });
};

export const modifyActivity = (
  id,
  values,
  history,
  userName
) => async dispatch => {
  const res = await axios.patch(`/api/activity/${id}`, values);
  history.push(`/users/${userName}`);
  dispatch({ type: FETCH_USER_PAGE, payload: res.data });
};

export const clearActivities = () => dispatch => {
  dispatch({ type: CLEAR_ACTIVITIES });
};
