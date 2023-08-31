import { Button } from "@mui/material";
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "50px", color: "gray" }}>Something went wrong.</h1>
          <Button
            variant='outlined'
            className='sidebar__tweet'
            style={{
              fontSize: "18px",
              maxWidth: "500px",
              marginInline: "auto",
            }}
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
