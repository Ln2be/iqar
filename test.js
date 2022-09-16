const posto = {
  price: 100,
};

const posts = [
  {
    price: 180,
  },
  {
    price: 20,
  },
  {
    price: 51,
  },
  {
    price: 149,
  },
  {
    price: 81,
  },
  {
    price: 119,
  },
];

const fposts = posts.filter((post) => within(posto.price, post.price, 50));
const sposts = fposts.sort((post1, post2) => {
  if (within(posto.price, post1.price, 20)) {
    return 1;
  } else if (within(posto.price, post1.price, 20)) {
    return -1;
  } else {
    return 0;
  }
});

sposts.reverse();
console.log(sposts);
function within(price, priceC, percentage) {
  return (
    price * (1 - percentage / 100) <= priceC &&
    priceC <= (percentage / 100 + 1) * price
  );
}
