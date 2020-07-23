global.console = {
  log: console.log,
  error: jest.fn(), // console.error are ignored in tests
  warn: jest.fn(), // console.warn are ignored in tests
  info: console.info,
  debug: console.debug,
};
