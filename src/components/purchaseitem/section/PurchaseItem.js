import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import Snackbar from "../../../shared/Snackbar";
import { Radio } from "@mui/material";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
// import Select from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import { getVendors } from "../../../helpers/AxiosHelper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const useStyles = makeStyles({
  container: {
    background: Colors.light,
    marginTop: "50px",
    padding: "20px",
    "& label": {
      color: Colors.dark1,
      fontSize: "16px",
      fontWeight: "bold",
      "& input": {
        marginTop: "10px",
        border: `1px solid ${Colors.light4}`,
        outline: 0,
        // width: '100%',
        padding: "10px ",
        borderRadius: "5px",

        "&::placeholder": {
          color: Colors.light4,
          letterSpacing: "1px",
        },
      },
    },
    "& .ton": {
      display: "grid",
      // background:'red',
      // justifyContent:'space-between',
      // alignItems:'center',
      // padding: "20px",
      gridTemplateColumns: "2fr 1fr 2fr ",
      gridGap: "20px",
      marginBottom: "20px",
      fontSize: "22px",
      "& label": {
        color: Colors.dark1,
        fontSize: "20px",
        fontWeight: "bold",
        "& input": {
          marginTop: "10px",
          border: `1px solid ${Colors.light4}`,
          outline: 0,
          // width: '100%',
          padding: "10px ",
          borderRadius: "5px",

          "&::placeholder": {
            color: Colors.light4,
            letterSpacing: "1px",
          },
        },
      },

      "& .optionvalue": {
        background: Colors.light,
        // fontSize: '14px',
        color: Colors.dark3,
        margin: "0",
        borderRadius: "5px",
        border: `1px solid ${Colors.light4}`,
      },
    },
    "& .paymentMethod": {
        color: Colors.dark1,
        fontSize: "20px",
        fontWeight: "bold",
    },
    "& .search-con": {
      display: "flex",
      padding: "7px",
      background: Colors.light,
      borderRadius: "5px",
      border: `1px solid ${Colors.light2}`,
      "& .icon": {
        color: Colors.light4,
        fontSize: "22px",
      },
      "& input": {
        border: 0,
        outline: 0,
        marginLeft: "8px",
        width: "80%",
        "&::placeholder": {
          color: Colors.light2,
          letterSpacing: "1px",
        },
      },
    },
    "& .date-picker": {
      border: `1px solid ${Colors.light2}`,
      padding: "5px 8px",
      background: Colors.light,
      borderRadius: "5px",
      marginTop: "5px",
      "& .MuiIconButton-root": {
        padding: "0 !important",
      },
      "& .MuiSvgIcon-root": {
        color: Colors.primary,
      },
      "& .MuiFormControl-marginNormal": {
        marginTop: "1px !important",
        marginBottom: "0px !important",
      },
    },
    " & .inputtags": {
      // padding: "10px",
      display: "flex",
      marginLeft: "-10px",
      "& div": {
        // marginRight: '10px',
        display: "flex",
        alignItems: "center",
        "& h6": {
          fontSize: "14px",
          color: Colors.dark3,
          margin: "0",
          marginRight: "10px",
        },
      },
    },
  },
});

const PurchaseItem = ({
  vendorId,
  setVendorId,
  setFilteredData,
  tabFiltered,
  selectedOption,
  setSelectedOption,
  fromDate,
  setFromDate,
  customAmt,
  setCustomAmt,
  payTerm,
  setPayTerm,
  setAllVendors,
  allVendors,
}) => {
  const classes = useStyles();
  const [message, setMessage] = useState({
    open: false,
    text: "",
    type: "success",
  });

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleChange = (event) => {
    setPayTerm(event.target.value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.container}>
        <div className={"ton"}>
          <div>
            <label>Vendor name</label>
            <br />
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <Select
                value={vendorId}
                onChange={(e) => {
                  // console.log("vendor id --->", e.target.value);
                  setVendorId(e.target.value);
                }}
              >
                <MenuItem disabled>
                  <em>Select Vendor</em>
                </MenuItem>
                {allVendors.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item._id}>
                      {item.vendorName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <label>Date picker</label>
            <div className={"date-picker"}>
              <KeyboardDatePicker
                margin="normal"
                format="dd/MM/yyyy"
                value={fromDate}
                onChange={handleFromDateChange}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </div>
          </div>
        </div>
        <label className="paymentMethod">Payment Method</label>
        <div className="inputtags">
          <div>
            <Radio
              color={"primary"}
              value="FULL"
              checked={payTerm === "FULL"}
              onChange={handleChange}
              name="paymentTerm"
            />
            <h6>FULL</h6>
          </div>
          <div>
            <Radio
              color={"primary"}
              value="HALF"
              checked={payTerm === "HALF"}
              onChange={handleChange}
              name="paymentTerm"
            />
            <h6>HALF</h6>
          </div>
          <div>
            <Radio
              color={"primary"}
              value="CUSTOM"
              checked={payTerm === "CUSTOM"}
              onChange={handleChange}
              name="paymentTerm"
            />
            <h6>CUSTOM</h6>
            <input
              type={"number"}
              disabled={payTerm === "CUSTOM" ? false : true}
              value={customAmt}
              onChange={(e) => {
                setCustomAmt(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <Snackbar message={message} setMessage={setMessage} />
    </MuiPickersUtilsProvider>
  );
};

export default PurchaseItem;
