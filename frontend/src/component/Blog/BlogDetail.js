import React, { Fragment } from "react";

const BlogDetail = () => {
  return (
    <Fragment>
      <div className="py-24 px-96 text-justify text-lg m-auto">
        <h1 className="font-bold text-3xl mb-8">
          Đánh giá Huawei Band 8: Một trong những mẫu Smartband đáng mua hiện
          nay!
        </h1>
        <p className="text-sm mb-8">Ngày đăng: 22.02.2023</p>
        <img src="images/blog1.jpg" alt="" />
        <p className="mt-12">
          Trong vài năm trở lại đây, những chiếc smartband (vòng đeo tay thông
          minh) cũng được rất nhiều người dùng quan tâm. Đa phần những sản phẩm
          này đều được trang bị một số tính năng cần thiết của một chiếc
          smartwatch như: Đo nhịp tim, nhận thông báo, chế độ tập luyện,...
          nhưng chúng sở hữu mức giá rẻ hơn. Trong số đó, Huawei Band 8 là sản
          phẩm mà mình thấy nổi bật nhất. Vậy Huawei Band 8 có gì đặc biệt? Hãy
          cùng mình đánh giá Huawei Band 8 để tìm hiểu thêm về mẫu smartband này
          nha!
        </p>
        <p className="text-xl font-bold mt-8">
          Thiết kế Huawei Band 8 thân thiện, bền bỉ cùng cảm giác đeo thoải mái
        </p>
        <p className="mt-4">
          Mình đã có một cảm giác rất quen thuộc ngay khi nhìn vào thiết kế tổng
          thể của Huawei Band 8/ Điều này cũng dễ hiểu khi chiếc smartband này
          có nhiều nét tương đồng với những thế hệ trước như: Huawei Band 7,
          Huawei Band 6,.... Kích thước tổng thể của Huawei Band 8 không có quá
          nhiều sự khác biệt so với thế hệ trước nhưng khối lượng của thiết bị
          đã nhẹ hơn. Cụ thể, Huawei đã tối ưu toàn bộ linh kiện bên trong
          Huawei Band 8 nên cân nặng của sản phẩm được rút lại từ 16 g trên
          Huawei Band 7 xuống còn 14 g. Dù vậy, sự khác biệt về cân nặng này
          không dễ để chúng ta nhận ra.
        </p>
        <img src="images/blog11.jpg" alt="" className="mt-4" />
        <p className="mt-4">
          Trước đây khi mình trải nghiệm Huawei Band 7, góc cong lớn ở phần
          khung viền khiến màn hình cũng bị cong theo. Do đó, thông tin hiển thị
          trên màn hình không quá rõ ràng mỗi khi mình xoay cổ tay lúc lái xe để
          xem giờ thay thông báo. Tuy nhiên, điều này đã được khắc phục ở Huawei
          Band 8 khi thiết bị mang lại cảm giác đeo ôm cổ tay hơn, màn hình được
          làm phẳng và nâng cao hơn nên mình có trải nghiệm xem thông báo, giờ
          giấc dễ dàng.
        </p>
        <img src="images/blog12.jpg" alt="" className="mt-6" />
        <p className="mt-4">
          Phần mặt đáy của Huawei Band 8 cũng được hoàn thiện từ nhựa nhám nên
          thiết bị không bám bẩn quá nhiều mỗi khi mình đổ mồ hôi tay trong lúc
          tập luyện thể thao. Bên dưới phần mặt đáy này cũng là nơi chứa hệ
          thống cảm biến, chấu sạc nam châm cũng như nút tháo dây đeo của Huawei
          Band 8.
        </p>
        <p className="text-xl font-bold mt-8">Tổng kết</p>
        <p className="mt-4">
          Đối với cá nhân mình, Huawei Band 8 là một bản nâng cấp tốt của Huawei
          Band 7 từ trải nghiệm đeo, phần mềm và pin. Dù chỉ là những thay đổi
          nhỏ nhưng tạo được sức ảnh hưởng lớn đến trải nghiệm đeo của người
          dùng. Tuy vẫn cần nâng cấp một vài tính năng nhưng nhìn chung Huawei
          Band 8 vẫn là một trong những chiếc smartband đáng mua hiện nay.
        </p>
        <div className="flex justify-center">
          <button className="mt-24 px-3 py-4 w-48 m-auto box-border text-white bg-gray-800 hover:bg-transparent hover:border-2 hover:border-gray-900 hover:text-gray-900 font-bold">
            Mua ngay đồng hồ tại Phone Store
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogDetail;
