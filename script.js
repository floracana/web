const amplitude = 2;
const verticalAmplitude = 2;
const rotationAmplitude = 3;
const cursorFactor = 10;
const baseSpeed = 0.02;
let lastTimestamp = null;

const wiggles = document.querySelectorAll('.wiggle');

wiggles.forEach(wiggle => {
  wiggle._angle = Math.random() * 2 * Math.PI;
  wiggle._amplifier = parseFloat(wiggle.getAttribute('ampl')) || 1;
  wiggle._baseSpeed = baseSpeed * (0.5 + Math.random());
  wiggle._targetCursorX = 0;
  wiggle._targetCursorY = 0;
  wiggle._cursorX = 0;
  wiggle._cursorY = 0;

  wiggle.addEventListener('mousemove', (event) => {
    const rect = wiggle.getBoundingClientRect();
    const targetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const targetY = (event.clientY - rect.top - rect.height / 2) / rect.height;
    wiggle._targetCursorX = targetX;
    wiggle._targetCursorY = targetY;
  });

  wiggle.addEventListener('mouseleave', () => {
    wiggle._targetCursorX = 0;
    wiggle._targetCursorY = 0;
  });
});

function animate(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }
  const deltaTime = timestamp - lastTimestamp;
  const speedFactor = deltaTime / (1000 / 60);
  
  wiggles.forEach(wiggle => {
    const easingFactor = 0.1;
    wiggle._cursorX += (wiggle._targetCursorX - wiggle._cursorX) * easingFactor;
    wiggle._cursorY += (wiggle._targetCursorY - wiggle._cursorY) * easingFactor;

    wiggle._angle += wiggle._baseSpeed * speedFactor;
    const angle = wiggle._angle;
    
    const translateX = Math.sin(angle) * amplitude * wiggle._amplifier + (wiggle._cursorX * cursorFactor * wiggle._amplifier);
    const translateY = Math.cos(angle) * verticalAmplitude * wiggle._amplifier + (wiggle._cursorY * cursorFactor * wiggle._amplifier);
    const rotateX = Math.sin(angle) * rotationAmplitude * wiggle._amplifier + (wiggle._cursorY * cursorFactor * wiggle._amplifier);
    const rotateY = Math.cos(angle) * rotationAmplitude * wiggle._amplifier + (wiggle._cursorX * cursorFactor * wiggle._amplifier);
    
    wiggle.style.transform = `
      translate3d(${translateX}px, ${translateY}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });
  
  lastTimestamp = timestamp;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);