// pages/api/sendMessage.js
import { NextResponse } from "next/server";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function POST(request) {
  try {
    const { user, cart, total } = await request.json();
    console.log(user);

    // Verifikasi nomor telepon menggunakan Twilio Verify Service
    const verification = await client.verify
      .services(process.env.TWILIO_VERIFICATION_SID)
      .verifications.create({
        to: `whatsapp:+${user.phone.replace(/^0/, "62")}`,
        channel: "whatsapp",
      });

    console.log(verification.status);

    if (verification.status === "pending") {
      return NextResponse.json({
        message:
          "Kode verifikasi telah dikirim. Mohon verifikasi nomor telepon Anda.",
      });
    }

    // Jika verifikasi berhasil, lanjutkan untuk mengirim pesan WhatsApp
    const message = `Pesanan baru dari aplikasi Pemesanan kepada ${
      user.name
    }:\n\nItems:\n${cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ${item.price * item.quantity} IDR`
      )
      .join("\n")}\n\nTotal: ${new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total)}`;

    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      body: message,
      to: `whatsapp:+${user.phone.replace(/^0/, "62")}`,
    });

    return NextResponse.json({ message: "Pesan berhasil dikirim!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengirim pesan." },
      { status: 500 }
    );
  }
}
