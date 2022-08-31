import React, { useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import Spinner from "./Spinner";
import axios from "axios";

function AddSaving({
  setShowAddSavingModal,
  showAddSavingModal,
  getSaving,
}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("BOYF-user"));
      setLoading(true);
        await axios.post("/api/saving/add-saving", {
          ...values,
          userid: user._id,
        });
        getSaving();
        message.success("Piggy Bank Updated!");
      
      setShowAddSavingModal(false);
   
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Add Savings"
      visible={showAddSavingModal}
      onCancel={() => setShowAddSavingModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="deposit">Deposit</Select.Option>
            <Select.Option value="withdraw">Withdraw</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddSaving;