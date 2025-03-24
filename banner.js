// banner.js

document.addEventListener("DOMContentLoaded", () => {
  const ticker = document.getElementById("ticker");
  const text = ticker.querySelector("p");
  const clone = text.cloneNode(true);
  ticker.appendChild(clone);

  let tickerWidth = ticker.offsetWidth;
  let textWidth = text.offsetWidth;
  let cloneWidth = clone.offsetWidth;

  function moveTicker() {
    text.style.transform = `translateX(${tickerWidth}px)`;
    clone.style.transform = `translateX(${tickerWidth + textWidth}px)`;

    let textPosition = tickerWidth;
    let clonePosition = tickerWidth + textWidth;

    function animate() {
      textPosition -= 1;
      clonePosition -= 1;

      if (textPosition <= -textWidth) {
        textPosition = tickerWidth;
      }

      if (clonePosition <= -cloneWidth) {
        clonePosition = tickerWidth + textWidth;
      }

      text.style.transform = `translateX(${textPosition}px)`;
      clone.style.transform = `translateX(${clonePosition}px)`;

      requestAnimationFrame(animate);
    }

    animate();
  }

  moveTicker();
});
