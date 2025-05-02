import React from "react";
import { Button } from "@mui/material";
import { MdOutlineRemoveRedEye, MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const deleteRow = (event) => {
    event.target.closest("tr").remove();
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-3 mt-4">
        <h5 className="mb-3">Customer Management</h5>
        <div className="table-responsive">
          <table className="table table-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Orders</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((id) => (
                <tr key={id}>
                  <td>#{id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="imgWrapper me-2">
                        <img
                          src="https://i.pinimg.com/736x/db/79/19/db79196aaf11b3e0b5decc02df26006c.jpg"
                          alt="Customer"
                          className="rounded-circle"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="info">
                        <h6 className="mb-0">Customer {id}</h6>
                        <small>customer{id}@gmail.com</small>
                      </div>
                    </div>
                  </td>
                  <td>customer{id}@gmail.com</td>
                  <td>+2519{id}000000{id}</td>
                  <td className={id % 2 === 0 ? "text-success" : "text-warning"}>
                    {id % 2 === 0 ? "Active" : "Pending"}
                  </td>
                  <td>2025-04-2{id}</td>
                  <td>{10 * id}</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to={`/customer/details/${id}`}>
                        <Button color="secondary">
                          <MdOutlineRemoveRedEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <IoPencil />
                      </Button>
                      <Button color="error" onClick={deleteRow}>
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
