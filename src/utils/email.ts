import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
export const resendSender = process.env.RESEND_EMAIL_SENDER as string
