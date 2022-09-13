import React from "react";
export default function whatsappButton({
  phone,
  message,
  children,
}: {
  phone?: string;
  message: string;
  children: JSX.Element;
}) {
  return (
    <a
      target={"_blank"}
      rel="noreferrer"
      href={"https://wa.me/" + phone + "/?text=" + message}
    >
      {children}
    </a>
  );
}

export function WhatsappShare({
  message,
  children,
}: {
  message: string;
  children: JSX.Element;
}) {
  return (
    <a
      target={"_blank"}
      rel="noreferrer"
      href={"https://wa.me/?text=" + message}
    >
      {children}
    </a>
  );
}
