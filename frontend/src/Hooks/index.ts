import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/config";
import axios from "axios";

export interface blogInput {
  id:number;
  title: string;
  content: string;
  publish: string;
  author: {
    name: string;
  };
}

// Simple date formatting function
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  
  // Adding "st", "nd", "rd", or "th" to the day
  const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
  
  return `${day}${suffix} ${month} ${year}`;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<blogInput[]>([]);

  async function getBlogs() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    
    // Format publish date for each blog
    const formattedBlogs = response.data.blogs.map((blog: blogInput) => ({
      ...blog,
      publish: formatDate(blog.publish),
    }));

    setBlogs(formattedBlogs);
    setLoading(false);
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return { loading, blogs };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<blogInput | null>(null);

  async function getBlog() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    
    // Format publish date for the single blog
    const formattedBlog = {
      ...response.data.blog,
      publish: formatDate(response.data.blog.publish),
    };

    setBlog(formattedBlog);
    setLoading(false);
  }

  useEffect(() => {
    getBlog();
  }, [id]);

  return { loading, blog };
};
