import React, { useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { FaReact } from "react-icons/fa"; // React icon

const AppBar = () => {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (userId && token) {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/${userId}`);
          setAuthor(response.data.name || "Guest"); // Set "Guest" if author name not found
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="border-b border-gray-300 flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <Link to={"/blogs"} className="flex items-center space-x-2 text-gray-800 hover:text-black font-semibold text-lg">
        <FaReact className="text-blue-500 text-2xl" />
        <span>ProBlog</span> {/* Updated blog name */}
      </Link>

      <div className="flex items-center space-x-4">
        <Link to={`/publish`}>
          <button
            type="button"
            className="bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition duration-150"
          >
            New Post
          </button>
        </Link>
        <Avatar name={author} size={"big"} />
      </div>
    </div>
  );
};

export default AppBar;
