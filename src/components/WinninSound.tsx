import React from 'react';

const WinningSound: React.FC = () => (
  <audio autoPlay className="player" preload="false">
    <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
  </audio>
);

export default WinningSound;
