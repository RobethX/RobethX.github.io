const babelOptions = {
    presets: ["babel-preset-gatsby"],
    rootMode: "upward",
};

module.exports = require("babel-jest").createTransformer(babelOptions);
