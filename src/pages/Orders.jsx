import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
function Orders() {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://650edbf854d18aabfe9987ff.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Error");
      }
    })();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>My Orders</h1>
      </div>

      <div className="d-flex flex-wrap" style={{ gap: "30px" }}>
        {(isLoading ? [...Array(8)] : orders).map((item, index) => {
          
          return (
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Orders;
