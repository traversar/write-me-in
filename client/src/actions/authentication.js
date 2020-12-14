const TOKEN_KEY = 'writemein/authentication/token';
const USER_RATINGS = 'writemein/userdata/ratings'
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';


export const removeToken = () => ({
    type: REMOVE_TOKEN,
});

export const setToken = (token) => ({
    type: SET_TOKEN,
    token,
});

export const loadToken = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if(token) {
        dispatch(setToken(token));
    }
};

export const login = (email, password) => async dispatch => {
    const response = await fetch(`/api/users`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if(response.ok) {
        const { token, user } = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem(USER_RATINGS, JSON.stringify(user.ratings))
        dispatch(setToken(token));
        dispatch({ type: SET_USER_DATA, user })
    }
};

export const logout = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`/api/users`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${token}`}
    });

    if (response.ok) {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken());
    }
}

export const signup = (username, email, password, confirmPassword) => async dispatch => {
    const response = await fetch(`/api/users`, {
        method: 'post',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({ username, email, password, confirmPassword })
    });

    if(response.ok) {
        const { token } = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        dispatch(setToken(token));
    };
}
