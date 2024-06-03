import axios from "axios";
import React, { useState } from "react";
import { createUser } from "../Redux/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://redux-curd-backend.onrender.com/api/createUser",
        { name, email, age }
      );
      dispatch(createUser(response.data.result));
      navigate("/");
      setName("");
      setEmail("");
      setAge("");
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
              placeholder="Enter the Age"
              id="age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;