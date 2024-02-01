import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Sildebar from "./Sildebar";
import "../admin/AdminCSS.css";
import axios from "axios";

function ManagerUser() {
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    let url = `http://localhost:8000/users`;
    const result = await axios.get(url);
    setUsers(result.data);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleBlock = async (idBlock) => {
    try {
      const user = users.find((user) => user.id === idBlock);
      const updatedStatus = user.status === "blocked" ? "" : "blocked";

      await axios.patch(`http://localhost:8000/users/${idBlock}`, {
        status: updatedStatus,
      });

      // Cập nhật trạng thái (status) của user trong danh sách hiện tại
      setUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser.id === idBlock
            ? { ...prevUser, status: updatedStatus }
            : prevUser
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái người dùng", error);
    }
  };

  // Thực thi tìm kiếm user

  const [inputSearchUser, setInputSearchUser] = useState("");
  const loadUser = async () => {
    let url = `http://localhost:8000/users`;
    url += `?q=${inputSearchUser}`;
    const result =  await axios.get(url)
    setUsers(result.data)
    
  };
  useEffect(() => {
    loadUser();
  }, [inputSearchUser]);

  return (
    <div>
      <AdminHeader />
      <Sildebar />
      <main className="main-container">
        <div className="main-title">
          <h3>Quản lý khách hàng</h3>
        </div>
        <div className="section_user_search">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={inputSearchUser}
            onChange={(e) => setInputSearchUser(e.target.value)}
          />
          {/* <i className="fas fa-search icon_search_user"></i> */}
        </div>
        <div>
          <table className="table_product">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((element) => element.role === "regular")
                .map((element, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.username}</td>
                    <td>{element.phonenumber}</td>
                    <td>{element.email}.</td>
                    <td>{element.address}</td>
                    <td>
                      <i
                        style={{cursor:"pointer"}}
                        className={`fa-solid ${
                          element.status === "" ? "fa-unlock" : "fa-lock"
                        } status_user`}
                        onClick={() => handleBlock(element.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManagerUser;
