import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import axios from 'axios'

import Modal from 'react-bootstrap/Modal';

import {VND} from "../Until/Until"
export default function BillUser() {
    const [flag,setFlag] = useState(false)
    const [cart,setCart] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item) =>{ setShow(true); setCart(item)};
    // gọi từ local lấy user người dùng đang hoạt động.
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    // Kiểm tra người dùng đã đăng nhập chưa
    const userId = userLogin ? userLogin.id : null;
    const [bill,setBill] = useState([]);
    const handleLoadBill = async () =>{
        let result = await axios.get(`http://localhost:8000/orders?user_id=${userId}`);
        setBill(result.data)
    };
    useEffect(()=>{
        handleLoadBill()
    },[flag]);

    const handleCancel= async (id)=>{
        if (window.confirm("Bạn có muốn huỷ đơn ?")) {
            await axios.patch(`http://localhost:8000/orders/${id}`,{status:"Huỷ"});
            setFlag(!flag)       
        }
    }
  return (
    <div>
        <Header/>
        <div style={{width:"80%", margin:"0 auto", marginTop:"20px"}}>
            <table style={{width:"100%",textAlign:"center"}}>
                <thead>
                    <tr>
                        <th style={{border:"1px solid black"}}>STT</th>
                        <th style={{border:"1px solid black"}}>Giỏ Hàng</th>
                        <th style={{border:"1px solid black"}}>Thông tin người nhận</th>
                        <th style={{border:"1px solid black"}}>Ngày mua</th>
                        <th style={{border:"1px solid black"}}>Tổng tiền</th>
                        <th style={{border:"1px solid black"}}>Trạng thái</th>
                        <th style={{border:"1px solid black"}}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                {bill?.map((item,index)=>(
                    <tr key={index}>
                        <td style={{border:"1px solid black"}}>{index+1}</td>
                        <td style={{border:"1px solid black"}} >
                            <p style={{textDecoration:"underline", color:"blue", cursor:"pointer"}} onClick={()=>handleShow(item.cart)}>Xem chi tiết</p>
                        </td>
                        <td style={{border:"1px solid black"}}>
                                <p>Tên: {item.name}</p>
                                <p>Địa chỉ: {item.address}</p>
                                <p>SĐT: {item.SDT}</p>
                        </td>
                        <td style={{border:"1px solid black"}}>{item.dayOrder}</td>
                        <td style={{border:"1px solid black"}}>{VND.format(item.totalOrderpay)}</td>
                        <td style={{border:"1px solid black"}}>{item.status}</td>
                        <td style={{border:"1px solid black"}}>{item.status === "Đang chờ" ? (<button style={{padding:"5px 8px",borderRadius:"5px",border:"none",backgroundColor:"red",color:"white",cursor:"pointer"}} onClick={()=>handleCancel(item.id)}>Huỷ</button>) : ""}</td>
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
        <Footer/>
    </div>
  )
}
