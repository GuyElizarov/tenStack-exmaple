export const selectUser = (state) => state.user?.users || []
export const selectUserError = (state) => state.user?.error
export const selectIsLoadingUser = (state) => state.user?.loading
