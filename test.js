const posts = [
  {
    deps: ["T", "K", "Dn"],
  },
  {
    deps: ["Dn", "Sb", "El"],
  },
  {
    deps: ["El", "To", "Ry"],
  },
];

const query = ["To"];

const result = posts.filter((value) => {
  return value.deps.filter((value) => query.includes(value)).length > 0;
});

// const result = posts.map((post) => {
//   const cross = post.deps.filter((value) => query.includes(value));
//   console.log(cross);
//   if (cross.length > 0) {
//     return post;
//   } else {
//     return;
//   }
// });
console.log(result);
