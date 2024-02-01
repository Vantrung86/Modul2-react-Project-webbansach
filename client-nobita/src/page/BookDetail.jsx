import React, { useEffect, useState } from "react";
import "../components/css/BookDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import {VND} from "../Until/Until"
function BookDetail() {


    // Cuộn lên đầu trang
    const onUpdate = () => {
      window.scrollTo(0, 0);
    };
  

  // gọi từ local lấy user người dùng đang hoạt động.
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  // Kiểm tra người dùng đã đăng nhập chưa
  const userId = userLogin ? userLogin.id : null;

  const navigate = useNavigate();



  // gọi API lấy sản phẩm theo id
  const [product, setProduct] = useState({});
  const [commentProduct, setCommentProduct] = useState([]);

  const { id } = useParams();

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8000/books/${id}`);
    const productData = result.data
    setProduct(productData);
    setCommentProduct(productData.comment || [])
  };

  useEffect(() => {
    onUpdate();
    loadBook();
  }, [id]);



  // gọi user người dùng theo id.
  const [user, setUser] = useState({});
  const [cartProduct, setCartProduct] = useState(user.cart || []);

  const loadUser = async () => {
    if (userId) {
      let result = await axios.get(`http://localhost:8000/users/${userId}`);
      const userData = result.data;
      setUser(userData);
      // Đảm bảo rằng bạn không ghi đè lên giỏ hàng cũ khi cập nhật state
      setCartProduct(userData.cart || []);
    }
  };
  useEffect(() => {
    loadUser();
  }, [userId]);


  // hàm mua hàng
  const addToCart = async (product) => {
    if (userId && userLogin.role === "regular") {
      const updatedCart = [...cartProduct]; // sao chép dữ liệu
      const existingProduct = updatedCart.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
      // Cập nhật state giỏ hàng của ứng dụng
      setCartProduct(updatedCart);

      // Gọi API để cập nhật giỏ hàng trên máy chủ
      await axios.patch(`http://localhost:8000/users/${userId}`, {
        cart: updatedCart,
      });
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };



  // Bạn có thể quan tâm
  const [datas, setDatas] = useState([]);
  const loadBookCare = async () => {
    let url = `http://localhost:8000/books`;
    const result = await axios.get(url);
    setDatas(result.data);
  };
  useEffect(() => {
    loadBookCare();
  }, []);



  // chức năng comment
  const [inputcomment, setInputComment] = useState("");
  const handleComment = async() => {
    if(inputcomment !== ""){
      // lấy ngày tháng năm vào thời điểm hiện tại
      let today = new Date();
      let valuedate = (today.getMonth()+1)+' '+today.getDate()+', '+today.getFullYear();
      if(userLogin){
        const newComment = {
          content: inputcomment,
          date: valuedate,
          user_id: user.id,
          user_name: user.username
        };
         
        const updateComment = [...commentProduct]; // sao chép dữ liệu commnent
        updateComment.push(newComment);
        setCommentProduct(updateComment)
  
  
        await axios.patch(`http://localhost:8000/books/${id}`, {
          comment: updateComment,
        });
  
      }
      else{
        navigate("/login")
      }
    }
  }




  return (
    <div>
      <Header />
      <div className="container container-infor">
        <h3>Thông tin sản phẩm </h3>
        <hr />
        <div className="row">
          <div className="col-3">
            <img src={product.src} alt="" />
          </div>
          <div className="col-9">
            <h5>{product.name}</h5>
            <p>Tác Giả: {product.author}</p>
            <p>Phát Hành: Công ty cổ phần ZGroup</p>
            <h4 className="price">
              Giá:
              <span>
                {VND.format(product.price)}
              </span>
            </h4>
            <button className="btn-infor" onClick={() => addToCart(product)}>
              Mua Ngay
            </button>

            <div>
              <p>
                <i className="fa-solid fa-check"></i>Bọc Plastic theo yêu cầu
              </p>
              <p>
                <i className="fa-solid fa-check"></i>
                Giao hàng miễn phí trong nội thành TP. HCM với đơn hàng ≥
                200.000 đ Giao hàng miễn phí toàn quốc với đơn hàng ≥ 350.000 đ
              </p>
            </div>
          </div>
        </div>

        <h5 className="care_about">Có Thể Bạn Quan Tâm</h5>
        <hr />
        <div className="bonnus_detail">

            {datas
                .filter((element) => element.tagname === "bookseller")
                .slice(-10)
                .map((element, index) => (

                  <div className="newbook_decoration" key={element.id}>
                    <Link>
                      <img
                        src={element.src}
                        alt=""
                      />
                      <p className="newbook-name">
                        {element.name}
                      </p>
                      <p className="newbook-author">{element.author}</p>
                      <p className="newbook_price">
                      {VND.format(element.price)}
                      </p>
                    </Link>
                </div>


            ))}

        </div>

        <div className="commnent">
          <div className="duongvien"><span className="comment_length">{commentProduct.length}</span></div>
          <p className="danhgia">Đánh giá khách hàng</p>
        </div>
      

        <div>


          <div className="comments container">
            <div className="review_form field_form">
              <h5>Add a review</h5>
              <form className="row mt-3">
                <div className="error-message-comment" />
                <div className="form-group col-12 mb-3">
                  <textarea
                    required="required"
                    placeholder="Hãy là người bình luận đầu tiên.... "
                    className="form-control"
                    name="message"
                    onChange={(e) => setInputComment(e.target.value)}
                  />
                </div>
                <div className="form-group col-12 mb-3">
                  <button
                    type="submit"
                    className="btn btn-fill-out btn-comment-product"
                    name="submit"
                    onClick={handleComment}
                  >
                    Đăng bình luận
                  </button>
                </div>
              </form>
            </div>


            <ul className="list_none comment_list mt-4 comment_list_product">
              {commentProduct.map((element, index) => (
                <li key={index} className="commentli">
                  <div className="comment_img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaE2CzhO1vNQTxBuTSKxtENpIldyOvMkTLw&usqp=CAU" alt="" />
                  </div>

                  <div className="content_comment">
                    <p className="customer_meta">
                      <span className="review_author">{element.user_name}</span>
                      <span className="comment-date">{element.date}</span>
                    </p>
                    <div>
                      <p>
                        {element.content}
                      </p>
                    </div>

                    <div className="handlelike">
                      <span><i className="fa-regular fa-thumbs-up"></i></span>
                      <span><i className="fa-regular fa-thumbs-down"></i></span>
                      <span className="feedback">Phản hồi</span>
                    </div>
                  </div>

                </li>
              ))}

            </ul>
          </div>



        </div>





      </div>
      <hr />
      <Footer />
    </div>
  );
}

export default BookDetail;
