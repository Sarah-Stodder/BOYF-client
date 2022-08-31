import { Progress } from "antd";
import React from "react";
import "../resources/analytics.css";


function Analynics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalDepositTransactions = transactions.filter(
    (transaction) => transaction.type === "deposit"
  );
  const totalWithdrawTransactions = transactions.filter(
    (transaction) => transaction.type === "withdraw"
  );
  const totalDepositTransactionsPercentage =
    (totalDepositTransactions.length / totalTransactions) * 100;
  const totalWithdrawTransactionsPercentage =
    (totalWithdrawTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalDepositTurnover = transactions
    .filter((transaction) => transaction.type === "deposit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalWithdrawTurnover = transactions
    .filter((transaction) => transaction.type === "withdraw")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  console.log(totalWithdrawTurnover);
  const totalDepositTurnoverPercentage =
    (totalDepositTurnover / totalTurnover) * 100;
  const totalWithdrawTurnoverPercentage =
    (totalWithdrawTurnover / totalTurnover) * 100;

  const categories = [
    "education",
    "entertainment",
    "gifts",
    "groceries",
    "housing",
    "investment",
    "medical",
    "miscellaneous",
    "salary",
    "tax",
    "transportation",
    "travel",
    "wages",
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h5>Deposits : {totalDepositTransactions.length}</h5>
            <h5>Withdrawls : {totalWithdrawTransactions.length}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="#5DD64F"
                type="circle"
                percent={totalDepositTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#E5572F"
                type="circle"
                percent={totalWithdrawTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
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
       <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Deposits - By Category</h4>
            {categories.map((category, index) => {
              const amount = transactions
                .filter((t) => t.type == "deposit" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && <div className="category-card">
                  <h5 key={index}>{category}</h5>
                  <Progress strokeColor='#80ed99' percent={((amount / totalDepositTurnover) * 100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Withdrawls - By Category</h4>
            {categories.map((category, index) => {
              const amount = transactions
                .filter((t) => t.type == "withdraw" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
               amount > 0 && <div className="category-card">
                  <h5 key={index}>{category}</h5>
                  <Progress strokeColor='#ae2012' percent={((amount / totalWithdrawTurnover) * 100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analynics;