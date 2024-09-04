import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.scss'; // For any custom CSS needed
import Sidebar from '../../components/sidebar';

export default function AdminDashboard() {
  return (
    <>
    
    <div className="container-fluid bg-dark text-white vh-100">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-md-10 bg-dark">
          <div className="container-fluid">
            {/* Top Navbar */}
            <div className="row pt-3">
              <div className="col d-flex justify-content-between">
                <h2>Dashboard</h2>
                <div className="d-flex align-items-center">
                  <i className="bi bi-bell text-white"></i>
                  <img src="path_to_avatar.jpg" alt="Avatar" className="rounded-circle ml-2" width="40" height="40" />
                  <span className="ml-2">Moni Roy <small>Admin</small></span>
                </div>
              </div>
            </div>

            {/* Stats Boxes */}
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="card bg-dark text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>40,689</h3>
                      <p>Total Users</p>
                    </div>
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <small className="text-success">8.5% Up from yesterday</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-dark text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>10,293</h3>
                      <p>Total Orders</p>
                    </div>
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <small className="text-success">1.3% Up from past week</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-dark text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>$89,000</h3>
                      <p>Total Sales</p>
                    </div>
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <small className="text-danger">4.3% Down from yesterday</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-dark text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>2,040</h3>
                      <p>Total Pending</p>
                    </div>
                    <i className="bi bi-hourglass-split"></i>
                  </div>
                  <small className="text-success">1.8% Up from yesterday</small>
                </div>
              </div>
            </div>

            {/* Sales Details */}
            <div className="row mt-4">
              <div className="col">
                <div className="card bg-dark text-white p-4">
                  <h4>Sales Details</h4>
                  {/* Replace with actual chart */}
                  <div className="chart-placeholder bg-light" style={{ height: '250px' }}></div>
                </div>
              </div>
            </div>

            {/* Deals Details */}
            <div className="row mt-4">
              <div className="col">
                <div className="card bg-dark text-white p-4">
                  <h4>Deals Details</h4>
                  <table className="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Location</th>
                        <th>Date - Time</th>
                        <th>Piece</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img src="path_to_product_image.jpg" alt="Product" width="30" height="30" className="rounded-circle" />
                          <span className="ml-2">Apple Watch</span>
                        </td>
                        <td>6096 Marjolaine Landing</td>
                        <td>12.09.2019 - 12:53 PM</td>
                        <td>423</td>
                        <td>$34,295</td>
                        <td><span className="badge bg-success">Delivered</span></td>
                      </tr>
                      <tr>
                        <td>
                          <img src="path_to_product_image.jpg" alt="Product" width="30" height="30" className="rounded-circle" />
                          <span className="ml-2">Oculus Headset</span>
                        </td>
                        <td>9543 Avenue Avn.</td>
                        <td>15.09.2123 - 16:32 PM</td>
                        <td>490</td>
                        <td>$100,001</td>
                        <td><span className="badge bg-success">Shipping</span></td>
                      </tr>
                      {/* Add more rows as necessary */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

