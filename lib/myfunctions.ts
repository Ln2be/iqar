import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";
// import { DBCounter } from "./mongo";
import * as geolib from "geolib";

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

export const adtypesrent = [
  {
    value: "demandRent",
    label: "طلب ايجار",
  },
  {
    value: "offerRent",
    label: "عرض ايجار",
  },
  {
    value: "stay",
    label: "آقامة",
  },
];

export const subtypes = {
  buying: [
    {
      value: "land",
      label: "قطعة ارضية",
    },
    {
      value: "house",
      label: "دار",
    },
    {
      value: "invest",
      label: "إستثمار",
    },
  ],
  rent: [
    {
      value: "studio",
      label: "استيديو",
    },
    {
      value: "medium",
      label: "منزل متوسط",
    },
    {
      value: "big",
      label: "منزل كبير",
    },

    {
      value: "stay",
      label: "شقة مفروشة",
    },

    {
      value: "shop",
      label: "محل",
    },

    {
      value: "store",
      label: "مخزن",
    },
    {
      value: "office",
      label: "مكتب",
    },
    {
      value: "other",
      label: "اخرى",
    },
  ],
  stay: [
    {
      value: "small",
      label: "شقة صغيرة",
    },
    {
      value: "medium",
      label: "شغة متوسطة",
    },
    {
      value: "big",
      label: "منزل كبير",
    },

    {
      value: "party",
      label: "فاعة حفلات",
    },
  ],
};

export const mfeatures = [
  {
    value: "favorite",
    label: "مفضلة",
  },
  {
    value: "garage",
    label: "كراج",
  },
];

export function whichSubtype(type: string) {
  return type == "demandRent" || type == "offerRent" ? "rent" : "buying";
}

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

const Tayaret = [
  { longitude: -15.9029792, latitude: 18.1560679 },
  { longitude: -15.9267114, latitude: 18.1744173 },
  { longitude: -15.9637902, latitude: 18.1729494 },
  { longitude: -15.9599708, latitude: 18.1231156 },
  { longitude: -15.9492419, latitude: 18.1200158 },
  { longitude: -15.9403155, latitude: 18.1147134 },
  { longitude: -15.9231494, latitude: 18.1362483 },
  { longitude: -15.9029792, latitude: 18.1560679 },
];

const Ksar = [
  { longitude: -15.9599708, latitude: 18.1231156 },
  { longitude: -15.9751813, latitude: 18.1025223 },
  { longitude: -15.9615343, latitude: 18.100809 },
  { longitude: -15.9537237, latitude: 18.097872 },
  { longitude: -15.9403155, latitude: 18.1147134 },
  { longitude: -15.9492419, latitude: 18.1200158 },
  { longitude: -15.9599708, latitude: 18.1231156 },
];

const TevreghZeina = [
  { longitude: -15.9751813, latitude: 18.1025223 },
  { longitude: -15.9599708, latitude: 18.1231156 },
  { longitude: -15.9621351, latitude: 18.1514648 },
  { longitude: -16.0092561, latitude: 18.1513832 },
  { longitude: -16.0051362, latitude: 18.1366203 },
  { longitude: -16.0053937, latitude: 18.0995037 },
  { longitude: -15.997154, latitude: 18.0986063 },
  { longitude: -15.9829061, latitude: 18.1039092 },
  { longitude: -15.9751813, latitude: 18.1025223 },
];

const Capital = [
  { longitude: -15.997154, latitude: 18.0986063 },
  { longitude: -15.9952657, latitude: 18.0915083 },
  { longitude: -15.9911458, latitude: 18.084818 },
  { longitude: -15.9833353, latitude: 18.0873473 },
  { longitude: -15.975353, latitude: 18.0875105 },
  { longitude: -15.9674566, latitude: 18.0864498 },
  { longitude: -15.9600751, latitude: 18.0887343 },
  { longitude: -15.9537237, latitude: 18.097872 },
  { longitude: -15.9615343, latitude: 18.100809 },
  { longitude: -15.9751813, latitude: 18.1025223 },
  { longitude: -15.9829061, latitude: 18.1039092 },
  { longitude: -15.997154, latitude: 18.0986063 },
];

const Arafat = [
  { longitude: -15.9655819, latitude: 18.079028 },
  { longitude: -15.9755383, latitude: 18.0553644 },
  { longitude: -15.9729634, latitude: 18.0415728 },
  { longitude: -15.9552823, latitude: 18.0499785 },
  { longitude: -15.935112, latitude: 18.0509577 },
  { longitude: -15.9315072, latitude: 18.0734796 },
  { longitude: -15.9655819, latitude: 18.079028 },
];

const DarNaim = [
  { longitude: -15.9018727, latitude: 18.1530338 },
  { longitude: -15.9358616, latitude: 18.1151865 },
  { longitude: -15.9259052, latitude: 18.1096392 },
  { longitude: -15.945818, latitude: 18.0819002 },
  { longitude: -15.9279652, latitude: 18.0760255 },
  { longitude: -15.9259052, latitude: 18.0714561 },
  { longitude: -15.87887, latitude: 18.0652547 },
  { longitude: -15.9018727, latitude: 18.1530338 },
];

const Toujounine = [
  { longitude: -15.9286518, latitude: 18.0685186 },
  { longitude: -15.9310551, latitude: 18.0469754 },
  { longitude: -15.9561176, latitude: 18.0459961 },
  { longitude: -15.9725971, latitude: 18.0378351 },
  { longitude: -15.9743138, latitude: 18.0094317 },
  { longitude: -15.8709736, latitude: 18.0580738 },
  { longitude: -15.8991261, latitude: 18.0665603 },
  { longitude: -15.9286518, latitude: 18.0685186 },
];

export function getMapregion(position: [number, number]) {
  const llposition = { latitude: position[0], longitude: position[1] };
  const isTayaret = geolib.isPointInPolygon(llposition, Tayaret);
  const isKsar = geolib.isPointInPolygon(llposition, Ksar);
  const isTevreghZeina = geolib.isPointInPolygon(llposition, TevreghZeina);
  const isCapital = geolib.isPointInPolygon(llposition, Capital);
  const isArafat = geolib.isPointInPolygon(llposition, Arafat);
  const isDarNaim = geolib.isPointInPolygon(llposition, DarNaim);
  const isToujounine = geolib.isPointInPolygon(llposition, Toujounine);

  return isTayaret
    ? "Tayaret"
    : isKsar
    ? "Ksar"
    : isTevreghZeina
    ? "TevreghZeina"
    : isCapital
    ? "Capital"
    : isArafat
    ? "Arafat"
    : isDarNaim
    ? "DarNaim"
    : isToujounine
    ? "Toujounine"
    : "None";
}

export function categoryPrice(price: number) {
  return price < 50
    ? "price40"
    : 50 <= price && price <= 70
    ? "price60"
    : 70 < price && price <= 100
    ? "price90"
    : 100 < price && price <= 130
    ? "price120"
    : 130 < price && price <= 160
    ? "price150"
    : price > 160 && "price170";
}

export function lapsedTimeDays(lasttime: Date | number) {
  const last = typeof lasttime == "number" ? new Date(lasttime) : lasttime;
  const now = new Date(Date.now());

  const diff = now.getTime() - last.getTime();
  const msindays = 1000 * 3600;

  const days = diff / msindays;

  const result = Math.round(days);
  return result;
}
