import { useState } from "react";

// @ts-ignore
import AppBar from "./AppBar";
import { blogInput } from "../Hooks";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: blogInput }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // const readingTime = useMemo(() => {
  //   const wordsPerMinute = 200;
  //   const wordCount = blog.content.trim().split(/\s+/).length;
  //   const minutes = Math.ceil(wordCount / wordsPerMinute);
  //   return minutes;
  // }, [blog.content]);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-white">
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-4 md:px-10 w-full max-w-screen-xl pt-8 md:pt-12 gap-8">
          {/* Main Content Column */}
          <div className="col-span-12 md:col-span-8 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {blog.title}
              </h1>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <span>Published on</span>
                <time className="font-medium">{blog.publish}</time>
                <span className="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
                <span>
                  {`${Math.ceil(blog.content.length / 100)}`} min read
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                {blog.content}
              </div>
            </div>
          </div>

          {/* Author Sidebar */}
          <div className="col-span-12 md:col-span-4">
            <div className="sticky top-8 bg-gray-50 rounded-xl p-6 shadow-sm">
              <h2 className="text-gray-600 text-lg font-medium mb-4">Author</h2>
              <div className="flex w-full items-start space-x-4">
                <div className="flex-shrink-0">
                  <Avatar size="big" name={blog.author.name} />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {blog.author.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Random catch phrase about the author's ability to grab the
                    user's attention
                  </p>
                  <button
                    onClick={handleFollowClick}
                    className={`mt-4 w-full font-medium py-2 px-4 rounded-full transition-all duration-200 ${
                      isFollowing
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              </div>

              {/* Additional Author Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {isFollowing ? "1.2K Followers" : "1.1K Followers"}
                  </span>
                  <span>48 Articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100">
        <div className="h-full bg-green-600 w-1/3 transition-all duration-200"></div>
      </div>
    </div>
  );
};

export default FullBlog;
