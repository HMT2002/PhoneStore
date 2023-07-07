import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    title:
      "Đánh giá Huawei Band 8: Một trong những mẫu Smartband đáng mua hiện nay!",
    content:
      "Trong vài năm trở lại đây, những chiếc smartband (vòng đeo tay thông minh) cũng được rất nhiều người dùng quan tâm. Đa phần những sản phẩm này đều được trang bị một số tính năng cần thiết của một chiếc smartwatch như: Đo nhịp tim, nhận thông báo, chế độ tập luyện,... nhưng chúng sở hữu mức giá rẻ hơn. Trong số đó, Huawei Band 8 là sản phẩm mà mình thấy nổi bật nhất. Vậy Huawei Band 8 có gì đặc biệt? Hãy cùng mình đánh giá Huawei Band 8 để tìm hiểu thêm về mẫu smartband này nha!",
    image: "blog1.jpg",
  },
  {
    title:
      "Loa Rezo vừa mới cập bến TGDĐ giá rẻ 690K, thiết kế trong suốt, đèn LED đa sắc",
    content:
      "Một chiếc loa trong suốt, LED đa sắc, pin khỏe và có thể phát âm thanh 360 độ, lại có giá rẻ! Bạn không nghe nhầm đâu, đó chính là chiếc loa Bluetooth Rezo Home Series One vừa cập bến Thế Giới Di Động, mời các bạn cùng khám phá chiếc loa nhỏ mà có võ này nhé!",
    image: "blog2.jpg",
  },
  {
    title:
      "Cùng khám phá thương hiệu Xmobile vừa mở bán cáp sạc với thiết kế độc lạ",
    content:
      "Là một người dùng công nghệ thì chắc hẳn bạn đã từng nghe qua thương hiệu Xmobile rồi nhỉ. Tuy Xmobile chưa quá phổ biến tại Việt Nam nhưng các sản phẩm của thương hiệu này đều sở hữu chất liệu cao cấp mà còn có mức giá vô cùng tốt cho người dùng. Vậy Xmobile có phải là một thương hiệu đáng để tin tưởng? Có nên mua cáp sạc Xmobile?",
    image: "blog3.jpg",
  },
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
                  <div className="w-64">
                    <img
                      src={`images/${item.image}`}
                      alt=""
                      className="w-full h-fit"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-md line-clamp-3">{item.content}</p>
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
