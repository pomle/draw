function len(vec1, vec2) {
  const x = Math.abs(vec1.x - vec2.x);
  const y = Math.abs(vec1.y - vec2.y);
  return Math.sqrt(x * x + y * y);
}

export function createDrawer(context, timeout = 200) {
  let nextTime, lastTime = 0;
  let last;

  return function draw(x, y) {
    nextTime = new Date().getTime();
    const pos = {x, y};

    if (last && (nextTime - lastTime) > timeout) {
      console.log(len(last, pos));
      if (len(last, pos) > 5) {
        console.log('Resetting');
        last = pos;
      }
    }

    if (last) {
      context.beginPath();
      context.moveTo(last.x, last.y);
      context.lineTo(pos.x, pos.y);
      context.stroke();
    }

    last = pos;

    lastTime = nextTime;
  }
}
