/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    
    //  // Can be safely removed in newer versions of Next.js
    // future: {

    //     // by default, if you customize webpack config, they switch back to version 4.
    //     // Looks like backward compatibility approach.
    //     webpack5: true,   
    // },

    // webpack(config) {
    //     config.resolve.fallback = {

    //     // if you miss it, all the other options in fallback, specified
    //     // by next.js will be dropped.
    //     ...config.resolve.fallback,  

    //     fs: false, // the solution
    //     };
        
    //     return config;
    // },


    // webpack: (
    //     config,
    //     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    //   ) => {
    //     // Important: return the modified config
    //     return config
    //   },



    // webpack5: true,
    // webpack: (config) => {
    //     config.resolve.fallback = { fs: false };

    //     return config;
    // },




    webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false
            }
        }

        return config;
    }
}
nextConfig

// package JSON  

// "browser": {
//     "fs": false,
//     "os": false,
//     "path": false,
//     "tls": false,
//     "net": false
//   },