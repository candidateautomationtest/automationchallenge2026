module.exports = {
  default: {
    require: ['features/step_definitions/**/*.js', 'support/**/*.js'],
    publishQuiet: true,
    parallel: 1,
    format: ['progress'],
    timeout: 90000
  }
};
