import React from "react";
import "../css/Carousels.css";
import Carousel from "react-bootstrap/Carousel";

function CarouselPage() {
  return (
    <div className="container">
      <div className="carousel_category">
        <div className="category_list">
          <i className="fa-solid fa-bars"></i>
          <span>DANH MỤC SẢN PHẨM</span>
        </div>
        <div className="phone">
          <i className="fa-solid fa-phone"></i>
          <span className="hotline">Hotline:</span>
          <span> 0938 424 289</span>
        </div>
      </div>
      <div className="carosel_content">
        <div className="carosel_left">
          <ul>
            <li className="carosel_left_outstanding">Nổi Bật</li>
            <li>Truyện Tranh - Comic</li>
            <li>văn học nước ngoài</li>
            <li>Sale cuối năm 2022</li>
            <li>Sách Văn Học</li>
            <li>Truyện Tranh BL</li>
            <li>Sách Kĩ Năng Sống</li>
            <li>Light Novel</li>
            <li>Sách Thiếu Nhi</li>
            <li>Văn Phòng Phẩm - Quà Tặng</li>
            <li>Công ty phát hành</li>
          </ul>
        </div>
        <div className="carosel_right">
          <Carousel interval={2000}>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://nobita.vn/wp-content/uploads/2018/01/loai-3-01.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://nobita.vn/wp-content/uploads/2018/01/3d.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://nobita.vn/wp-content/uploads/2018/01/banner1.jpg"
                alt=""
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CarouselPage;
