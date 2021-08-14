export const SET_RATINGS = 'GET_RATINGS'
const USER_RATINGS = 'writemein/userdata/ratings'


export const refreshRatings = () => async(dispatch, getState) => {
        const ratings = JSON.parse(localStorage.getItem(USER_RATINGS))
        dispatch({ type: SET_RATINGS, ratings})
}
