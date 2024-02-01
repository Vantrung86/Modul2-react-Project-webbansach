import React from "react";
import "../admin/AdminHeader.css";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate()
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  if(userLogin?.email !== "admin@gmail.com"){
      navigate("/")
  }
  return (
    <div>
      <div className="header header_admin">
        <nav className="container">
          <div className="container-fluid">
            <Link to={"/"}>
              <i className="fa-solid fa-house-user home_admin"></i>
            </Link>

            <div className="title_admin">
              <h3>ADMIN</h3>
            </div>
            <div className="header_navbar_item">
                <ul>
                    <li><i className="fa-regular fa-envelope"></i></li>
                    <li><i className="fa-regular fa-bell"></i></li>
                    <li><i className="fa-solid fa-gear"></i></li>
                </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default AdminHeader;
