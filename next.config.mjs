/** @type {import('next').NextConfig} */
const client = process.env.client // Adjust if necessary

import { createRequire } from "module"

import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants.js"

const require = createRequire(import.meta.url)
const fmxConfig = require("./fmxFrontendConfig.json")
const clientConfig = fmxConfig[client]

if (!clientConfig) {
    console.error("no client config found")
    process.exit()
}
// @ts-check

// Define your base path here
const basePath = "/MOC"

// eslint-disable-next-line import/no-anonymous-default-export
export default (phase) => {
    /**
     * @type {import('next').NextConfig}
     */

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            basePath,
            images: {
                remotePatterns: [
                    {
                        protocol: "https",
                        hostname: "fmx-bucket.s3.ap-south-1.amazonaws.com"
                    }
                ]
            },
            env: {
                API_BASE_URL: clientConfig.host,
                CLIENT_NAME: client,
                ACCOUNT_ID: clientConfig.accountId
            },
            productionBrowserSourceMaps: false,
            assetPrefix: basePath
        }
    }
    return {
        basePath,
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "fmx-bucket.s3.ap-south-1.amazonaws.com"
                }
            ]
        },
        env: {
            API_BASE_URL: clientConfig.host,
            CLIENT_NAME: client,
            ACCOUNT_ID: clientConfig.accountId
        },
        assetPrefix: basePath,
        distDir: "build"
    }
}
