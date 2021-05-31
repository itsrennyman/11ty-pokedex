module.exports = function (config) {
  config.addPassthroughCopy({
    "src/_includes/assets/css/tailwind.css": "./tailwind.css",
  });

  return {
    dir: {
      input: "src",
    },
  };
};
