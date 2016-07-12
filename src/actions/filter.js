export function doFilterA(data) {
    return {
      type: 'DUMMY',
      params: {a: 1, b: 2}  // params from input even, for example
    }
}
