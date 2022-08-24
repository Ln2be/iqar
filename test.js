const ar = [
  { t: 1, a: 1 },
  { t: 2, a: 2 },
  { t: 2, a: 1 },
  { t: 1, a: 3 },
];

const sorted = ar.sort((a, b) => {
  if (a.t == b.t) {
    if (a.a > b.a) {
      return 1;
    } else {
      return -1;
    }
  } else if (a.t > b.t) {
    return 1;
  } else {
    return -1;
  }
});

const renversed = ar.reverse();

console.log(renversed);
