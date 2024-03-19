const start = new Date().getTime();

const originPosition = {
  x: 0,
  y: 0,
};

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition,
};

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 0,
  maximumGlowPointSpacing: 10,
  colors: ["81 187 147", "81 187 147"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"],
};

let count = 0;
// Get a sudo random number and choose direction
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// Set a random number from the list and create an array with this, rounded
const selectRandom = (items) => items[rand(0, items.length - 1)];
//Set the value and unit to animate
const withUnit = (value, unit) => `${value}${unit}`;
// Set the Pixel count to the value
const px = (value) => withUnit(value, "px");
// Set the movement scale
const ms = (value) => withUnit(value, "ms");

// Find the calculated distance from mouse and object
const calcDistance = (a, b) => {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

// Calculate the elapsed time from object create
const calcElapsedTime = (end) => end - start;

// Append elements together and link them
const appendElement = (element) => document.body.appendChild(element);

// Remove elements after decay
const removeElement = (element, delay) =>
  setTimeout(() => document.body.removeChild(element), delay);


// Create the star object
const createStar = (position) => {
  const star = document.createElement("span");
  const color = selectRandom(config.colors);

  star.className = "star fa-solid fa-sparkle";

  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);

  appendElement(star);

  removeElement(star, config.starAnimationDuration);
};


// Create the glow point at pos
const createGlowPoint = (position) => {
  const glow = document.createElement("div");

  glow.className = "glow-point";

  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow);

  removeElement(glow, config.glowDuration);
};

// Random config for glow point quantity
const determinePointQuantity = (distance) =>
  Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

const createGlow = (last, current) => {
  const distance = calcDistance(last, current);
  const quantity = determinePointQuantity(distance);

  const dx = (current.x - last.x) / quantity;
  const dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
    const x = last.x + dx * index;
    const y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
};

const updateLastStar = (position) => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
};

const updateLastMousePosition = (position) => (last.mousePosition = position);

const adjustLastMousePosition = (position) => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};
// How the obj should react on move
const handleOnMove = (e) => {
  const mousePosition = { x: e.clientX, y: e.clientY };

  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime();
  const hasMovedFarEnough =
    calcDistance(last.starPosition, mousePosition) >=
    config.minimumDistanceBetweenStars;
  const hasBeenLongEnough =
    calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
// Check if the mouse has moved enough to create the obj
  if (hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);

    updateLastStar(mousePosition);
  }
  // Create a glow at last mouse pos
  createGlow(last.mousePosition, mousePosition);
  // Find the mouse an update the pos data
  updateLastMousePosition(mousePosition);
};

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);
