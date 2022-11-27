import { useEffect, useState } from "react";
import styles from "./carouselfm.module.css";
import { Blob, DrawPath } from "../../../components";
import { carouselDrawPath, carouselPaths } from "../../../data/paths";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import products from "../../../data/resources/data";

const CarouselFM = () => {
  const [width, setWidth] = useState(0);

  const [carouselRef, inView, entry] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) setWidth(entry.target.scrollWidth - entry.target.offsetWidth);
  }, [inView]);

  return (
    <motion.div ref={carouselRef} className={styles.track}>
      <Blob
        paths={carouselPaths}
        minWidth={800}
        threshold={0.8}
        growTime={1}
        morphAt={0.3}
        morphTime={1}
        animateWhen={inView}
        viewBox={[0, 0, 1806, 847]}
        top="50%"
        left="50%"
        translateX="-50%"
        translateY="-50%"
        width="100%"
        color="#F4F0FF"
      />
      <DrawPath
        path={carouselDrawPath}
        viewBox={[0, 0, 1580, 594]}
        top="40%"
        left="50%"
        translateX="-50%"
        translateY="-50%"
        width="110%"
        minWidth={400}
        thickness={4}
        drawTime={2}
        animateWhen={inView}
        zIndex={-1}
      />
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className={styles.slider}
      >
        {products?.map((product, i) => {
          const { id, name, price, description, media } = product;
          return (
            <motion.article
              key={id}
              initial={{ opacity: 0, x: 200 }}
              animate={inView && { opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, ease: "easeOut", duration: 1 }}
            >
              <img src={require(`../../../assets/images/${media}`)} />
              <div className={styles.carousel_info}>
                <h3>{name}</h3>
                <p>{price}</p>
                <p>{description}</p>
                <Link to={`products/${id}`}>
                  <button>details</button>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CarouselFM;
