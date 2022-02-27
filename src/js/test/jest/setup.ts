window.matchMedia = () => ( {
  matches            : false, // All queries match the media string.
  media              : '',
  onchange           : null,
  addListener        : jest.fn(),
  removeListener     : jest.fn(),
  addEventListener   : jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent      : jest.fn(),
} as MediaQueryList );