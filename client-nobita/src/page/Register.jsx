import React, { useEffect, useState } from "react";
import "../components/css/Register.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useFormik } from "formik";

import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [dataUser, setDataUser] = useState([]);
  const loadUser = async () => {
    let result = await axios.get("http://localhost:8000/users");
    setDataUser(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const [emailExistsError, setEmailExistsError] = useState(false);

  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      phonenumber: "",
      email: "",
      password: "",
      address: "",
      role: "regular",
      status: "",
    },
    // b4: sử dụng Yup để viết các điều kiện cho input
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Nhập nhiều hơn 5 kí tự")
        .max(25, "Không vượt quá 25 kí tự")
        .required("không được để trống"),
      phonenumber: Yup.string().required("không được để trống"),
      email: Yup.string()
        .email("email chưa đúng định dạng")
        .required("không được để trống"),

      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
        )
        .required("không được để trống"),
      address: Yup.string().required("không được để trống"),
    }),

    onSubmit: async (values) => {
      const emailExists = dataUser.some((user) => user.email === values.email);
      if (emailExists) {
        setEmailExistsError(true);
      } else {
        await axios.post("http://localhost:8000/users", values);
        toast.success("Đăng kí thành công");
        navigate("/login");
      }
    },
  });
  return (
    <div>
      <Header />
      <div className="container">
        <div className="main-register">
          <div className="main-form">
            <h2>ĐĂNG KÝ</h2>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="content" />
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.username && formik.touched.username && (
                    <p className="register_error">{formik.errors.username}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="content" />
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Number phone"
                    name="phonenumber"
                    value={formik.values.phonenumber}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phonenumber && formik.touched.phonenumber && (
                    <p className="register_error">
                      {formik.errors.phonenumber}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="content" />
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="register_error">{formik.errors.email}</p>
                  )}
                  {emailExistsError && (
                    <p className="register_error">Email đã có người sử dụng</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="content" />
                <div>
                  <div className="fa-eye-layout">
                    <input
                      type={togglePassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <i
                      className={`fa-solid ${
                        togglePassword ? "fa-eye" : "fa-eye-slash"
                      } toggle_eye`}
                      onClick={() => setTogglePassword(!togglePassword)}
                    ></i>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="register_error_password">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="content" />
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <p className="register_error">{formik.errors.address}</p>
                  )}
                </div>
              </div>
              <div className="ruler">
                Tôi đã đọc và đồng ý với quy định và chính sách của chương trình
              </div>
              <div>
                <button type="submit" className="btn-register">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr/>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
