module.exports = function (config) {
  config.addWatchTarget("./_tmp/tailwind.css");
  config.addPassthroughCopy({ "./_tmp/tailwind.css": "./tailwind.css" });

  return {
    dir: {
      input: "src",
    },
  };
};
