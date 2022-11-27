import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import styles from "./productdetail.module.css";
import { motion } from "framer-motion";
import { randify } from "../../utils/costing";
import products from "../../data/resources/data";

const ProductDetailPage = () => {
  const ref = useRef();
  const { id } = useParams();
  const { orderQty, incQty, decQty, addToCart, handleBuyNow } =
    useStateContext();

  const product = products.filter((product) => product.id == id)[0];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.product_detail_container}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div className={styles.product_image_container}>
          <div
            ref={ref}
            style={{
              width: "100%",
            }}
            className={styles.image_inner_container}
          >
            <img
              className={styles.product_image}
              src={require(`../../assets/images/${product.media}`)}
              style={{ width: "100%" }}
              alt={product.media}
              key={id}
            />
          </div>
        </div>
      </div>
      <div className={styles.detail_container}>
        <h1 className={styles.product_name}>{product.name}</h1>
        <p className={styles.product_description}>{product.description}</p>
        <p className={styles.product_price}>{randify(product.price)}</p>
        <p className={styles.product_stock}>
          In Stock: {product.stock_qty} left
        </p>
        <div className={styles.quantity_container}>
          <button className={styles.decrement_button} onClick={decQty}>
            -
          </button>
          <span className={styles.quantity}>{orderQty}</span>
          <button
            className={styles.increment_button}
            onClick={() => incQty(product.stock_qty)}
          >
            +
          </button>
        </div>
        <button
          className={styles.add_to_cart_button}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className={styles.buy_now_button}
          onClick={() => handleBuyNow(product)}
        >
          Buy Now
        </button>
      </div>
    </motion.main>
  );
};

export default ProductDetailPage;
