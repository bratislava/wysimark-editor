/**
 * Environment Variables
 * If in need to use environment variables, you can uncomment the code below.
 *
 * If `process.env.DOTENV` is provided, use it to load a `doetenv` file.
 *
 * If we are in development mode, then `DOTENV` is required.
 *
 * NOTE: Next.js has a built in way to set environment variables using a file
 * like `.env.local`. We opted out of this for a few reasons:
 *
 * - We adopted a convention of directory starting with `.` to not be committed
 *   git and this allows us to follow that convention.
 * - It doesn't pollute the root directory with more configurations
 * - We can create as many `.env` files as needed for local, test, production
 * - Syntax highlighting works when file ends in `.env`
 */

// if (typeof process.env.DOTENV === "string") {
//   const data = dotenv.config({ path: process.env.DOTENV })
//   if (data.error) {
//     throw new Error(data.error)
//   }
//   env = data.parsed
// } else if (process.env.NODE_ENV === "development") {
// throw new Error(
//   `Please define a DOTENV env var to a dotenv file when in development`
// )
// }

// const dotenv = require("dotenv")

/**
 * Sets `process.env` in Next.js
 */
module.exports = {
  experimental: { externalDir: true },
  /**
   * Add this code to enable importing of file content as a string.
   * You must also add a type declaration for the file extension.
   *
   * See `/types/md.d.ts` for an example.
   */
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    })
    return config
  },
}
