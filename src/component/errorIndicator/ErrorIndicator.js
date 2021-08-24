import React from 'react';
import { Alert } from 'antd';

import './ErrorIndicator.css';

function ErrorIndicator() {
  return (
    <div className="error-indicator">
      <Alert
        message="Error"
        description="This movie couldn't found."
        type="error"
        showIcon
        className="error-indicator"
      />
    </div>
  );
}

export default ErrorIndicator;
