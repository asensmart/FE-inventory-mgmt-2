import React, { useState, useEffect } from "react";
import Appbar from "../../shared/Appbar";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../helpers/Colors";
import FullScreenProgress from "../../shared/FullScreenProgress";
import PurchaseItem from "./section/PurchaseItem";
import PurchaseTable from "./section/PurchaseTable";
import { getVendors, postPuschaseItem } from "../../helpers/AxiosHelper";

const useStyles = makeStyles({
  container: {
    padding: "25px",
  },
});
const Purchasepage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [tabFiltered, setTabFiltered] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allVendors, setAllVendors] = useState([]);

  // Puschae item -States
  const [selectedOption, setSelectedOption] = useState({
    value: "name",
    label: "Customer Name",
  });
  const [fromDate, setFromDate] = useState(new Date());
  const [customAmt, setCustomAmt] = useState();
  const [payTerm, setPayTerm] = useState("FULL");
  // const [amout, setAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [totalAmt, setTotalAmt] = useState("");
  const [vendorId, setVendorId] = useState("");
  const initialItem = {
    itemName: "",
    qty: 0,
    rate: 0,
    amount: 0,
  };

  const [tableData, setTableData] = useState([]);
  const [addCount, setAddCount] = useState([initialItem]);
  const [isItemFilled, setIsItemFilled] = useState(false);

  useEffect(() => {
    setIsItemFilled(isItemFilled);
  }, [isItemFilled]);

  const submittype = (e) => {
    const Data = {
      vendor_id: vendorId,
      purchaseDate: fromDate,
      paidAmt: customAmt,
      paymentTearm: payTerm,
      items: addCount,
      totalAmt: JSON.stringify(amount),
    };

    // for (let i = 0; i < addCount.length; i++) {
    //   if (addCount[i].itemName === "") {
    //     setIsItemFilled(true);
    //     // alert("Please enter the Product Name");
    //     console.log("Please enter the Product Name");
    //     break;
    //   } else {
    //     setIsItemFilled(false);
    //   }
    // }

    // console.log("isItemFilled --->", isItemFilled);

    if (
      isItemFilled === false &&
      selectedOption !== "" &&
      fromDate !== "" &&
      payTerm !== "" &&
      addCount !== ""
    ) {
      postPuschaseItem(Data)
        .then((res) => {
          console.log("res", res);
          setAddCount([initialItem]);
          setVendorId("");
          setPayTerm("FULL");
          setCustomAmt("");
          alert(res.data.message);
        })
        .catch((err) => {
          console.log("err", err);
          alert(err.response.data.message);
        });
    } else {
      alert("all field required");
    }
  };
  console.log(selectedOption);
  useEffect(() => {
    getVendors()
      .then((res) => {
        // console.log(res.data.data);
        setAllVendors(res.data.data);
      })
      .catch((err) => {
        console.log("Error in @GET/vendor");
      });
  }, []);
  console.log(allVendors);

  return (
    <div className={classes.container}>
      <Appbar name={"purchase"} />
      <PurchaseItem
        vendorId={vendorId}
        setVendorId={setVendorId}
        setFilteredData={setFilteredData}
        tabFiltered={tabFiltered}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        fromDate={fromDate}
        setFromDate={setFromDate}
        customAmt={customAmt}
        setCustomAmt={setCustomAmt}
        payTerm={payTerm}
        setPayTerm={setPayTerm}
        allVendors={allVendors}
        setAllVendors={setAllVendors}
      />
      <PurchaseTable
        setTotalAmt={setTotalAmt}
        tabFiltered={tabFiltered}
        filteredData={filteredData}
        submittype={submittype}
        addCount={addCount}
        setAddCount={setAddCount}
        initialItem={initialItem}
        setAmount={setAmount}
        amount={amount}
      />
      <FullScreenProgress open={loading} setOpen={setLoading} />
    </div>
  );
};

export default Purchasepage;
