import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout style={{ backgroundColor: "#990011" }}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3" style={{ backgroundColor: "#f0f0f0", color: "#990011" }}>
              <h3> Admin Name: {auth?.user?.name}</h3>
              <h3> Admin email: {auth?.user?.email}</h3>
              <h3> Admin Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
