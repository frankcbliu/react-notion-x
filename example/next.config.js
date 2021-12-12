'use strict'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      // redirect the index page to our notion test suite
      {
        source: '/',
        destination: '/simple-table6-f83f5d8c54aa48749030ed6d1565d911',
        // don't set permanent to true because it will get cached by the browser
        // while developing on localhost
        permanent: false
      }
    ]
  }
})
