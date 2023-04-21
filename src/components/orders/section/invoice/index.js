import React from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../../helpers/Colors";
import logo from "../../../../assets/logo-no-bg.png";
import { ImPhone } from "react-icons/im";
import { BsEnvelopeFill } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import { getGstPrice } from "../../../../helpers/HelperFuctions";

const useStyles = makeStyles({
  container: {
    width: "100%",
    // height: "794px",
  },
  invoiceContainer: {
    position: "relative",
    "& header": {
      background: Colors.light1,
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      "& .heading": {
        // width: "35%",
        // display: "flex",
        // flexDirection: "row-reverse",
        // justifyContent: "flex-end",
        "& h2": {
          color: Colors.dark3,
          margin: "0",
          "& span": {
            fontWeight: "bold",
            textDecoration: "underline",
          },
        },
      },
      "& .details": {
        width: "63%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        "& img": {
          width: "200px",
          marginBottom: "15px",
        },
        "& .address": {
          color: Colors.light,
          margin: "10px 0",
          fontSize: "12px",
        },
        "& .icon-container": {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& .item": {
            display: "flex",
            alignItems: "center",
            "& .icon": {
              color: Colors.dark3,
              background: Colors.light,
              borderRadius: "20px",
              fontSize: "20px",
              padding: "5px",
            },
            "& h6": {
              color: Colors.dark3,
              margin: "8px 0 8px 5px",
              fontSize: "12px",
            },
          },
        },
      },
    },
    "& main": {
      // {/* ************************************************************************* */}
      "& .invoice-details": {
        display: "grid",
        gridGap: "8px",
        gridTemplateColumns: "20% 80%",
        margin: "25px 0",
        width: "100%",
        padding: "0 38px",
        "& .from-details": {
          border: "1px solid #000000",
          padding: "12px 16px",
          display: "flex",
          alignItems: "left",
          justifyContent: "space-between",
          flexDirection: "column",
          "& .from-top": {
            "& .from-heading": {
              fontSize: "32px",
              fontWeight: "bold",
              textDecoration: "underline",
            },
            "& .shop-name": {
              fontSize: "24px",
            },
          },
          "& .from-bottom": {
            "& .note-heading": {
              fontSize: "32px",
              fontWeight: "bold",
              textDecoration: "underline",
            },
            "& .note-content": {
              fontSize: "24px",
            },
          },
        },
        "& .to-details": {
          border: "1px solid #000000",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          "& .to-body": {
            "& div": {
              fontweight: "bolder",
            },
          },
        },
      },
      // {/* ************************************************************************* */}
      "& .product-table": {
        margin: "25px 0",
        "& .product-item": {
          display: "flex",
          padding: "12px 0",
          "& .description": {
            width: "40%",
            fontWeight: "bold",
            marginLeft: "40px",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
          "& .price": {
            width: "20%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
          "& .quantity": {
            width: "20%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
          "& .total": {
            width: "20%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
        },
        "& .product-item:nth-child(even)": {
          display: "flex",
          padding: "12px 0",
          background: Colors.light1,
          "& .description": {
            width: "40%",
            marginLeft: "40px",
            fontWeight: "bold",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
          "& .price": {
            width: "20%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
          "& .quantity": {
            width: "20%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
          "& .total": {
            width: "20%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "12.5px",
            color: Colors.dark3,
          },
        },
      },
      "& .payment-methods": {
        // paddingLeft: '40px',
        width: "100%",
        "& .title": {
          fontSize: "12px",
          color: Colors.dark3,
          fontWeight: "bold",
          marginLeft: "40px",
          marginBottom: "5px",
        },
        "& .flex-container": {
          display: "flex",
          justifyContent: "flex-end",
          "& .methods": {
            width: "calc(60% - 40px)",
            "& .secondary-line": {
              height: "4px",
              width: "100%",
              background: Colors.secondary,
              margin: "0 0 5px",
            },
            "& h6": {
              fontSize: "12px",
              fontWeight: "700",
              color: Colors.success,
              textTransform: "uppercase",
              margin: 0,
              "& span": {
                fontWeight: "normal",
              },
            },
          },
          "& .all-price-con": {
            width: "40%",
            "& .sub-total": {
              display: "flex",
              "& div": {
                width: "50%",
                background: Colors.light,
                display: "flex",
                height: "40px",
                alignItems: "center",
                "& h6": {
                  color: Colors.dark3,
                  margin: 0,
                  fontSize: "13px",
                  "& span": {
                    color: Colors.success,
                  },
                },
              },
            },
            "& .grand-total": {
              display: "flex",
              "& div": {
                width: "50%",
                background: Colors.secondary,
                display: "flex",
                height: "40px",
                alignItems: "center",
                "& h6": {
                  color: Colors.light,
                  margin: 0,
                  fontSize: "13px",
                },
              },
            },
          },
        },
      },
      "& .thank-you": {
        width: "40%",
        margin: "20px 0 20px 40px",
        "& h5": {
          color: Colors.dark3,
          fontSize: "16px",
        },
        "& h6": {
          color: Colors.dark3,
          fontSize: "12px",
          marginBottom: "4px",
        },
      },
    },
    "& .action-container": {
      top: -10,
      left: 0,
      background: "#fff",
      position: "absolute",
    },
  },
});

const Invoice = ({ invoiceRef, order }) => {
  const classes = useStyles();

  const {
    shipmentProfit,
    gstPercentage,
    orderId,
    pinCode,
    customerName,
    email,
    isPrepaid,
    mobileNumber,
    orderedDate,
    totalPrice,
    address,
  } = order;

  return (
    <div ref={invoiceRef} id={"invoice-dialog"} className={classes.container}>
      <div className={classes.invoiceContainer}>
        <header>
          <div>{""}</div>
          <div className={"heading"}>
            <h2>
              <span>Note:</span> Opening video is compulsary
            </h2>
          </div>
          {/* <div className={"details"}>
            <img src={logo} alt={"Logo"} />
            <div className={"icon-container"}>
              <div className={"item"}>
                <ImPhone className={"icon"} />
                <h6>+917200107045</h6>
              </div>
              <div className={"item"}>
                <BsEnvelopeFill className={"icon"} />
                <h6>fashionkings@gmail.com</h6>
              </div>
              <div className={"item"}>
                <FaGlobe className={"icon"} />
                <h6>www.fashionkings.com</h6>
              </div>
            </div>
          </div> */}
        </header>
        <main>
          {/* <div className={"invoice-detail"}>
            <div className={"invoice-address"}>
              <h6>Invoice to</h6>
              <h5>{customerName}</h5>
              <p>
                {address} - {pinCode}
              </p>
              <p>Ph: {mobileNumber}</p>
              <p>Email: {email}</p>
            </div>
            <div className={"invoice-date"}>
              <div className={"secondary-line"} />
              <h6>
                INVOICE NO: <span>{orderId}</span>
              </h6>
              <h6>
                INVOICE DATE: <span>{new Date().toDateString()}</span>
              </h6>
              <h6>
                ORDERED DATE:{" "}
                <span>{new Date(orderedDate).toDateString()}</span>
              </h6>
            </div>
          </div> */}
          {/* ************************************************************************* */}
          <div className={"invoice-details"}>
            <div className="from-details">
              <div className="from-top">
                <div className="from-heading">From:</div>
                <div className="shop-name">
                  Fashion
                  <br />
                  Kings
                </div>
              </div>
              {/* <div className="from-bottom">
                <div className="note-heading">Note:</div>
                <div className="note-content">
                  Note
                  <br />
                  content
                </div>
              </div> */}
            </div>
            <div className="to-details">
              <div className="to-body">
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>To,</div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Name : </span>
                  {customerName}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>House : </span>
                  {address}
                </div>
                {/* <div>Area : </div>
                <div>Landmark : </div>
                <div>City : </div>
                <div>State : </div> */}
                <div>
                  <span style={{ fontWeight: "bold" }}>Pincode : </span>
                  {pinCode}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Mobile no : </span>
                  {mobileNumber}
                </div>
                {/* <div>Alternative Mobile no : </div> */}
              </div>
            </div>
          </div>
          {/* ************************************************************************* */}

          {/* <div className={"product-table"}>
            <div className={"product-item"}>
              <div
                className={"description"}
                style={{ color: Colors.primary, fontSize: "14px" }}
              >
                ITEM DESCRIPTION
              </div>
              <div
                className={"price"}
                style={{ color: Colors.primary, fontSize: "14px" }}
              >
                PRICE
              </div>
              <div
                className={"quantity"}
                style={{ color: Colors.primary, fontSize: "14px" }}
              >
                QUANTITY
              </div>
              <div
                className={"total"}
                style={{ color: Colors.primary, fontSize: "14px" }}
              >
                TOTAL
              </div>
            </div>
            {order.products.map((product) => (
              <div className={"product-item"} key={product._id}>
                <div className={"description"}>{product.name}</div>
                <div className={"price"}>{parseInt(product.salesPrice)}</div>
                <div className={"quantity"}>{product.quantity}</div>
                <div className={"total"}>
                  {parseInt(product.salesPrice * product.quantity)}
                </div>
              </div>
            ))}
          </div>
          <div className={"payment-methods"}>
            <h6 className={"title"}>Payment Methods</h6>
            <div className={"flex-container"}>
              <div className={"methods"}>
                <div className={"secondary-line"} />
                <h6>{isPrepaid ? "Prepaid" : "Cash on delivery"}</h6>
              </div>
              <div className={"all-price-con"}>
                <div
                  className={"sub-total"}
                  style={{
                    borderTop: `4px solid ${Colors.secondary}`,
                    marginBottom: "-4px",
                  }}
                >
                  <div>
                    <h6>SUB TOTAL</h6>
                  </div>
                  <div>
                    <h6>
                      ₹
                      {parseInt(
                        totalPrice -
                          shipmentProfit -
                          getGstPrice(gstPercentage, totalPrice)
                      )}
                    </h6>
                  </div>
                </div>
                <div className={"sub-total"}>
                  <div>
                    <h6>SHIPPING CHARGE</h6>
                  </div>
                  <div>
                    <h6>
                      {shipmentProfit === 0 ? (
                        <span>Free Shipment</span>
                      ) : (
                        `₹${parseInt(shipmentProfit)}`
                      )}
                    </h6>
                  </div>
                </div>
                <div className={"sub-total"}>
                  <div>
                    <h6>GST</h6>
                  </div>
                  <div>
                    <h6>{gstPercentage}%</h6>
                  </div>
                </div>
                <div className={"sub-total"} style={{ marginBottom: "5px" }}>
                  <div>
                    <h6>GST PRICE</h6>
                  </div>
                  <div>
                    <h6>₹{getGstPrice(gstPercentage, totalPrice)}</h6>
                  </div>
                </div>
                <div className={"grand-total"}>
                  <div
                    style={{ width: "calc(50% - 15px)", paddingLeft: "15px" }}
                  >
                    <h6>GRAND TOTAL</h6>
                  </div>
                  <div>
                    <h6>
                      ₹{parseInt(totalPrice)}{" "}
                      <span style={{ fontSize: "13px" }}>(Incl. tax)</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"thank-you"}>
            <h5>Thank You For Your Business</h5>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Invoice;
