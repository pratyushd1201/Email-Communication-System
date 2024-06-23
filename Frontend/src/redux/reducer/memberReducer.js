import { createSlice } from "@reduxjs/toolkit";

//Redux slice which holds all logic of member reducer
export const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [
      {
        id: 1,
        name: "Asraful",
        email: "asraful8625@gmail.com",
      },
      {
        id: 2,
        name: "John",
        email: "john@gmail.com",
      },
      {
        id: 3,
        name: "David",
        email: "david@gmail.com",
      },
    ],
  },
  reducers: {
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    updateMember: (state, action) => {
      state.members.map((member) => {
        if (member.id === action.payload.id) {
          member.id = action.payload.id;
          member.name = action.payload.name;
          member.email = action.payload.email;
        }
      });
    },
    deleteMember: (state, action) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMember, updateMember, deleteMember } = memberSlice.actions;

export default memberSlice.reducer;
