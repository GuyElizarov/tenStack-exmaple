export const selectPersons = (state) => state.person?.persons || []
export const selectPersonError = (state) => state.person?.error
export const selectIsLoadingPerson = (state) => state.person?.loading
