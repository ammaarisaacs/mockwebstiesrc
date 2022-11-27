import { useState, useEffect } from "react";
import Product from "./Product/Product";
import styles from "./products.module.css";
import { motion } from "framer-motion";
import { filterIcons } from "../../data/icons";
import { Button, Menu } from "../../components";
import products from "../../data/resources/data";

const Products = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [productList, setProductList] = useState(products);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);

  const SearchFilterProducts = (searchQuery, category) => {
    const newList = products.filter(
      (product) =>
        product.name.includes(searchQuery) ||
        product.description.includes(searchQuery)
    );

    const finalList = newList.filter(
      (product) => category.indexOf(product.category) >= 0
    );

    setProductList(finalList);
  };

  const handleFilter = (query) => {
    if (category.includes(query)) {
      return setCategory((prevCategories) =>
        prevCategories.filter((category) => category != query)
      );
    }
    setCategory((prevCategories) => [...prevCategories, query]);
  };

  const handleClear = () => {
    setCategory("");
    setSearchQuery("");
    setSearch(!search);
    setProductList(products);
  };

  useEffect(() => {
    if (category.length > 0 || searchQuery.length > 0) {
      SearchFilterProducts(searchQuery, category);
    } else {
      setProductList(products);
    }
  }, [category, search]);

  const menuProps = {
    show: showMenu,
    filters: filterIcons,
    handleFilter: handleFilter,
    category: category,
  };

  const searchProps = {
    text: "search",
    onClick: () => setSearch(!search),
  };

  const filterProps = {
    text: "filter",
    media: true,
    onClick: () => setShowMenu(!showMenu),
  };

  const clearProps = {
    text: "clear",
    onClick: handleClear,
  };

  const filterVariants = {
    grow: {
      width: "100%",
      transition: {
        duration: 0.3,
      },
    },
    shrink: {
      width: "0%",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className={styles.container}
    >
      <div className={styles.sort_section}>
        <div className={styles.search__container}>
          <input
            className={styles.search_bar}
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Button {...searchProps} />
        </div>

        {filterIcons.map(({ name, query }) => (
          <motion.button
            whileHover={{ y: -5 }}
            className={styles.filter_button}
            key={name}
            onClick={() => {
              handleFilter(query);
            }}
          >
            <img
              className={styles.filter_icons}
              src={require(`../../assets/images/${name}`)}
              alt={name}
            />
            <motion.div
              className={styles.filter_underline}
              initial={{ width: 0 }}
              variants={filterVariants}
              animate={category.includes(query) ? "grow" : "shrink"}
            />
          </motion.button>
        ))}
        <Button {...filterProps} />
        <Button {...clearProps} />
        <Menu {...menuProps} />
      </div>

      <motion.div layout className={styles.products_grid}>
        {productList.length > 0 ? (
          productList.map((product) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <motion.main
            style={{
              fontSize: "1rem",
              width: "fit-content",
              maxWidth: 500,
              display: "flex",
              alignItems: "center",
              margin: "auto",
              textAlign: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            No Products
          </motion.main>
        )}
      </motion.div>
    </motion.main>
  );
};

export default Products;
