import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
import Banner from "../Banner/Banner";
import "./Products.css";

const Products = ({ products, onAddToCart }) => {
  return (
    <main className="content">
      <Banner />
      <div className="toolbar" />
      <Grid container justifyContent="center" grid spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
export default Products;
