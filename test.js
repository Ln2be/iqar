function mfilter(posts, kind) {
  return posts.filter((post) => {
    const type = post.type;
    const price = post.price;
    const renttype = type == "demandRent" || type == "offerRent";
    const selltype = type == "selling" || type == "buying";

    function pricewithin(low, high) {
      return low <= price && price <= high;
    }

    const kindSearch = {
      perio: post.periority && post.periority > 1,
      rent: renttype,
      lowPrice: selltype && pricewithin(0, 4),
      mediumPrice: selltype && pricewithin(4, 15),
      highPrice: selltype && pricewithin(15, 30),
      veryhighPrice: selltype && pricewithin(30, 300),
    };
    return kindSearch[kind];
  });
}

const posts = [
  {
    type: "demandRent",
    price: 2,
  },
  {
    type: "offerRent",
    price: 2,
  },
  {
    type: "selling",
    price: 2,
  },
  {
    type: "buying",
    price: 2,
  },
  {
    type: "stay",
    price: 2,
  },
  {
    type: "demandRent",
    price: 4,
  },
];

const f = mfilter(posts, "lowPrice");

console.log(f);
