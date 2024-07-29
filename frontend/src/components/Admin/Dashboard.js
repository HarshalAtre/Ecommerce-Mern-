import React, { useEffect } from 'react'
import Chart from 'chart.js/auto';
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import "./Dashboard.css"
import { Doughnut, Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom"; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAdminProduct } from '../../action/ProductAction';
import { getAllOrders } from '../../action/OrderAction';
function Dashboard() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error,products } = useSelector((state) => state.Product);
    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);
    let outOfStock = 0;

    products &&
    products.forEach(item => {
        if(item.Stock===0){
            outOfStock+=1;
        }
    });
    let totalAmount = 0;
        orders &&
          orders.forEach((item) => {
            totalAmount += item.totalPrice;
          });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["green"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0,totalAmount],
          },
        ],
      };
    
      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock,products.length-outOfStock],
          },
        ],
      };
      useEffect(() => {
    
        if (error) {
          alert.error(error);
          dispatch(clearError());
        }

        dispatch(getAdminProduct());
        dispatch(getAllOrders());

      }, [dispatch, alert, error]);

      
  return (
    <div className="dashboard" style={{marginTop:"20px"
    }}>
    <Metadata title="Dashboard - Admin Panel" />
    <Sidebar />

    <div className="dashboardContainer">
      <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br />  ₹{totalAmount}
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
        </div>
      </div>

      <div className="lineChart">
        <Line data={lineState} />
      </div>

      <div className="doughnutChart">
        <Doughnut data={doughnutState} />
      </div>
    </div>
  </div>
  );
}

export default Dashboard