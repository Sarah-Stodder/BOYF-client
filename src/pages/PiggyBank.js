import { DatePicker, Form, message, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddSaving from "../components/AddSaving";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import "../resources/transactions.css";
import { Progress } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Analatics from "../components/Analytics.js";
const { RangePicker } = DatePicker;




function PiggyBank() {
  const [showAddSavingModal, setShowAddSavingModal] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [savingData, setSavingData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");

  

  const getSaving = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("BOYF-user"));

      setLoading(true);
      const response = await axios.post(
        "/api/saving/get-all-saving",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      setSavingData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  const deleteSaving = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/saving/delete-saving", {
        savingId: record._id,
      });
      message.success("Saving Deleted successfully");
      getSaving();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  }; 
  const saving = savingData
  const totalTurnover = saving.reduce(
    (acc, saving) => acc + saving.amount,
    0
  );
  const totalDepositTurnover = saving
  .filter((saving) => saving.type === "deposit")
  .reduce((acc, saving) => acc + saving.amount, 0);
const totalWithdrawTurnover = saving
  .filter((saving) => saving.type === "withdraw")
  .reduce((acc, saving) => acc + saving.amount, 0);
console.log(totalWithdrawTurnover);
const totalDepositTurnoverPercentage =
  (totalDepositTurnover / totalTurnover) * 100;
const totalWithdrawTurnoverPercentage =
  (totalWithdrawTurnover / totalTurnover) * 100;

  useEffect(() => {
    getSaving();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <DeleteOutlined className="mx-3" onClick={()=>deleteSaving(record)}/>
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="deposit">Deposit</Select.Option>
              <Select.Option value="withdraw">Withdraw</Select.Option>
            </Select>
          </div>
        </div>
        <div>
          <button
            className="primary"
            onClick={() => setShowAddSavingModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
          
              <div className="table-analtics">
                  <div className="col-md-6 mt-3">
                      <div className="transactions-count">
                          <h4>Total : {totalDepositTurnover - totalWithdrawTurnover}</h4>
                          <hr />
                          <h5>Deposits : {totalDepositTurnover}</h5>
                          <h5>Withdrawls : {totalWithdrawTurnover}</h5>


                          <div className="progress-bars">
                              <Progress
                                  className="mx-5"
                                  strokeColor="#5DD64F"
                                  type="circle"
                                  percent={totalDepositTurnoverPercentage.toFixed(0)}
                              />
                              <Progress
                                  strokeColor="#E5572F"
                                  type="circle"
                                  percent={totalWithdrawTurnoverPercentage.toFixed(0)}
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="table">
              <Table columns={columns} dataSource={savingData} />
              </div>
          
      {showAddSavingModal && (
        <AddSaving
          showAddSavingModal={showAddSavingModal}
          setShowAddSavingModal={setShowAddSavingModal}
         
          getSaving={getSaving}

        />
      )}

    </DefaultLayout>
  );
}

export default PiggyBank;