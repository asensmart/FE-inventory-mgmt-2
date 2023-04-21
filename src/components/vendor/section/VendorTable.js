import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Appbar from "../../../shared/Appbar";
import { Colors } from "../../../helpers/Colors";
import { postVendor } from "../../../helpers/AxiosHelper";
import axios from "axios";
import { backendUrl } from "../../../index";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  container: {
    padding: "25px",
  },
  ton: {
    marginTop: "50px",
    padding: " 10px",
    background: Colors.light,
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& form .dataContainer": {
      display: "flex",
      flexDirection: "column",
      margin: "5px",
      "& .vendorName": {
        margin: "10px 0px",
      },
      "& .shopName": {
        margin: "20px 0px",
      },
      "& input": {
        padding: "5px",
        borderRadius: "5px",
        marginLeft: "5px",
      },
    },
    "& label": {
      color: Colors.dark1,
      fontSize: "20px",
      fontWeight: "bold",
      "& input": {
        marginTop: "10px",
        border: `1px solid ${Colors.light4}`,
        outline: 0,
        // width: '100%',
        padding: "2px 5px ",
        borderRadius: "5px",
        "&::placeholder": {
          color: Colors.light4,
          letterSpacing: "1px",
        },
      },
    },
    // '& input': {
    //     border: '1px solid ',
    //     outline: 0,

    //     width: '100%',
    //     padding: '15px',

    //     '&::placeholder': {
    //         color: Colors.light4,
    //         letterSpacing: '1px'
    //     }
    // },
    "& .inputsubmit": {
      background: Colors.primary,
      padding: "2px 20px 2px 20px",
      border: `1px solid ${Colors.primary}`,
      borderRadius: "5px",
      color: Colors.light,
      fontSize: "20px",
      fontFamily: "inherit",
      transition: "all .5s",
      cursor: "pointer",
      outline: 0,
      margin: "5px",
    },
  },
});
const VendorTable = () => {
  const classes = useStyles();
  const [vendorName, setVendorName] = useState("");
  const [shopName, setShopName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (vendorName.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    if (shopName.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      console.log(`Submitting form with value: ${vendorName} ${shopName}`);
      // TODO: handle form submission here
    }

    // alert(`The vendorName you entered was: ${vendorName},${shopName}`);
    const datas = {
      vendorName,
      shopName,
    };

    if (vendorName !== "" && shopName !== "") {
      axios
        .post(`${backendUrl}/post/vendor`, datas)
        .then((res) => {
          console.log("data posted");
          setVendorName("");
          setShopName("");
          navigate("/vendor");
        })
        .catch((err) => {
          console.log("error", err);
        });
    }

    // postVendor(datas).then(res => {
    //     if (res.data.key === 'success') {
    //         // setMessage({open: true, text: 'Logged In', type: 'success'})
    //         // Navigate('/')
    //         setVendorName('')
    //         setShopName("")
    //         console.log("added vendor");
    //     }
    // }).catch((err) => {
    //     console.log("error", err);
    // })
  };
  return (
    <div className={classes.container}>
      <Appbar name={"VendorTable"} />
      <div className={classes.ton}>
        <form onSubmit={handleSubmit}>
          <div className="dataContainer">
            <div className="vendorName">
              <label>Vendor Name:</label>
              <input
                type="text"
                placeholder="Vendor Name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              />
            </div>

            <div className="shopName">
              <label>Shop Name:</label>
              <input
                type="text"
                placeholder="Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>

          <div style={{textAlign:"center"}}>
            <input type="submit" className={"inputsubmit"} />
          </div>
        </form>
        {/*
         */}
      </div>
    </div>
  );
};

export default VendorTable;
