import axios from "axios";
import React, { useState } from "react";
import {  updateUser } from "../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.User.Users);
  //need to check the id
  const user = users.find((ele) => ele.id === id);
  //console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  /**
   * The handleSubmit function is an asynchronous function that sends a PUT request to update user data
   * and then navigates to the home page.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://redux-curd-backend.onrender.com/api/UpdateUser/${id}`,
        { name, email, age }
      );
      dispatch(updateUser(response.data.result));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter the Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter the Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              value={age}
              placeholder="Enter the Age"
              id="age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;