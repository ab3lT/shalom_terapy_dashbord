import { Breadcrumbs, Typography, Button, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { MdEmail, MdPhone, MdLocationOn, MdDateRange } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const CustomerDetails = () => {
  return (
    <>
      <div className="right-content w-100" style={{ padding: "20px 5px" }}>
        <div className="card shadow border-0 w-100 flex-row p-4 m-0">
          <h5 className="mb-0">Customer View</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <Link to="/Dashbord" style={{ color: "inherit", textDecoration: "none" }}>
              <HomeIcon fontSize="small" /> Dashboard
            </Link>
            <Link to="/Customers" style={{ color: "inherit", textDecoration: "none" }}>
              Customers
            </Link>
            <Typography color="text.primary">
              Customer <ExpandMoreIcon fontSize="small" />
            </Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="card p-4">
        {/* Profile section */}
        <div className="row mb-4">
          <div className="col-md-3 text-center">
            <Avatar
              src="https://randomuser.me/api/portraits/men/75.jpg"
              sx={{ width: 100, height: 100 }}
            />
            <h5 className="mt-3">John Doe</h5>
            <span className="text-muted">Customer Since: Jan 2023</span>
          </div>
          <div className="col-md-9">
            <h6 className="mb-4">Customer Information</h6>
            <div className="row">
              <div className="col-sm-6 mb-2 d-flex align-items-center">
                <MdEmail className="mr-2" /> <span>Email: john.doe@example.com</span>
              </div>
              <div className="col-sm-6 mb-2 d-flex align-items-center">
                <MdPhone className="mr-2" /> <span>Phone: +123456789</span>
              </div>
              <div className="col-sm-6 mb-2 d-flex align-items-center">
                <MdLocationOn className="mr-2" /> <span>Address: 123 Main St, NY</span>
              </div>
              <div className="col-sm-6 mb-2 d-flex align-items-center">
                <MdDateRange className="mr-2" /> <span>DOB: 1990-08-15</span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Orders Section */}
        <h6 className="mb-3">Recent Orders</h6>
        <div className="orderList">
          <ul>
            <li>
              <strong>Order #12345</strong> - 03 Mar 2025 - <span className="text-success">Delivered</span>
              <Button variant="text" size="small">View</Button>
            </li>
            <li>
              <strong>Order #12200</strong> - 21 Feb 2025 - <span className="text-warning">Pending</span>
              <Button variant="text" size="small">View</Button>
            </li>
          </ul>
        </div>

        <hr />

        {/* Review Section */}
        <h6 className="mb-3">Recent Reviews</h6>
        <div className="reviewsSection">
          <div>
            <strong>5★</strong> - Excellent product quality! - <em>02 Feb 2025</em>
          </div>
          <div>
            <strong>4★</strong> - Fast delivery, but packaging was average. - <em>15 Jan 2025</em>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
