import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/css/Login.css";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import swal from "sweetalert";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email chưa đúng định dạng")
        .required("Vui lòng điền đầy đủ thông tin"),

      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
        )
        .required("Vui lòng điền đầy đủ thông tin"),
    }),

    onSubmit: async (values) => {
      try {
        let url = await axios.get(
          `http://localhost:8000/users?email=${values.email}&password=${values.password}`
        );

        let result = url.data;

        if (result.length > 0) {
          if (result[0].status !== "blocked") {
            localStorage.setItem("userLogin", JSON.stringify(result[0]));
            if (result[0].role === "admin") {
              navigate("/admin");
            } else if (
              result[0].role === "regular" &&
              result[0].status !== "blocked"
            ){
              navigate("/");
            }
          } else{
            alert("Tài khoản của bạn hiện tại đang bị khoá")
          }
        } else {
          // Sai email hoặc password
          alert("Email hoặc mật khẩu không đúng");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div>
      <Header />
      <section className="container">
        <div className="container-main">
          <h3>ĐĂNG NHẬP</h3>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="content" />
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="register_error">{formik.errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="content" />
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="register_error_password">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="btn">
              ĐĂNG NHẬP
            </button>
          </form>
          <div className="forget_pass">
            <p>Quên mật khẩu?</p>
            <Link to="/register" className="link">
              Đăng kí tại đây
            </Link>
          </div>
        </div>
        <hr />
      </section>
      <Footer />
    </div>
  );
}

export default Login;
