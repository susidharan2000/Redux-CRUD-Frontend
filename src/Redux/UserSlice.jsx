import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "Users",
    initialState: {
        Users: []
    },
    reducers: {
        getUser: (state, action) => {
            const payloadData = action.payload.data; 
            if (Array.isArray(payloadData )) {
                state.Users = payloadData .map(ele => ({
                    id: ele._id,
                    name: ele.name,
                    email: ele.email,
                    age: ele.age
                }));
            } else {
                console.error("Payload is not an array:", payloadData );
            }
        },
        createUser: (state, action) => {
            state.Users.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.Users.findIndex(
              (ele) => ele.id === action.payload.id
            );
            state.Users[index] = {
              id: action.payload.id,
              name: action.payload.name,
              email: action.payload.email,
              age: action.payload.age,
            };
          },
          deleteUser: (state, action) => {
            const id = action.payload.id;
            state.Users = state.Users.filter((ele) => ele.id !== id);
          }
    }
});


export const{getUser,createUser,updateUser,deleteUser} = UserSlice.actions
export default UserSlice.reducer