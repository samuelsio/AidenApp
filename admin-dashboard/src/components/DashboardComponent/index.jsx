import React from "react";
import "./DashboardComponent.scss"
import UserGraph from "../UserGraph";
import TotalData from "../../pages/AdminDashboard/UserDashboardData.json"


export default function DashboardComponent(){

    const { TotalUsers, 
        TotalClans, 
        PremiumMembers, 
        ActiveUsers, 
        prevUsers, 
        prevClans, 
        prevMembers, 
        prevActive,
        TotalUsersByMonth } = TotalData; 
    const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return 0; // Avoid division by zero
        return ((current - previous) / previous * 100).toFixed(1);
    }
    
    return(
        <>
        
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="card bg-secondary text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>{TotalUsers}</h3>
                      <p>Total Users</p>
                    </div>
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <small className={calculatePercentageChange(TotalUsers, prevUsers) > 0 ? "text-success" : "text-danger"}>{calculatePercentageChange(TotalUsers, prevUsers) > 0 
                  ? `${calculatePercentageChange(TotalUsers, prevUsers)}% Increase since last week` 
                  : "No increase in Users since last week"}</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-secondary text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>{TotalClans}</h3>
                      <p>Total Clans</p>
                    </div>
                    <i className="bi bi-box-seam"></i>
                    </div>
                  <small className={calculatePercentageChange(TotalClans, prevClans) > 0 ? "text-success" : "text-danger"}>{calculatePercentageChange(TotalClans, prevClans) > 0 
                  ? `${calculatePercentageChange(TotalClans, prevClans)}% Increase since last week` 
                  : "No increase in Clans since last week"}</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-secondary text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>{PremiumMembers}</h3>
                      <p>Premium Members</p>
                    </div>
                    <i className="bi bi-currency-dollar"></i>
                    </div>
                  <small className={calculatePercentageChange(PremiumMembers, prevMembers) > 0 ? "text-success" : "text-danger"}>{calculatePercentageChange(PremiumMembers, prevMembers) > 0 
                  ? `${calculatePercentageChange(PremiumMembers, prevMembers)}% Increase since last week` 
                  : "No increase in Premium Members since last week"}</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-secondary text-white p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>{ActiveUsers}</h3>
                      <p>Active Users</p>
                    </div>
                    <i className="bi bi-hourglass-split"></i>
                    </div>
                  <small className={calculatePercentageChange(ActiveUsers, prevActive) > 0 ? "text-success" : "text-danger"}>{calculatePercentageChange(ActiveUsers, prevActive) > 0 
                  ? `${calculatePercentageChange(ActiveUsers, prevActive)}% Increase since last week` 
                  : "No increase in Active Users since last week"}</small>
                </div>
              </div>
            </div>

            {/* Sales Details */}
            <div className="row mt-4">
              <div className="col">
                <div className="card bg-secondary text-white p-4">
                  <h4>Total Users By Month</h4>
                  
                  <UserGraph 
                  TotalUsersByMonth={TotalUsersByMonth}/>

                </div>
              </div>
            </div>

            {/* Deals Details */}
            <div className="row mt-4">
              <div className="col">
                <div className="card bg-secondary text-white p-4">
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
                          <span className="ms-2">Apple Watch</span>
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
                          <span className="ms-2">Oculus Headset</span>
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
        </>
    )
}