import { logInRoutine, logOutRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';
import sessions from '../api/sessions';
import history from '../history';

export const logIn = getThunkActionCreator (
    logInRoutine, async (formValues) => {
    const response = await sessions.post('/sessions', { username: formValues.email, password: formValues.password, session: history.location });
    localStorage.setItem('token', response.data.session.access_token);
    history.push('/');
});

export const logOut = getThunkActionCreator ( 
    logOutRoutine, async (token) => {
    await sessions.delete(`/sessions?access_token=${token}`);
    localStorage.removeItem('token');
    history.push('/signin');
});