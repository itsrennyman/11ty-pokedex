const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [600],
    formats: ["avif", "jpeg"],
    urlPath: "/images/",
    outputDir: "./_site/images",
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
  config.addWatchTarget("./_tmp/css/tailwind.css");
  config.addNunjucksAsyncShortcode("image", imageShortcode);
  config.addLiquidShortcode("image", imageShortcode);
  config.addJavaScriptFunction("image", imageShortcode);

  // UcFirst
  config.addNunjucksFilter(
    "ucfirst",
    (value) => value.charAt(0).toUpperCase() + value.slice(1)
  );

  //nl2space
  config.addNunjucksFilter("nl2space", (str) =>
    str ? str.replace(/\r|\n|\r\n/g, " ") : ""
  );

  // Sanitize
  config.addNunjucksFilter("sanitize", (str) =>
    str.replace(/[^a-zA-Z0-9 é.]/g, "")
  );

  return {
    dir: {
      input: "src",
    },
  };
};
