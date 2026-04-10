import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  // Objeto que envia el Correo
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    //Para que no salga el error self-signed certificate in certificate chain
    tls: {
      rejectUnauthorized: false,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      console.log(sentInformation);

      //   const log = new LogEntity({
      //     message: "Email sent",
      //     level: LogSeverityLevel.low,
      //     origin: "email.service.ts",
      //   });

      return true;
    } catch (error) {
      console.log(error);
      //   const log = new LogEntity({
      //     message: "Email not send",
      //     level: LogSeverityLevel.low,
      //     origin: "email.service.ts",
      //   });

      return false;
    }
  }

  sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
      <h3> NOC - App </h3>
      <p> Este correo ha sido enviado por un sistema NOC </p>
      <p> Ver Logs adjuntos </p>`;

    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
