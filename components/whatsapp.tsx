import React from "react";
export default function whatsappButton({
  phone,
  message,
  children,
}: {
  phone: string;
  message: string;
  children: JSX.Element;
}) {
  return (
    <a href={"https://wa.me/" + phone + "/?text=" + message}>{children}</a>
  );
}
