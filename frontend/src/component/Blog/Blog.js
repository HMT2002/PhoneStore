import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const data = [
  { title: "blog 1", content: "hihi" },
  { title: "blog 2", content: "hihihihihi" },
];

const Blog = () => {
  return (
    <Fragment>
      <div className="p-24">
        <h1 className="text-4xl font-bold text-center text-gray-700">Blog</h1>
        <div className="border border-b-1 border-gray-300 mt-2 w-60 m-auto"></div>

        <ul className="mt-16 w-2/3 m-auto">
          {data.length > 0 &&
            data.map((item, index) => (
              <li key={index} className="">
                <Link
                  className="p-5 border rounded-md border-gray-400 flex gap-4 mb-4 cursor-pointer"
                  to={`/blog_detail`}
                >
                  <div className="">
                    <img />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="mt-3 text-lg">{item.content}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Blog;
