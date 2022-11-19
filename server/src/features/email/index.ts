import { Task } from '@prisma/client'
import nodemailer from 'nodemailer'

interface AccountConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

const send = async (
  accConfig: AccountConfig,
  body: nodemailer.SendMailOptions,
) => {
  const transporter = nodemailer.createTransport(accConfig)
  return await transporter.sendMail(body)
}

export const sendDueExpirationEmail = async (task: Task, userEmail: string) => {
  const accountConfig = {
    host: 'smtp.gmail.com.',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  }

  const body = {
    from: '"Taskie 👻" <Taskie@example.com>',
    to: userEmail,
    subject: `[Overdue] ${task.title}`,
    text: 'Your task has expired',
    html: `<h3>Task expired at ${task.dueDate}</h3>`,
  }

  return await send(accountConfig, body)
}
