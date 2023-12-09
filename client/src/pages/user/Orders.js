import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 offset-md-3">
            <UserMenu />
          </div>
          <h4 className="col-md-9">All Orders</h4>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
