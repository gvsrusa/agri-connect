declare module 'buffer' {
  export const Buffer: any;
}

// Add Buffer to global
declare global {
  var Buffer: any;
}