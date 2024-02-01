import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="container">
      <div className="footer_content">
        <div className="footer_content_logo">
          <img
            src="https://media.licdn.com/dms/image/C510BAQH8DbMlSGkaGw/company-logo_200_200/0/1519890914516?e=2147483647&v=beta&t=ENj4MSvXtQhmEXINsjmTrrPiX7LD94Ntf48oPh2kg0o"
            alt=""
          />
          <p>
            Mua Sách Online Tại Nobita.Vn Ra đời từ năm 2011, đến nay Nobita.vn
            đã trở thành địa chỉ mua sách online quen thuộc của hàng ngàn độc
            giả trên cả nước, và luôn được cập nhật liên
            tục từ các nhà xuất bản uy tín trong nước
          </p>
        </div>

        <div className="footer_contact">
          <h6>Hỗ Trợ Khách Hàng</h6>
          <p>Email: sale.nobita@gmail.com</p>
          <p>Hotline: 0938 424 289</p>
        </div>

        <div className="footer_contact">
          <h6>Tài Khoản</h6>
          <p>Đăng nhập</p>
          <p>Quên Pass</p>
        </div>

        <div className="footer_contact">
          <h6>Hướng Dẫn</h6>
          <p>Hướng dẫn mua hàng</p>
          <p>Phương thức thanh toán</p>
          <p>Chính sách vận chuyển</p>
          <p>Chính sách bảo mật thông tin</p>

        </div>
      </div>
      <hr />

      <div className="footer_bottom">
        <p>Copyright © 2014 Nobita.vn</p>
        <p>Địa chỉ: 25/5 Thăng Long, P. 4, Quận Tân Bình, TP. Hồ Chí Minh</p>
        <img src="https://nobita.vn/wp-content/themes/template/stores/images/dathongbao-1.png" alt="" />
      </div>
    </div>
  );
}

export default Footer;
