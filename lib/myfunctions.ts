import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";
// import { DBCounter } from "./mongo";

// Correct the phone. The phone comes incorrect sometimes because of the arabic orientation.
export function correctPhone(tel: string) {
  let phone;
  if (tel.endsWith("+")) {
    phone = "+" + tel.replace("+", "");
  } else if (tel.startsWith("00")) {
    phone = "+" + tel.replace("00", "");
  } else if (tel.startsWith("+")) {
    phone = tel;
  } else {
    phone = "+222" + tel;
  }

  return phone;
}

// correct the price
export function correctPrice(price: number, type: string) {
  let newPrice = 0;
  if (type == "demandRent" || type == "offerRent" || type == "stay") {
    if (price > 1000) {
      newPrice = price / 1000;
    } else {
      newPrice = price;
    }
  }

  if (type == "buying" || type == "selling") {
    if (price < 200000 && price > 200) {
      newPrice = price / 1000;
    } else if (price > 1000000) {
      newPrice = price / 1000000;
    } else {
      newPrice = price;
    }
  }
  if (newPrice) {
    return newPrice;
  } else {
    return 0;
  }
}

// a function to reduce the size of the image uploaded
export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600,
      600,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

// a fuction to reduce the size of the image uploaded
export async function handleImageUpload(imageFile: File) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    // const arrayBuffer = await compressedFile.arrayBuffer();
    // const image = Buffer.from(arrayBuffer).toString("base64");

    const image = blobToBase64(compressedFile);
    return image;
    // await uploadToServer(compressedFile); // write your own logic
  } catch (error) {
    console.log(error);
  }
}

// turn blob to base64
export function blobToBase64(blob: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// constants
export const departements = [
  {
    value: "Tayaret",
    label: "تيارت",
  },
  {
    value: "Ksar",
    label: "لكصر",
  },
  {
    value: "DarNaim",
    label: "دار النعيم",
  },
  {
    value: "TevreghZeina",
    label: "تفرغ زينة",
  },
  {
    value: "Sebkha",
    label: "السبخة",
  },
  {
    value: "Elmina",
    label: "الميناء",
  },
  {
    value: "Arafat",
    label: "عرفات",
  },
  {
    value: "Toujounine",
    label: "توجنين",
  },
  {
    value: "Riyadh",
    label: "الرياض",
  },
  {
    value: "Surroundings",
    label: "الضواحي",
  },
  {
    value: "NDB",
    label: "انواذيبو",
  },
  {
    value: "Interior",
    label: "الداخل",
  },
];

export const adtypes = [
  {
    value: "stay",
    label: "إقامة",
  },
  {
    value: "selling",
    label: "بيع",
  },
  {
    value: "buying",
    label: "شراء",
  },
  {
    value: "demandRent",
    label: "طلب ايجار",
  },
  {
    value: "offerRent",
    label: "عرض ايجار",
  },
];

export const subtypes = [
  {
    value: "land",
    label: "قطعة ارضية",
  },
  {
    value: "appartment",
    label: "شقق",
  },
  {
    value: "house",
    label: "دار",
  },
  {
    value: "incomplete",
    label: "شانتية",
  },
  {
    value: "invest",
    label: "إستثمار",
  },
  {
    value: "store",
    label: "مخزن",
  },
  {
    value: "other",
    label: "اخرى",
  },
];

// similar subtypes
export const similarsub: { [key: string]: string[] } = {
  land: ["land", "incomplete"],
  other: ["other"],
  incomplete: ["land", "incomplete", "house", "appartment"],
  house: ["house", "appartment"],
  appartment: ["house", "appartment"],
  invest: ["invest"],
  store: ["store"],
};
// show label in the interface but not the value
export function translate(
  value: string,
  object: { value: string; label: string }[]
) {
  for (const subtype of object) {
    if (subtype.value == value) {
      return subtype.label;
    }
  }
}

// the base path
const isProduction = process.env.NODE_ENV === "production";

export const basepath = isProduction
  ? "https://mr.iqar.store"
  : "http://localhost:3000";

// Nouakchott districts

export const Nktt: { [key: string]: string[] } = {
  nn: ["Tayaret", "TevreghZeina", "Ksar"],
  ns: ["Arafat", "DarNaim", "Toujounine"],
  nw: ["Sebkha", "Elmina", "Riyadh"],
};

// global types

export const gtypes: { [key: string]: string[] } = {
  rent: ["DemandRent", "OfferRent", "stay"],
  lowprice: ["Buying", "Selling"],
  mediumprice: ["Buying", "Selling"],
  highprice: ["Buying", "Selling"],
};

// prices catagories intervall

export const priceCat: { [key: string]: { low: number; high: number } } = {
  lowprice: {
    low: 0.0001,
    high: 4,
  },
  mediumprice: {
    low: 4,
    high: 10,
  },
  highprice: {
    low: 10,
    high: 20,
  },
  veryhighprice: {
    low: 20,
    high: 200,
  },
};

// create special link that show the phones for some reps

export async function isASpecialLink({
  validCode,
  type,
}: {
  validCode: boolean;
  type: string;
}) {
  return validCode && type == "demandRent";
}



