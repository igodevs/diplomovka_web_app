import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

function NavBarButton(props: Props) {
  const { text, onClick } = props;

  return (
    <div className="navigation-button" onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}

export default NavBarButton;
