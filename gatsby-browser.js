import React from "react";
import { MDXProvider } from "@mdx-js/react";
import LocalGallery from "./src/components/LocalGallery";

const components = {
  LocalGallery,
};

console.log("=== GATSBY BROWSER DEBUG ===", {
  timestamp: new Date().toISOString(),
  components: Object.keys(components),
  LocalGallery: typeof LocalGallery,
  MDXProvider: typeof MDXProvider,
});

export const wrapRootElement = ({ element }) => {
  console.log("=== WRAP ROOT ELEMENT (Browser) ===", {
    timestamp: new Date().toISOString(),
    hasElement: !!element,
    elementType: typeof element,
    elementProps: element?.props,
  });

  return React.createElement(MDXProvider, { components }, element);
};
