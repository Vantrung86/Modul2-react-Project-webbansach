import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/css/ListNewBook.css";
import axios from "axios";

import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

import {VND} from "../Until/Until"
function ListReleaseBook() {

  // Cuộn lên đầu trang
  const onUpdate = () => {
    window.scrollTo(0, 0);
  };



  const [datas, setDatas] = useState([]);
  // render và phân trang
  const [curPage, setCurPage] = useState(1); // Trang hiện tại
  const [limitPerPage, setlimitPerPage] = useState(10); // số lượng trong một trang
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang

  // Hàm lấy value sort
  const [sort, setSort] = useState("");
  const handleSort = (e) => {
    setSort(e);
  };

  // Lấy toàn bộ dữ liệu một lần duy nhất
  const loadAllBooks = async () => {
    let url = `http://localhost:8000/books`;
    if (sort === "1") {
      url = `http://localhost:8000/books?_sort=price&_order=asc`;
    } else if (sort === "2") {
      url = `http://localhost:8000/books?_sort=price&_order=desc`;
    }
    const result = await axios.get(url);
    return result.data;
  };

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const allBooks = await loadAllBooks();
      const filteredData = allBooks.filter(
        (element) => element.tagname === "releasebook"
      );

      // Tính tổng số trang dựa trên dữ liệu đã được lọc
      const totalRes = Math.ceil(filteredData.length / limitPerPage);
      setTotalPage(totalRes);

      // Xác định mảng sản phẩm cho trang hiện tại
      const startIndex = (curPage - 1) * limitPerPage;
      const endIndex = startIndex + limitPerPage;
      const pageData = filteredData.slice(startIndex, endIndex);
      setDatas(pageData);
      onUpdate();
    };

    fetchAndFilterData();
  }, [curPage, sort, limitPerPage]);

  // phân trang
  let paginationItem = [];
  for (let i = 1; i <= totalPage; i++) {
    paginationItem.push(
      <Pagination.Item
        key={i}
        onClick={() => setCurPage(i)}
        active={i === curPage}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Header />
      <div className="container">
        <div className="title_category">
          <div className="category_lists">
            <i className="fa-solid fa-bars"></i>
            <span>DANH MỤC SẢN PHẨM</span>
          </div>
          <div className="phone_list">
            <i className="fa-solid fa-phone"></i>
            <span className="hotline">Hotline:</span>
            <span> 0938 424 289</span>
          </div>
          <div className="carosel_title_item">
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
        </div>
        <div className="path">
          <p>
            Nobita.vn - Nhà Sách Trên Mạng /<span> Sắp phát hành</span>
          </p>
        </div>

        <div className="newbook-title">
          <h4>Sắp Phát Hành</h4>
          <div className="arrange">
            <p>
              Xem theo:
              <span>
                <select onClick={(e) => handleSort(e.target.value)}>
                  <option>Sắp xếp theo</option>
                  <option value="1">Giá thấp đến cao</option>
                  <option value="2">Giá cao đến thấp</option>
                </select>
              </span>
            </p>
          </div>
        </div>

        <div className="listnewbook-section">
          {datas.map((element, index) => (
            <div className="listnewbook_decoration" key={element.id}>
                <Link to={`/bookdetail/${element.id}`}>
                  <img src={element.src} alt="" />
                  <p className="listnewbook-name">{element.name}</p>
                  <p className="listnewbook-author">{element.author}</p>
                  <p className="listnewbook_price">
                    {VND.format(element.price)}
                  </p>
                </Link>
            </div>
          ))}
        </div>
        {/* Phân trang */}

        {totalPage > 1 && (
          <Pagination style={{ justifyContent: "center", marginTop: "10px"}}>
            <Pagination.Prev
              onClick={() => setCurPage(curPage - 1)}
              disabled={curPage === 1}
            />
            {paginationItem}
            <Pagination.Next
              onClick={() => setCurPage(curPage + 1)}
              disabled={curPage === totalPage}
            />
          </Pagination>
        )}

        {/* Kết thúc phân trang */}

        <hr />
      </div>
      <Footer />
    </div>
  );
}

export default ListReleaseBook;
