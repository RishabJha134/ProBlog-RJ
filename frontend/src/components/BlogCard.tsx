import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Icon for Logout

// BlogCard Component
interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publish: string;
  id: number;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publish,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="w-full">
      <div className="p-6 border-b border-slate-300 hover:bg-gray-100 transition-all duration-200 ease-in-out w-full max-w-screen-lg cursor-pointer mx-auto">
        <div className="flex items-center mb-2">
          <Avatar name={authorName} />
          <div className="font-light pl-2 text-sm text-gray-600">{authorName?.toUpperCase()}</div>
          <div className="mx-2 h-1 w-1 bg-slate-500 rounded-full"></div>
          <div className="text-gray-500 text-sm">{publish}</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 leading-snug">{title}</h2>
        <p className="text-md font-light text-gray-700 mt-1 line-clamp-3">
          {content.slice(0, 120)}...
        </p>
        <p className="text-gray-500 text-xs font-light mt-3">
          {`${Math.ceil(content.length / 100)} min read`}
        </p>
      </div>
    </Link>
  );
};

// Avatar Component
interface AvatarProps {
  name: string;
  size?: string;
}

export const Avatar = ({ name, size = "small" }: AvatarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div
      className="relative inline-flex items-center cursor-pointer"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div
        className={`inline-flex items-center ${
          size === "small" ? "w-8 h-8" : "w-12 h-12"
        } justify-center overflow-hidden bg-gray-500 rounded-full`}
      >
        <span className={`font-medium text-white ${size === "small" ? "text-sm" : "text-md"}`}>
          {name && name[0].toUpperCase()}
        </span>
      </div>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border z-10">
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};
