
import { useBlog } from "../Hooks";
import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
// @ts-ignore
import ShimmerUI from "../components/ShimmerUI";
// @ts-ignore
import AppBar from "../components/AppBar";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  console.log(blog);

  if (loading || !blog) {
    return (
      <div>
        <AppBar />

        <div className="flex justify-center items-center gap-20">
          <ShimmerUI></ShimmerUI>

          <ShimmerUI></ShimmerUI>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog}></FullBlog>
    </div>
  );
};

export default Blog;
