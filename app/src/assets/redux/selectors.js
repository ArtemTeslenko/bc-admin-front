const selectUser = (state) => state.auth.user;

const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

const selectIsgettingCurrent = (state) => state.auth.isGettingCurrent;

const selectAuthError = (state) => state.auth.error;

export {
  selectUser,
  selectIsLoggedIn,
  selectIsgettingCurrent,
  selectAuthError,
};
