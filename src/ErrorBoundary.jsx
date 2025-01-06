import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  // This lifecycle method is called when an error occurs in a child component
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // This method is used to log the error details
  componentDidCatch(error, info) {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error information:', info);
  }

  render() {
    // Fallback UI when an error occurs
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    // If there's no error, render the children components
    return this.props.children;
  }
}

export default ErrorBoundary;
