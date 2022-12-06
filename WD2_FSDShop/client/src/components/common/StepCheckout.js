import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const StepCheckout = ({step1, step2, step3}) => {
  return (
    <Nav className="justtify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Link to="/shipping">
            <Nav.Link>Shipping &gt;&gt;</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Shipping &gt;&gt;</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Link to="/order">
            <Nav.Link>Order &gt;&gt;</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Order &gt;&gt;</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Link to="/payment">
            <Nav.Link>Payment </Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default StepCheckout;
