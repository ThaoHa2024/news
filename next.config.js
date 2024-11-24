if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `)
}

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      'sports.cryptocloud9.io',
    ],
  },
  async redirects() {
    return [
      {
        source: '/posts/:path*',
        has: [
          {
            type: 'query',
            key: 'fbclid'
          }
        ],
        destination: 'https://sports.cryptocloud9.io/:path*',
        permanent: false,
      },
      {
        source: '/posts/:path*',
        has: [
          {
            type: 'header',
            key: 'referer',
          }
        ],
        destination: 'https://sports.cryptocloud9.io/:path*',
        permanent: false,
      },
      
    ]
  }

}
