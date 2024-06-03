import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../Redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";

const GetUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const Users = useSelector((state) => state.User.Users); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://redux-curd-backend.onrender.com/api/getUsers");
      dispatch(getUser(response.data));
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleClickedit = (id)=>{
    navigate(`/update/${id}`)
  }
  const handleClickdelete = async(id)=>{
    try{
      const response = await axios.delete(`https://redux-curd-backend.onrender.com/api/DeleteUser/${id}`);
      dispatch(deleteUser({id}));
    }catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='books-table'>
      <h1 className='title-books text-center'>Users</h1>
      {Users && Users.length > 0 ? (
        <React.Fragment>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col" colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.age}</td>
                    <td><button className='btn btn-warning' onClick={()=>handleClickedit(element.id)}>Edit</button></td>
                    <td><button className='btn btn-danger' onClick={()=>handleClickdelete(element.id)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to='/create' className="btn btn-success btn-sm mb-2">Create User</Link>
        </React.Fragment>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default GetUser;
