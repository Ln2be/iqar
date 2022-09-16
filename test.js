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

console.log(fposts);
function within(price, priceC, percentage) {
  return (
    price * (1 - percentage / 100) <= priceC &&
    priceC <= (percentage / 100 + 1) * price
  );
}
