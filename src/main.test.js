/**
 * @jest-environment jsdom
 */

const dataLoaded = import('./main.js')
test('O arquivo foi carregado', () => {
  expect((dataLoaded).notNull).toBeTruthy()
})

