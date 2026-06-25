import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Section failed to load:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "80px 24px",
            textAlign: "center",
            fontFamily: "var(--mono)",
            fontSize: "12px",
            color: "var(--outline)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <p style={{ marginBottom: "12px" }}>Something went wrong loading this section.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              background: "none",
              border: "1px solid var(--outline-variant)",
              color: "var(--on-surface)",
              padding: "10px 20px",
              cursor: "pointer",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
