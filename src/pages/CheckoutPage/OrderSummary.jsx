import { useRef } from "react";
import { randify } from "../../utils/costing";
import { motion } from "framer-motion";
import styles from "./ordersummary.module.css";

const OrderSummary = ({
  notClickable,
  shippingRate,
  paymentErrors,
  cartItems,
  totalPrice,
}) => {
  const ref = useRef();

  const mockAlert = () => {
    alert("Mock Payment Made");
  };

  return (
    <div className={styles.order_items_container}>
      <h4>Order Summary</h4>
      <hr />
      {cartItems.map((item, i) => {
        const { product, orderQty } = item;
        const { name, price, media } = product;
        return (
          <motion.article
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: i * 0.2,
                duration: 0.8,
              },
            }}
            className={styles.order_item_container}
            key={item.product.id}
          >
            <img src={require(`../../assets/images/${media}`)} alt={media} />
            <p>{name}</p>
            <p>{randify(price * orderQty)}</p>
          </motion.article>
        );
      })}
      <hr />
      {[
        ["subtotal", totalPrice],
        ["shipping", shippingRate],
        ["total", totalPrice + shippingRate],
      ].map((indicator) => {
        return (
          <div className={styles.totals_container} key={indicator[0]}>
            <p className={styles.subtotal}>{indicator[0]}</p>
            <p className={styles.total_price}>
              {indicator[1] === null ? "-" : randify(indicator[1])}
            </p>
          </div>
        );
      })}
      <hr />
      <form ref={ref}>
        <motion.button
          initial={{ backgroundColor: "grey" }}
          animate={{
            backgroundColor: notClickable
              ? "hsl(0, 0%, 93%)"
              : "hsl(0, 100%, 50%)",
            transition: { duration: 0.5 },
          }}
          whileHover={{ scale: 1.1 }}
          className={styles.pay_now}
          disabled={notClickable}
          onClick={(e) => mockAlert(e)}
          type="submit"
        >
          Pay Now
        </motion.button>
      </form>
      {paymentErrors && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            marginTop: "1rem",
            padding: "1rem",
            width: "100%",
            color: "white",
          }}
        >
          {Object.values(paymentErrors).map((error) => (
            <p key={error}>{error}</p>
          ))}
          <p>Please contact us for support</p>
        </motion.div>
      )}
    </div>
  );
};

export default OrderSummary;
