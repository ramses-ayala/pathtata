import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    name: '',
    email: '',
    token: ''
}

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const { name, email, token } = action.payload;
            state.isAuth = true;
            state.name = name;
            state.email = email;
            state.token = token;
        },
        logout: () => initialState
    }
})

export const { setLogin, logout } = authUserSlice.actions;
export default authUserSlice.reducer;