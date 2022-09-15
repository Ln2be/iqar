function f(cb) {
  if (typeof cb == "function") {
    const a = cb(5);
    console.log(a);
  } else if (typeof cb == "number") {
    console.log(cb * 66);
  }
}

f(7);
