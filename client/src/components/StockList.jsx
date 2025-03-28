import { useState, useEffect } from "react";
import finnhub from "../apis/finnhub";

const StockList = () => {
  const [stock, setStock] = useState([]);
  const [watchlist, setWatchlist] = useState(["GOOGL", "MSFT", "AMZN", "TLSA"]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchlist.map((stock) => {
            return finnhub.get("/quote", {
              params: {
                Symbol: stock,
              },
            });
          })
        );
        console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (error) {}
    };
    fetchData();
    return () => (isMounted = false);
  }, []);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">PClose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr className="table-row " >
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td>{stockData.data.d}</td>
                <td>{stockData.data.dp}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
