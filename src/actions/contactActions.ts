"use server";

import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const subject = formData.get("subject") as string;
    const inquiryType = formData.get("inquiryType") as string;
    const productId = formData.get("productId") as string;
    const productName = formData.get("productName") as string;
    const bagType = formData.get("bagType") as string;
    const material = formData.get("material") as string;
    const quantity = formData.get("quantity") as string;
    const application = formData.get("application") as string;
    const targetMarket = formData.get("targetMarket") as string;
    const sourcePage = formData.get("sourcePage") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const details = [
      subject ? `Subject: ${subject}` : null,
      inquiryType ? `Inquiry Type: ${inquiryType}` : null,
      productName ? `Product: ${productName}` : null,
      bagType ? `Bag Type: ${bagType}` : null,
      material ? `Material: ${material}` : null,
      quantity ? `Quantity: ${quantity}` : null,
      application ? `Application: ${application}` : null,
      targetMarket ? `Target Market: ${targetMarket}` : null,
      company ? `Company: ${company}` : null,
      phone ? `Phone: ${phone}` : null,
      sourcePage ? `Source Page: ${sourcePage}` : null,
    ].filter(Boolean);

    const formattedContent = details.length
      ? `${details.join("\n")}\n\nMessage:\n${message}`
      : message;

    // Save message to database
    await prisma.message.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        status: "new",
        subject: subject || null,
        inquiryType: inquiryType || null,
        productId: productId || null,
        productName: productName || null,
        bagType: bagType || null,
        material: material || null,
        quantity: quantity || null,
        application: application || null,
        targetMarket: targetMarket || null,
        sourcePage: sourcePage || null,
        content: formattedContent,
      }
    });

    // Configure Nodemailer with your SMTP settings
    // E.g., for Gmail, outlook, or custom SMTP server
    // You should put these values in your .env file
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "your-email@example.com",
        pass: process.env.SMTP_PASS || "your-password",
      },
    });

    const mailOptions = {
      from: `"Website Contact Form" <${process.env.SMTP_USER || "noreply@hailitong.com"}>`, // sender address
      to: process.env.CONTACT_RECEIVER_EMAIL || "info@hailitong.com", // list of receivers
      subject: `${subject || "New Inquiry"} from ${name} via HAILITONG Website`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}${company ? `Company: ${company}\n` : ""}${productName ? `Product: ${productName}\n` : ""}${inquiryType ? `Inquiry Type: ${inquiryType}\n` : ""}\n${formattedContent}`, // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #F05A22;">New Website Inquiry</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          ${inquiryType ? `<p><strong>Inquiry Type:</strong> ${inquiryType}</p>` : ""}
          ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ""}
          ${bagType ? `<p><strong>Bag Type:</strong> ${bagType}</p>` : ""}
          ${material ? `<p><strong>Material:</strong> ${material}</p>` : ""}
          ${quantity ? `<p><strong>Quantity:</strong> ${quantity}</p>` : ""}
          ${application ? `<p><strong>Application:</strong> ${application}</p>` : ""}
          ${targetMarket ? `<p><strong>Target Market:</strong> ${targetMarket}</p>` : ""}
          ${sourcePage ? `<p><strong>Source Page:</strong> ${sourcePage}</p>` : ""}
          <hr style="border: none; border-top: 1px solid #eee; my: 20px;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `, // html body
    };

    // NOTE: In production, this will actually send the email if credentials are correct.
    // Since we might not have real credentials yet, we will just log it in dev mode.
    if (process.env.NODE_ENV === "development" && !process.env.SMTP_HOST) {
      console.log("Mock Email Sent:", mailOptions);
      // Mock successful delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      await transporter.sendMail(mailOptions);
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    if (!email) {
      return { success: false, error: "Please provide an email address." };
    }

    // Save as a message in the database with inquiryType = 'newsletter'
    await prisma.message.create({
      data: {
        name: "Newsletter Subscriber",
        email,
        status: "new",
        subject: "New Newsletter Subscription",
        inquiryType: "newsletter",
        content: `User subscribed to the newsletter with email: ${email}`,
        sourcePage: "Footer Newsletter Form",
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving newsletter subscription:", error);
    return { success: false, error: "Failed to subscribe. Please try again later." };
  }
}
