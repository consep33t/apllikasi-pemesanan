// pages/api/sendMessage.js
import { NextResponse } from "next/server";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function POST(request) {
  const { user, cart, total } = await request.json();

  try {
    const message = `Pesanan baru dari ${user.name}.\n\nItems:\n${cart
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
