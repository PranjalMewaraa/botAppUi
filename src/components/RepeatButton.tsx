import React from 'react';

type RepeatButtonProps = {
  onClick: () => void;
};

const RepeatButton: React.FC<RepeatButtonProps> = ({ onClick }) => (
  <button aria-label="Play again." id="repeatButton" onClick={onClick}></button>
);

export default RepeatButton;
