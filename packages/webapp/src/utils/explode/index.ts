// This explosion function has been adapted from source https://codepen.io/explosion/pen/zKEovE
// MIT Licensed by default according to codepen documentation: https://blog.codepen.io/documentation/licensing/

const colors = ["#d6bcfa", "#fbb6ce", "#6b46c1"];
const bubbles = 3;

const r = (a: number, b: number, c: boolean) =>
  parseFloat(
    (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(
      Number(c ? c : 0)
    )
  );

const explode = (x: number, y: number) => {
  y = y - 40;
  let particles = [];
  let ratio = window.devicePixelRatio;
  let c = document.createElement("canvas");
  let ctx = c.getContext("2d");

  c.style.position = "absolute";
  c.style.left = x - 100 + "px";
  c.style.top = y - 100 + "px";
  c.style.pointerEvents = "none";
  c.style.width = 200 + "px";
  c.style.height = 200 + "px";
  // @ts-ignore
  c.style.zIndex = 100;
  c.width = 300 * ratio;
  c.height = 300 * ratio;
  document.body.appendChild(c);

  for (var i = 0; i < bubbles; i++) {
    particles.push({
      x: c.width / 2,
      y: c.height / 2,
      radius: r(15, 20, false),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: r(0, 360, true),
      speed: r(4, 8, false),
      friction: 0.9,
      opacity: r(0, 0.5, true),
      yVel: 0,
      gravity: 0.1,
    });
  }

  const myReq = render(particles, ctx, c.width, c.height);

  setTimeout(() => {
    document.body.removeChild(c);
    ctx.clearRect(0, 0, c.width, c.height);
    cancelAnimationFrame(myReq);
  }, 400);
};

const render = (particles: any[], ctx: any, width: number, height: number) => {
  const myReq = requestAnimationFrame(() =>
    render(particles, ctx, width, height)
  );

  ctx.clearRect(0, 0, width, height);

  particles.forEach((p) => {
    p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
    p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);

    p.opacity -= 0.01;
    p.speed *= p.friction;
    p.radius *= p.friction;
    p.yVel += p.gravity;
    p.y += p.yVel;

    if (p.opacity < 0 || p.radius < 0) return;

    ctx.beginPath();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  });

  return myReq;
};

export default explode;
