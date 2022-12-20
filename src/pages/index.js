import stockTimeSeries from "../api";
import React, { useState } from "react";
import {
  LineChart,
  XAxis,
  CartesianGrid,
  Line,
  Tooltip,
  YAxis,
  Label,
} from "recharts";

function IndexPage() {
  const [responseData, setResponseData] = useState("");
  const [ticker, setTicker] = useState("");
  const [message, setMessage] = useState("");

  function fetchData(e) {
    e.preventDefault();

    setMessage("Loading...");
    stockTimeSeries(ticker)
      .then((response) => {
        setResponseData(response.data);
        setMessage("");
      })
      .catch((error) => {
        setMessage("Error");
        console.error(error);
      });
  }
  return (
    <div
      style={{
        background: "#EEE",
        padding: "5%",
        fontFamily: '"Lucida Console", Monaco, monospace',
      }}
    >
      <h1
        style={{
          background: "black",
          color: "white",
          padding: "1rem",
          display: "inline-block",
        }}
      >
        Gatsby Stock Market App
      </h1>
      <h2>Analyze Stock Data</h2>
      <form onSubmit={fetchData}>
        <fieldset>
          <legend>Search Stock Market</legend>
          <label htmlFor="ticker">
            Enter stock ticker
            <input
              required
              name="ticker"
              id="ticker"
              type="text"
              placeholder="SPY"
              value={ticker}
              onChange={(e) => {
                setTicker(e.target.value);
              }}
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      <p>{message}</p>
      <h3>Symbol: {responseData ? responseData.symbol : ""}</h3>
      <p>Daily Time Series with Splits and Dividend Events</p>
      <small>Last Refresh: {responseData ? responseData.refreshed : ""}</small>
      <LineChart
        width={900}
        height={500}
        data={responseData.closePrices}
        margin={{ top: 50, right: 20, left: 10, bottom: 5 }}
      >
        <YAxis tickCount={10} type="number" width={80}>
          <Label value="Close Price" position="insideLeft" angle={270} />
        </YAxis>
        <Tooltip />
        <XAxis
          padding={{ left: 5, right: 5 }}
          tickCount={10}
          angle={-60}
          height={90}
          dataKey="date"
        />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="close" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </div>
  );
}

export default IndexPage;
