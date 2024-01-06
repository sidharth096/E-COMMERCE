
import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = ()=>{
  try {
      const getuser = localStorage.getItem("user")
      return getuser? JSON.parse(getuser):null
  } catch (error) {
      console.log("user loading error",error);
      return null
  }
}

const initialState = {
  user: loadUserFromLocalStorage()
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload))
      } catch (error) {
        console.log("Error storing user in localstorage", error);
      }
    },
    logoutUser: (state) => {
      state.user = null;
      try {
        localStorage.removeItem("user")
      } catch (error) {
        console.log("Error removing user from localstorage", error);

      }
    }
  }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
