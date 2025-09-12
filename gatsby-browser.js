import React from "react";
import { MDXProvider } from "@mdx-js/react";
import LocalGallery from "./src/components/LocalGallery";

const components = {
  LocalGallery,
};

export const wrapRootElement = ({ element }) => {
  return React.createElement(MDXProvider, { components }, element);
};
