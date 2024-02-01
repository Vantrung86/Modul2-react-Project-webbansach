import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Sildebar from "./Sildebar";
import "../admin/AdminCSS.css";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useNavigate } from "react-router-dom";
import {VND} from "../Until/Until"
function Admin() {
 
  // Thêm và sửa sản phẩm

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addcheck, setAddcheck] = useState("add");

  const [product, setProduct] = useState({
    name: "",
    src: "",
    price: "",
    author: "",
    tagname: "bookseller",
  });

  const { name, src, price, author, tagname } = product;

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !src || !price || !author || !tagname) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    try {
      if (product.id) {
        // Đây là cập nhật sản phẩm đã tồn tại
        await axios.patch(`http://localhost:8000/books/${product.id}`, product);
      } else {
        // Đây là thêm sản phẩm mới
        await axios.post("http://localhost:8000/books", product);
      }
      setShow(false);
      resetForm();
      setAddcheck(!addcheck);
    } catch (error) {
      // Xử lý lỗi khi POST request thất bại
      console.error("Lỗi khi thêm sản phẩm:", error);
      // Hiển thị thông báo lỗi cho người dùng
      alert("Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, [addcheck]);

  const resetForm = () => {
    setProduct({
      name: "",
      src: "",
      price: "",
      author: "",
      tagname: "bookseller",
    });
  };

  // hàm sửa sản phẩm
  const handleEdit = async (id) => {
    const result = await axios.get(`http://localhost:8000/books/${id}`);
    setProduct(result.data);
    setShow(true);
  };
  // useEffect(() =>{
  //     loadBook();
  // },[]);

  const [datasProduct, setDatasProduct] = useState([]);
 
  // render và phân trang và tìm kiếm
  const [check, setCheck] = useState("a");

  const [curPage, setCurPage] = useState(1); // Trang hiện tại
  const [limitPerPage, setlimitPerPage] = useState(10); // số lượng trong một trang
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang

  // Hàm lấy value sort
  const [sort, setSort] = useState("");
  const handleSort = (e) => {
    setSort(e);
  };

  // hàm tìm kiếm

  const [input, setInput] = useState("");
  const handleChangeInput = (e) => {
    setInput(e);
  };

  const loadProducts = async () => {
    let url = `http://localhost:8000/books?_page=${curPage}&_limit=${limitPerPage}`;
    // Sắp xếp
    if (sort) {
      setInput("")
      if (sort === "1") {
        url = `http://localhost:8000/books?_sort=name&_order=asc&_page=${curPage}&_limit=${limitPerPage}`;
      } else if (sort === "2") {
        url = `http://localhost:8000/books?_sort=price&_order=asc&_page=${curPage}&_limit=${limitPerPage}`;
      } else if (sort === "3") {
        url = `http://localhost:8000/books?_sort=price&_order=desc&_page=${curPage}&_limit=${limitPerPage}`;
      }
    }
    // Tìm kiếm
     if (input) {
      setSort("")
      url = `http://localhost:8000/books?q=${input}&_page=${curPage}&_limit=${limitPerPage}`;
    }

    let result = await axios.get(url);
    const countRes = result.headers["x-total-count"];
    const totalRes = Math.ceil(countRes / limitPerPage);
    setDatasProduct(result.data);
    setTotalPage(totalRes);
  };

  useEffect(() => {
    loadProducts();
  }, [curPage, sort, input]);

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

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá ?")) {
      await axios.delete(`http://localhost:8000/books/${id}`);
      setCheck(!check);
    }
  };
  useEffect(() => {
    loadProducts();
  }, [check]);

  return (
    <div>
      <AdminHeader />
      <Sildebar />
      <main className="main-container">
        <div className="main-title">
          <div className="btn_add_Product">
            <button onClick={handleShow}>Add Product</button>
          </div>
          <h3>Quản lý sản phẩm</h3>
        </div>
        <div className="input_product">
          <input
            type="text"
            placeholder="Search ..."
            className=""
            value={input}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
        </div>
        <div>
          <div className="select_sort_product">
            <select onClick={(e) => handleSort(e.target.value)}>
              <option>Sắp xếp theo</option>
              <option value="1">Sắp xếp theo tên A-Z</option>
              <option value="2">Sắp xếp theo giá tăng dần</option>
              <option value="3">Sắp xếp theo giá giảm dần</option>
            </select>
          </div>
          <table className="table_product">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Tác giả</th>
                <th>Thể loại</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {datasProduct.map((element, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td className="img_product_admin">
                    <img src={element.src} alt="" />
                  </td>
                  <td>{VND.format(element.price)}</td>
                  <td>{element.author}</td>
                  <td>{element.tagname}</td>
                  <td>
                    <button
                      className="btn_edit_product"
                      onClick={() => handleEdit(element.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn_delete_product"
                      onClick={() => handleDelete(element.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}

          <Pagination style={{ justifyContent: "center", marginTop: "10px" }}>
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

          {/* Kết thúc phân trang */}
        </div>

        {/* modal sửa và thêm sản phẩm  */}
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton className="modal_add_product">
              <Modal.Title className="modal_title_product">
                Add Product
              </Modal.Title>
            </Modal.Header>
            <div className="forn_add_product">
              <form className="form" onSubmit={handleSubmit}>
                <label className="form_label">Name:</label>
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={handleChange}
                />
                <br />

                <label className="form_label">Image:</label>
                <input
                  type="text"
                  value={src}
                  name="src"
                  onChange={handleChange}
                />
                <br />
                <p><img style={{width:"100px"}} src={product.src} alt="" /></p>
                <label className="form_label">Price:</label>
                <input
                  type="text"
                  value={price}
                  name="price"
                  onChange={handleChange}
                />
                <br />

                <label className="form_label">Author:</label>
                <input
                  type="text"
                  value={author}
                  name="author"
                  onChange={handleChange}
                />
                <br />

                <label className="form_label">Tagname:</label>
                <select
                  name="tagname"
                  value={tagname}
                  onChange={handleChange}
                >
                  <option value="bookseller">Sách bán chạy</option>
                  <option value="newbook">Sách mới</option>
                  <option value="releasebook">Sắp phát hành</option>
                </select>
                <br />

                <Button
                  variant="success"
                  type="submit"
                  className="btn_modal_add_product"
                >
                  Save
                </Button>
              </form>
            </div>
          </Modal>
        </>

        {/* kết thúc modal sửa và thêm sản phẩm  */}
      </main>
    </div>
  );
}

export default Admin;
