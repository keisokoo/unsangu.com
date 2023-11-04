'use server'

import { headers } from "next/headers";
export const getHost = async () => {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const currentUrl = `${protocol}://${host}`;
  return currentUrl;
};