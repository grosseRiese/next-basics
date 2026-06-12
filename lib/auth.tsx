import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma"
import { nextCookies } from "better-auth/next-js"
import { sendEmail } from "./email"
import { render, toPlainText } from "react-email"
import EmailVerfication from "@/components/email/templates/email-verification"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    //autoSignIn: false, //defaults to true

    async sendResetPassword(data) {
      console.log("Passwaor Reset:", data.url)

      /**
       * =================================================
       *    SendEmail rest the password: nodeMailer
       * =================================================
       */
      await sendEmail(
        data.user.email,
        "Password Reset",
        `Hello ${data.user.name}!
    Password resret requested. Click the link to reset your password.
    ${data.url}`,

        `<h1> Hello ${data.user.name}!</h1>
    <p>Password resret requested. Click the link to reset your password.</p>
    <a href="${data.url}"> Reset password </a>`
      )
    },
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    async sendVerificationEmail(data) {
      console.log("Email  Verification:", data.url)

      // react email
      const html = await render(<EmailVerfication url={data.url} />)
      const text = toPlainText(html)
      /**
       * =================================================
       *    Verify your email: nodeMailer
       * =================================================
       */
      await sendEmail(data.user.email, "Verify tour email", text, html)

      //   await sendEmail(
      //     data.user.email,
      //     "Verify your email",
      //     `Email verfication
      // Click the link below to verify your email.
      // ${data.url}`,
      //     `<h1> Email verification</h1>
      //   <p>Click the link below to verify your email. </p>
      //   <a href="${data.url}"> Verify email </a>`
      //   )
    },
  },

  plugins: [nextCookies()], // make sure this is the last plugin in the array
})
