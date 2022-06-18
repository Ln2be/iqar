import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

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
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    // const arrayBuffer = await compressedFile.arrayBuffer();
    // const image = Buffer.from(arrayBuffer).toString("base64");

    const image = blobToBase64(compressedFile);
    console.log(image);
    return image;
    // await uploadToServer(compressedFile); // write your own logic
  } catch (error) {
    console.log(error);
  }
}

// turn blob to base64
export function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
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
    value: "villa",
    label: "فيلا",
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
