import rough from 'roughjs/dist/rough.umd';

export const roughSquare = ({ squareElement, squareWidth }) => {
  let rc = rough.svg(squareElement);
  const chessSquare = rc.rectangle(0, 0, squareWidth, squareWidth, {
    roughness: 1.5,
    fill: "#B58863",
    bowing: 3,
    fillStyle: "hachure"
  });
  squareElement.appendChild(chessSquare);
};
