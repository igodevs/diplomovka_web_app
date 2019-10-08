import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Math: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'red' }}>
      <Link to="/" style={{}}>
        Math
      </Link>
    </div>
  );
};

export default Math;
