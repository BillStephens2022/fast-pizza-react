import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";



function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // this will be the payload for the fulfilled state of the action
  return { position, address };
});

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state, action) => {
      state.status = "loading"; 
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.status = "idle";
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = "There was a problem getting your address. Make sure to fill out this field.";
    });
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
