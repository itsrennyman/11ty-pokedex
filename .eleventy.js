const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"],
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (config) {
  config.addWatchTarget("./_tmp/tailwind.css");
  config.addPassthroughCopy({ "./_tmp/tailwind.css": "./tailwind.css" });
  config.addPassthroughCopy("img");
  config.addNunjucksAsyncShortcode("image", imageShortcode);
  config.addLiquidShortcode("image", imageShortcode);
  config.addJavaScriptFunction("image", imageShortcode);

  // UcFirst
  config.addNunjucksFilter(
    "ucfirst",
    (value) => value.charAt(0).toUpperCase() + value.slice(1)
  );

  return {
    dir: {
      input: "src",
    },
  };
};
