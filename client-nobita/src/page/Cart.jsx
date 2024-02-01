import React, { useEffect, useState } from "react";
import "../components/css/Cart.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {VND} from "../Until/Until"
function Cart() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const userId = userLogin ? userLogin.id : null;
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [obj,setObj] = useState({
    name:"",
    phone:"",
    email:""
  })
  const handleGetDataCity = async () => {
    let data = await axios.get(`https://provinces.open-api.vn/api/`);
    setDataCity(data.data);
  };
  useEffect(() => {
    handleGetDataCity();
  }, []);
  const handleCity = async (e) => {
    let idCity = +e.target.value;
    const nameCity = dataCity.find((item) => item.code === idCity);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/p/${idCity}?depth=2`
    );
    setCity(nameCity.name);
    setDataDistrict(data.data.districts);
  };
  const handleDistrict = async (e) => {
    let idDistrict = +e.target.value;
    const nameDistrict = dataDistrict.find((item) => item.code === idDistrict);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`
    );
    setDistrict(nameDistrict.name);
    setDataWard(data.data.wards);
  };
  // gọi giỏ hàng từ API theo từng user
  const [dataCart, setdataCart] = useState([]);
  const loadBook = async () => {
    if (userId) {
      const result = await axios.get(`http://localhost:8000/users/${userId}`);
      let productUser = result.data;
      setdataCart(productUser.cart);
    }
  };
  useEffect(() => {
    loadBook();
  }, [flag]);

  // hàm xoá sản phẩm trong giỏ hàng giỏ hàng
  const deleteProduct = async (itemId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá ?")) {
      const updatedCart = dataCart.filter((item) => item.id !== itemId);
      setdataCart(updatedCart);
      await axios.patch(`http://localhost:8000/users/${userId}`, {
        cart: updatedCart,
      });
    }
  };

  // Xây dựng hàm update tăng - giảm số lượng quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      const editQuantity = dataCart.map((e) =>
        e.id === itemId ? { ...e, quantity: newQuantity } : e
      );
      setdataCart(editQuantity);
      await axios.patch(`http://localhost:8000/users/${userId}`, {
        cart: editQuantity,
      });
    }
  };

  // Hàm tính tổng tiền cần thanh toán
  let totalMoney = 0;
  for (let i = 0; i < dataCart.length; i++) {
    totalMoney += dataCart[i].quantity * dataCart[i].price;
  }

  // hàm thanh toán
  const handleFinish = async () => {
    let d = new Date();
    let newOrder = {
      user_id: userLogin.id,
      cart: dataCart,
      totalOrderpay: totalMoney,
      dayOrder: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
      status: "Đang chờ",
      nameOrder: userLogin.username,
      address: `${ward}-${district}-${city}`,
      name:obj.name,
      SDT:obj.phone
    };
    await axios.post("http://localhost:8000/orders", newOrder);
    await axios.patch(`http://localhost:8000/users/${userId}`, {
      cart: [],
    });
    setFlag(!flag);
    swal({
      icon: "success",
      title: "Thành công!",
    });
    handleClose();
    navigate("/bill");
  };

  //Modal checkout
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Lấy thông tin người nhận hàng
  const handleChangleInput=(e)=>{
    setObj({...obj, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <Header />
      <div className="product-table container">
        <h4>GIỎ HÀNG CỦA BẠN</h4>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản Phẩm</th>
              <th>Tên sách</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>
            {dataCart.map((element, index) => (
              <tr key={element.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={element.src} alt="" />
                </td>
                <td>{element.name}</td>
                <td>
                  {VND.format(element.price)}
                </td>
                <td>
                  <i
                    style={{cursor:"pointer"}}
                    className="fa-solid fa-minus"
                    onClick={() =>
                      updateQuantity(element.id, element.quantity - 1)
                    }
                    disabled={element.quantity <= 1}
                  ></i>
                  <span>{element.quantity}</span>
                  <i
                    style={{cursor:"pointer"}}
                    className="fa-solid fa-plus"
                    onClick={() =>
                      updateQuantity(element.id, element.quantity + 1)
                    }
                  ></i>
                </td>
                <td>
                  {VND.format(element.price * element.quantity)}
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => deleteProduct(element.id)}
                    style={{cursor:"pointer"}}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total_money">
          <h5>
            Tổng tiền:{" "}
            <span>
              {VND.format(totalMoney)}
            </span>
          </h5>
          <button onClick={handleShow}>Thanh Toán</button>
        </div>
        <hr />
      </div>

      {/* Modal Checkout */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Đơn Hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "start" }}>
              <h5>Thông tin giao hàng</h5>
              <input
                type="text"
                placeholder="Họ và tên"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  paddingLeft: "5px",
                }}
                name="name"
                value={obj.name}
                onChange={handleChangleInput}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  paddingLeft: "5px",
                }}
                name="phone"
                value={obj.phone}
                onChange={handleChangleInput}
              />
              <input
                type="email"
                placeholder="Email"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  paddingLeft: "5px",
                }}
                name="email"
                value={obj.email}
                onChange={handleChangleInput}
              />
              <select onChange={handleCity} name="" id="">
                <option value="">Chọn thành phố</option>
                {dataCity.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select onChange={handleDistrict} name="" id="">
                <option>Chọn Quận/Huyện</option>
                {dataDistrict.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select onChange={(e) => setWard(e.target.value)} name="" id="">
                <option value="">Chọn Phường/Xã</option>
                {dataWard.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="primary" onClick={handleFinish}>
              Đặt Hàng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
