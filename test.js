const metadata = {
  perio: {
    nn: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
    ns: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    nw: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
  },
  rent: {
    nn: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
    ns: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    nw: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
  },

  lowprice: {
    nn: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
    ns: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    nw: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
  },

  mediumprice: {
    nn: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    ns: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    nw: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
  },

  highprice: {
    nn: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    ns: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    nw: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
  },

  veryhighprice: {
    nn: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    ns: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },

    nw: {
      total: 0,
      compared: 0,
      demands: 0,
      offers: 0,
    },
  },
};

const Nktt = {
  nn: ["Tayaret", "TevreghZeina", "Ksar"],
  ns: ["Arafat", "DarNaim", "Toujounine"],
  nw: ["Sebkha", "Elmina", "Riyadh"],
};

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
      lowprice: selltype && pricewithin(0, 4),
      mediumprice: selltype && pricewithin(4, 15),
      highprice: selltype && pricewithin(15, 30),
      veryhighprice: selltype && pricewithin(30, 300),
    };
    return kindSearch[kind];
  });
}

const posts = [
  {
    type: "demandRent",
    price: 2,
    departements: ["Sebkha"],
    periority: 2,
  },
  {
    type: "offerRent",
    price: 2,
    departements: ["TevreghZeina"],
  },
  {
    type: "selling",
    price: 2,
    departements: ["Tayaret"],
  },
  {
    type: "buying",
    price: 2,
    departements: ["Arafat"],
  },
  {
    type: "stay",
    price: 2,
    departements: ["Ksar"],
  },
  {
    type: "demandRent",
    price: 4,
    departements: ["Elmina"],
  },
];

// const f = mfilter(posts, "lowPrice");

Object.keys(metadata).map((key) => {
  const mfilterposts = mfilter(posts, key);

  console.log(mfilterposts);
  for (const location in Nktt) {
    const posts = crossedDep(mfilterposts, Nktt[location]);
    for (const post of posts) {
      metadata[key][location].total++;

      // increment the compared posts
      post.comparedTo &&
        post.comparedTo.includes("finished") &&
        metadata[key][location].compared++;

      // increment the demand and offers
      post.type == "demandRent" || post.type == "buying"
        ? metadata[key][location].demands++
        : metadata[key][location].offers++;
    }
  }
});

function crossedDep(posts, departements) {
  return posts.filter((post) => {
    // look for a cross between the departements
    const cross = post.departements.filter((departement) =>
      departements.includes(departement)
    );
    // return the post if there is cross
    return cross.length > 0;
  });
}

console.log(metadata);
