import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../action/OrderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import Metadata from "../layout/Metadata";

function MyOrders() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
 
  const columns = [  // Headername comes as column heading, field is what we use in row to tell that what comes in that column
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    // Order ID is Column name and id is what we use in row to tell that what comes in that column
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 0.6,
      cellClassName: (params) => { // by this we can change class name of cell
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },//params.getValue(params.id, "status") gives value in field "status" , if its Delivered then greenColor else redColor className
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => { // by this we can give any html element in the cell
        return (//getValue is inBuilt function of columns ,  params.getValue(params.id, "id") gives value in field "id"
          <Link to={`/order/${params.getValue(params.id, "id")}`}> 
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length, // here we are using itemsQty because the same is field in col, so this comes in that col
        id: item._id, 
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <Metadata title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid // we have to just pass row and columns 
            rows={rows}
            columns={columns} 
            pageSize={10}  // per page 10
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  )
}

export default MyOrders