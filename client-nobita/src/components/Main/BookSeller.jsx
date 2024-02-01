import React, { useEffect, useState } from "react";
import "../css/NewBook.css";
import axios from "axios";
import { Link } from "react-router-dom";

import {VND} from "../../Until/Until"

function BookSeller() {
  const [datas, setDatas] = useState([]);
  const loadBook = async () => {
    let url = `http://localhost:8000/books`;
    const result = await axios.get(url);
    setDatas(result.data);
  };
  useEffect(() => {
    loadBook();
  }, []);
  return (
    <div className="container">
      <div className="newbook_main">
        <div className="newbook_title">
          <p className="event_endow_detail">
            <div className="rectangle_detail"></div>
            <h4>Sách Bán Chạy</h4>
          </p>

          <Link to={"/list-seller-book"} className="newbook_all">
            Xem tất cả <i className="fa-solid fa-angles-right" />
          </Link>
        </div>

        <div className="newbook-section">
          {datas
            .filter((element) => element.tagname === "bookseller")
            .slice(-5)
            .map((element, index) => (
              <div className="newbook_decoration" key={element.id}>
                <Link to={`/bookdetail/${element.id}`}>
                  <img src={element.src} alt="" />
                  <p className="newbook-name">{element.name}</p>
                  <p className="newbook-author">{element.author}</p>
                  <p className="newbook_price">
                    {VND.format(element.price)}
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BookSeller;
