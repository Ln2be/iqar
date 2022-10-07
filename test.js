const lasttime = new Date("9-9-2022");

function lapsedTime(lasttime, nbweeks) {
  const now = Date.now();

  const diff = now - lasttime;
  const msinweek = 1000 * 3600 * 24 * 7;

  const weeks = diff / msinweek;

  const result = Math.round(weeks / nbweeks);
  console.log(result);
}

lapsedTime(lasttime, 1);
