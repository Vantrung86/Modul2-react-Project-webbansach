import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Sildebar from "./Sildebar";
import "../admin/AdminCSS.css";
import axios from "axios";

import Modal from 'react-bootstrap/Modal';

import {VND} from "../Until/Until"
export default function ListOrder() {
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    let url = `http://localhost:8000/orders`;
    const result = await axios.get(url);
    setOrders(result.data);
  };
  useEffect(() => {
    loadOrders();
  }, []);

  //Access
  const handleAccess = async (idAccess) => {
    try {
      if (window.confirm("Bạn có muốn duyệt đơn ?")) {
          const order = orders.find((item) => item.id === idAccess);
          const updatedStatus = order.status === "Đang chờ" ? "Duyệt" : "Đang chờ";
          await axios.patch(`http://localhost:8000/orders/${idAccess}`, {
            status: updatedStatus,
          });
          // Cập nhật trạng thái (status) của orders trong danh sách hiện tại
          setOrders((abc) =>
          abc.map((e) =>
              e.id === idAccess
                ? { ...e, status: updatedStatus }
                : e
            )
          );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái người dùng", error);
    }
  };

  //Cancel
  const handleCancel = async (idCancel) => {
    try {
      if (window.confirm("Bạn có muốn huỷ đơn ?")) {
            const order = orders.find((item) => item.id === idCancel);
            const updatedStatus = order.status === "Đang chờ" ? "Huỷ" : "Đang chờ";
            await axios.patch(`http://localhost:8000/orders/${idCancel}`, {
              status: updatedStatus,
            });
            // // Cập nhật trạng thái (status) của orders trong danh sách hiện tại
            setOrders((abc) =>
              abc.map((e) =>
                e.id === idCancel
                  ? { ...e, status: updatedStatus }
                  : e
              )
            );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái người dùng", error);
    }
  };

  //111111111
  const [cart,setCart] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) =>{ setShow(true); setCart(item)};

  return (
    <div>
    <AdminHeader />
    <Sildebar />
    <main className="main-container">
      <div className="main-title">
        <h3>Quản lý đơn hàng</h3>
      </div>
      <div>
        <table className="table_product">
          <thead>
            <tr>
                <th>STT</th>
                <th>Cart</th>
                <th>Acount</th>
                <th>Total</th>
                <th>Day Order</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                      <p style={{textDecoration:"underline", color:"blue", cursor:"pointer", paddingTop:"20px"}} onClick={()=>handleShow(item.cart)}>Xem chi tiết</p>
                    </td>
                    <td>{item.nameOrder}</td>
                    <td>{VND.format(item.totalOrderpay)}</td>
                    <td>{item.dayOrder}</td>
                    <td>{item.status}</td>
                    <td>
                        {item.status === "Đang chờ" ? (<button onClick={()=>handleAccess(item.id)} style={{padding:"3px 7px",backgroundColor:"red",color:"white",border:"none",borderRadius:"5px"}} className="btn_common btn_edit">Duyệt</button>) : ""}
                        {item.status === "Đang chờ" ? (<button onClick={()=>handleCancel(item.id)} style={{padding:"3px 7px",backgroundColor:"green",color:"white",border:"none",borderRadius:"5px"}} className="btn_common btn_delete">Huỷ</button>) : ""}                 
                    </td>
                </tr>
            ))}
          </tbody>
        </table>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sản phẩm đã mua:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table style={{width:"100%",textAlign:"center"}}>
                <thead>
                    <tr>
                        <th style={{border:"1px solid black"}}>STT</th>
                        <th style={{border:"1px solid black"}}>Ảnh</th>
                        <th style={{border:"1px solid black"}}>Tên sản phẩm</th>
                        <th style={{border:"1px solid black"}}>Giá</th>
                        <th style={{border:"1px solid black"}}>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                {cart?.map((item,index)=>(
                    <tr key={index}>
                        <td style={{border:"1px solid black"}}>{index+1}</td>
                        <td style={{border:"1px solid black"}}><img style={{width:"100px",height:"100px",objectFit:"cover"}} src={item.src}/></td>
                        <td style={{border:"1px solid black"}}>{item.name}</td>
                        <td style={{border:"1px solid black"}}>{VND.format(item.price)}</td>
                        <td style={{border:"1px solid black"}}>{item.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Modal.Body>
      </Modal>
      </div>
    </main>
  </div>
  )
}
