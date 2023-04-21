import React, { useEffect, useRef, useState } from "react";
import Appbar from "../../shared/Appbar";
import TopCards from "./section/TopCards";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import moment from "moment";
import SalesCards from "./section/SalesCards";
import ReplacementCards from "./section/ReplacementCards";
import { getExpenses } from "../../helpers/AxiosHelper";
import DateRangeFilter from "./DateRangeFilter";
import ReactToPrint from "react-to-print";
import { Colors } from "../../helpers/Colors";
// import ReactToPrint, {useReactToPrint} from "react-to-print";

const useStyles = makeStyles({
  container: {
    padding: "25px",
  },
});

const DashboardPage = () => {
  const user = useSelector((state) => state.User.value);
  const orders = useSelector((state) => state.Order.value);

  const classes = useStyles();

  const defaultOrderData = {
    orders: 0,
    newOrders: 0,
    shipped: 0,
    pickedUp: 0,
    inTransit: 0,
    outForDelivery: 0,
    delivered: 0,
    unDelivered: 0,
    rto: 0,
    returned: 0,
  };

  const defaultSalesData = {
    totalSales: 0,
    purchasedPrice: 0,
    codPurchasePrice: 0,
    prepaidPurchasePrice: 0,
    totalProfit: 0,
    todaySale: 0,
    todayProfit: 0,
    prepaidProfit: 0,
    codAdvanceProfit: 0,
    codProfit: 0,
    codPendingProfit: 0,
    prepaidShipmentProfit: 0,
    codShipmentProfit: 0,
  };

  const defaultReplacementData = {
    totalReplacement: 0,
    pendingReplacement: 0,
    processingReplacement: 0,
    completedReplacement: 0,
  };

  const [filteredOrders, setFilteredOrders] = useState([]);

  const [ordersData, setOrdersData] = useState(defaultOrderData);

  const [salesData, setSalesData] = useState(defaultSalesData);

  const [totalExpenses, setTotalExpenses] = useState(0);

  const cardRef = useRef(null);

  useEffect(() => {
    getExpenses().then((res) => {
      if (res.data.length > 0) {
        setTotalExpenses(
          res.data
            .map((item) => parseInt(item.price))
            .reduce((prev, next) => prev + next)
        );
      }
    });
  }, []);

  const [replacementData, setReplacementData] = useState(
    defaultReplacementData
  );

  function getSafeReplacement(order) {
    try {
      return order.isReplacement;
    } catch (e) {
      return false;
    }
  }

  function getSafeAwb(order) {
    try {
      return order.awbNumber;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    const ordersTemp = filteredOrders.length > 0 ? filteredOrders : orders;

    if (ordersTemp.length > 0) {
      let newOrdersCount = 0,
        shippedCount = 0,
        pickedUpCount = 0,
        inTransitCount = 0,
        outForDeliveryCount = 0,
        deliveredCount = 0,
        unDeliveredCount = 0,
        rtoCount = 0,
        returnedCount = 0;

      let totalSalesTemp = 0,
        purchasedPriceTemp = 0,
        codPurchasePriceTemp = 0,
        prepaidPurchasePriceTemp = 0,
        totalProfitTemp = 0,
        todaySaleTemp = 0,
        todayProfitTemp = 0,
        prepaidProfitTemp = 0,
        codProfitTemp = 0,
        codAdvanceProfitTemp = 0,
        codPendingProfitTemp = 0,
        prepaidShipmentProfit = 0,
        codShipmentProfit = 0;

      let totalReplacement = 0,
        pendingReplacement = 0,
        processingReplacement = 0,
        completedReplacement = 0;

      ordersTemp.forEach((order) => {
        if (order) {
          if (order.isReplacement) {
            totalReplacement++;
            deliveredCount++;
            if (!order.replacementAwbNumber) {
              pendingReplacement++;
            }
            if (order.shipWayRes) {
              if (order.shipWayRes.status === "Success") {
                if (order.shipWayRes.response.current_status_code === "DEL") {
                  completedReplacement++;
                } else {
                  processingReplacement++;
                }
              }
            }
          } else {
            if (order.awbNumber) {
              shippedCount++;
            }

            if (order.shipWayRes) {
              if (order.shipWayRes.status === "Success") {
                const code = order.shipWayRes.response.current_status_code;
                if (code === "PKP") {
                  pickedUpCount++;
                } else if (code === "INT") {
                  inTransitCount++;
                } else if (code === "OOD") {
                  outForDeliveryCount++;
                } else if (code === "DEL") {
                  deliveredCount++;
                } else if (code === "24") {
                  unDeliveredCount++;
                } else if (code === "RTO") {
                  rtoCount++;
                } else if (code === "RTD") {
                  returnedCount++;
                }
              }
            }
          }

          const createdAt = moment(order.orderedDate);
          const startOfToday = moment().startOf("day");
          const endOfToday = moment().endOf("day");

          let overAllProfit = 0;

          order.products.forEach((product) => {
            const salesPrice = product.salesPrice;
            const purchasedPrice = product.purchasedPrice;
            const profit = (salesPrice - purchasedPrice) * product.quantity;
            purchasedPriceTemp = purchasedPriceTemp + parseInt(purchasedPrice);
            if (order.isPrepaid) {
              prepaidPurchasePriceTemp =
                prepaidPurchasePriceTemp + parseInt(purchasedPrice);
            } else {
              codPurchasePriceTemp =
                codPurchasePriceTemp + parseInt(purchasedPrice);
            }
            overAllProfit = overAllProfit + profit;
          });

          if (createdAt.isBetween(startOfToday, endOfToday)) {
            newOrdersCount++;
            todaySaleTemp = todaySaleTemp + order.totalPrice;
            todayProfitTemp = todayProfitTemp + overAllProfit;
          }

          if (order.isPrepaid) {
            prepaidProfitTemp = prepaidProfitTemp + overAllProfit;
            prepaidShipmentProfit =
              prepaidShipmentProfit + order.shipmentProfit;
          } else {
            codProfitTemp = codProfitTemp + overAllProfit;
            const needToPay = order.totalPrice - order.advancePaid;
            codAdvanceProfitTemp = codAdvanceProfitTemp + order.advancePaid;
            codPendingProfitTemp = codPendingProfitTemp + needToPay;
            codShipmentProfit = codShipmentProfit + order.shipmentProfit;
          }

          totalSalesTemp = totalSalesTemp + order.totalPrice;
          totalProfitTemp = totalProfitTemp + overAllProfit;
        }
      });

      setSalesData({
        codAdvanceProfit: codAdvanceProfitTemp,
        codPendingProfit: codPendingProfitTemp,
        codShipmentProfit,
        prepaidShipmentProfit,
        todaySale: todaySaleTemp,
        purchasedPrice: purchasedPriceTemp,
        codPurchasePrice: codPurchasePriceTemp,
        prepaidPurchasePrice: prepaidPurchasePriceTemp,
        todayProfit: todayProfitTemp,
        codProfit: codProfitTemp,
        prepaidProfit: prepaidProfitTemp,
        totalProfit: totalProfitTemp,
        totalSales: totalSalesTemp,
      });
      setOrdersData({
        orders: ordersTemp.length,
        delivered: deliveredCount,
        pickedUp: pickedUpCount,
        returned: returnedCount,
        rto: rtoCount,
        shipped: shippedCount,
        unDelivered: unDeliveredCount,
        inTransit: inTransitCount,
        newOrders: newOrdersCount,
        outForDelivery: outForDeliveryCount,
      });
      setReplacementData({
        totalReplacement,
        pendingReplacement,
        processingReplacement,
        completedReplacement,
      });
    }
  }, [orders, filteredOrders]);

  // const handlePrint = useReactToPrint({
  //     content: () => cardRef.current,
  // });

  return (
    <div
      ref={cardRef}
      style={{ background: Colors.light1 }}
      className={classes.container}
    >
      <Appbar name={"Dashboard"} />
      <DateRangeFilter
        orders={orders}
        setFilteredOrders={setFilteredOrders}
        cardRef={cardRef}
      />
      <TopCards data={ordersData} />
      {user.isAdmin && (
        <SalesCards data={salesData} totalExpenses={totalExpenses} />
      )}
      <ReplacementCards data={replacementData} />
      {/*<MonthlyAndWeeklyRevenue/>*/}
    </div>
  );
};

export default DashboardPage;
