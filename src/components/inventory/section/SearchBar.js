import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { HiSearch } from "react-icons/hi";
import { Colors } from "../../../helpers/Colors";
import Select from "react-select";
import AddProductModal from "./AddProductModal";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "../../../shared/Snackbar";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    margin: "20px 0",
    gridGap: "10px",
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
      padding: "0 8px",
      background: Colors.light,
      borderRadius: "5px",
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
    "& .add-order": {
      background: Colors.primary,
      border: `1px solid ${Colors.primary}`,
      borderRadius: "5px",
      color: Colors.light,
      padding: "5px 10px",
      fontSize: "16px",
      outline: 0,
      fontFamily: "inherit",
      transition: "all .5s",
      cursor: "pointer",
      "&:hover": {
        background: Colors.light,
        color: Colors.primary,
      },
    },
  },
});

const SearchBar = ({
  setLoading,
  setProducts,
  isModalOpen,
  products,
  filteredData,
  setIsModalOpen,
  editData,
  setEditData,
  setFilteredData,
}) => {
  const classes = useStyles();

  const [selectedOption, setSelectedOption] = useState({
    value: "name",
    label: "Product name",
  });
  const [message, setMessage] = useState({
    open: false,
    text: "",
    type: "success",
  });

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  useEffect(() => {
    if (products.length > 0) {
      setFromDate(new Date(products[products.length - 1].createdAt));
      setToDate(new Date(new Date(products[0].createdAt)));
      setMinDate(new Date(products[products.length - 1].createdAt));
      setMaxDate(new Date(products[0].createdAt));
    }
  }, [products]);

  const options = [
    { value: "name", label: "Product name" },
    { value: "vendor", label: "Vendor name" },
  ];

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue !== "") {
      const filteredData = products.filter((p) => {
        if (selectedOption.value === "name") {
          return p.name.toLowerCase().includes(searchValue.toLowerCase());
        } else {
          return p.vendorId.vendorName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
      });
      if (filteredData.length > 0) {
        setFilteredData(filteredData);
      } else {
        setMessage({ open: true, text: "Nothing found", type: "error" });
        setFilteredData([]);
      }
    } else {
      setFilteredData([]);
    }
  }, [searchValue]);

  const onSelectChange = (so) => {
    setSelectedOption(so);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFromDateChange = (date) => {
    // const filtered = products.filter(p => new Date(p.createdAt).getTime() >= date.getTime())
    // if (filtered.length > 0) {
    //     setFilteredData(filtered)
    // } else {
    //     setMessage({open: true, text: 'Nothing found', type: 'error'})
    //     setFilteredData([])
    // }
    setFromDate(date);
  };

  useEffect(() => {
    const filteredDataTemp = products.filter((order) => {
      const orderedAtDate = new Date(order.createdAt);
      return (
        fromDate.getTime() <= orderedAtDate.getTime() &&
        toDate.getTime() >= orderedAtDate.getTime()
      );
    });

    if (filteredDataTemp.length > 0) {
      setFilteredData(filteredDataTemp);
    } else {
      setFilteredData([]);
    }
  }, [fromDate, toDate]);

  const handleToDateChange = (date) => {
    // const filtered = products.filter(p => new Date(p.createdAt).getTime() <= date.getTime())
    // if (filtered.length > 0) {
    //     setFilteredData(filtered)
    // } else {
    //     setMessage({open: true, text: 'Nothing found', type: 'error'})
    //     setFilteredData([])
    // }
    setToDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.container}>
        <div className={"search-con"}>
          <HiSearch className={"icon"} />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder={"Search for customer name, products...."}
          />
        </div>
        <Select
          value={selectedOption}
          onChange={onSelectChange}
          inputValue={""}
          options={options}
        />
        <div className={"date-picker"}>
          <KeyboardDatePicker
            margin="normal"
            format="dd/MM/yyyy"
            value={fromDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleFromDateChange}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </div>
        <div className={"date-picker"}>
          <KeyboardDatePicker
            margin="normal"
            format="dd/MM/yyyy"
            value={toDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleToDateChange}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </div>
        {/* <button className={"add-order"} onClick={showModal}>
          Add Product
        </button> */}
        <AddProductModal
          setProducts={setProducts}
          editData={editData}
          setEditData={setEditData}
          setFilteredData={setFilteredData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setLoading={setLoading}
        />
        <Snackbar message={message} setMessage={setMessage} />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default SearchBar;
