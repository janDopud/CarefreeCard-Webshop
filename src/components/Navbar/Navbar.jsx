import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import "./Navbar.css";

const Navbar = ({ totalItems }) => {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className="appBar" color="inherit">
        <Toolbar className="toolbar">
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className="title"
            color="inherit"
          >
            <img
              src={require("../../assets/Logo.png")}
              alt="CarefreeCard"
              height="45px"
              className="image"
            />
          </Typography>
          <div className="grow" />
          {location.pathname === "/" && (
            <div>
              <IconButton
                className="button"
                component={Link}
                to="/cart"
                aria-label="Show Cart Items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
