import React from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../../helpers/Colors";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  invoiceContainer: {
    position: "relative",
    paddingBottom: "892px",
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

const Invoice = ({ invoiceRef, orders }) => {
  const classes = useStyles();

  return (
    <div ref={invoiceRef}>
      {orders.map((item, i) => {
        return (
          <div id={"invoice-dialog"} className={classes.container} key={i}>
            <div className={classes.invoiceContainer}>
              <header>
                <div>{""}</div>
                <div className={"heading"}>
                  <h2>
                    <span>Note:</span> Opening video is compulsary
                  </h2>
                </div>
              </header>
              <main>
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
                  </div>
                  <div className="to-details">
                    <div className="to-body">
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        To,
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Name : </span>
                        {item.customerName}
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>House : </span>
                        {item.address}
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Pincode : </span>
                        {item.pinCode}
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Mobile no : </span>
                        {item.mobileNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Invoice;
