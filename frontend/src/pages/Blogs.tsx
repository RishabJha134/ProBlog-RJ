
// @ts-ignore
import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../Hooks";
// @ts-ignore
import { BlogSkeleton } from "../components/BlogSkeleton";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar></AppBar>
      <div className="flex justify-center items-center">
        <div className="flex justify-center flex-col">
          {blogs.map((item) => {
            return (
              <>
                <BlogCard
                  id={item.id as number}
                  authorName={item.author.name}
                  title={item.title}
                  content={item.content}
                  publish={item.publish}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
