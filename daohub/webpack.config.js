{
resolve: {
  fallback: {
    "crypto": false,
    "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
  } 
}
}