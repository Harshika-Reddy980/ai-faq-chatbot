
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/signup",
        formData
      );

      console.log(response.data);

      alert("Signup successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      console.log(error.response);

      alert(
        error.response?.data?.detail ||
        "Signup failed"
      );

    }

  };

  return (

    <div className="h-screen bg-gray-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Signup
        </button>

        <p className="text-center mt-4">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Signup;