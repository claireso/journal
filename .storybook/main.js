module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../components/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-notes', '@storybook/addon-docs']
};
