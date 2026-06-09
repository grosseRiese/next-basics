import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma"
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    //autoSignIn: false, //defaults to true

    async sendResetPassword(data) {
      console.log("Passwaor Reset:", data.url)
    },
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    async sendVerificationEmail(data) {
      console.log("Email  Verification:", data.url)
    },
  },

  //  session: {
  //       expiresIn: 60 * 60 * 24 * 7, // 7 days
  //       updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
  //   },

  plugins: [nextCookies()], // make sure this is the last plugin in the array
})
