import React from "react";
import "../css/Category.css";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="container">
      <div className="newbook_main">
        <div className="newbook_title">
          <p className="event_endow_detail">
            <div className="rectangle_detail"></div>
            <h4>Danh Mục</h4>
          </p>

          <Link to={"/"} className="newbook_all">
            Xem tất cả <i className="fa-solid fa-angles-right" />
          </Link>
        </div>

        <div className="newbook-section">
          <div className="newbook_decoration">
            <img
              src="https://nobita.vn/wp-content/uploads/2022/05/52825713-1067824953401033-999220439152590848-n.jpg"
              alt=""
            />
            <p className="category-name">
            Sách Thiếu Nhi
            </p>
          </div>

          <div className="newbook_decoration">
            <img
              src="https://nobita.vn/wp-content/uploads/2022/04/272747471-2381020102033591-1285411329568411782-n.jpg"
              alt=""
            />
            <h4 className="category-name">
            Văn Phòng Phẩm - Quà
            </h4>
          </div>
          <div className="newbook_decoration">
            <img
              src="https://nobita.vn/wp-content/uploads/2022/05/dntttttuntitled-1.jpg"
              alt=""
            />
            <h4 className="category-name">
            Sách Kĩ Năng Sống
            </h4>
          </div>
          <div className="newbook_decoration">
            <img
              src="https://nobita.vn/wp-content/uploads/2022/04/224279cd58a397fdceb2.jpg"
              alt=""
            />
            <h4 className="category-name">
            Truyện Tranh BL
            </h4>
          </div>
          <div className="newbook_decoration">
            <img
              src="https://nobita.vn/wp-content/uploads/2022/05/bia-sakurako-tap-10-ban-pho-thong-1.jpg"
              alt=""
            />
            <h4 className="category-name">
            Văn Học Nước Ngoài
            </h4>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  );
}

export default Category;
