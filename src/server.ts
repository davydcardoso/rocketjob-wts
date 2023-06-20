import { randomUUID } from "crypto";
import { Client, LocalAuth } from "whatsapp-web.js";

import qrcode from "qrcode-terminal";
import { currentTimeFormatted } from "./utils/datetime";
import { prisma } from "./prisma";

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "default-session" }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log(
    "Sessão inicializada com sucesso as:",
    currentTimeFormatted(new Date())
  );

  async function saveContacts() {
    const contacts = await client.getContacts();

    for await (const contact of contacts) {
      try {
        const {
          id: { server, _serialized: serialized },
          name,
          number,
          shortName,
          pushname,
          isBlocked,
          isBusiness,
          isEnterprise,
          isGroup,
          isMe,
          isMyContact,
          isUser,
          isWAContact,
        } = contact;

        console.log(
          "Salvando contato:",
          pushname || name || shortName || "CONTATO SEM NOME",
          " às",
          currentTimeFormatted(new Date())
        );

        await prisma.contacts.upsert({
          create: {
            name,
            number,
            pushName: pushname || name || shortName || "CONTATO SEM NOME",
            isBlocked,
            isBusiness,
            isEnterprise,
            isGroup,
            isMe,
            isMyContact,
            isUser,
            isWAContact,
            server,
            serialized,
          },
          update: {
            isBlocked,
            isBusiness,
            isEnterprise,
            isGroup,
            isMe,
            isMyContact,
            isUser,
            isWAContact,
          },
          where: { number },
        });
      } catch (err: any) {
        console.log("Erro ao salvar o contato: ", contact.number);
      }
    }

    console.log("Todos os contatos foram salvos");
  }

  saveContacts();
});

client.on("message", async (message) => {
  const contact = await message.getContact();

  console.log(
    "Message Recebida de:",
    contact.pushname || contact.name || contact.shortName || message.from,
    "às",
    currentTimeFormatted(new Date())
  );

  const contactSalved = await prisma.contacts.findUnique({
    where: { number: contact.number },
  });

  const contactId = !contactSalved ? contact.number : contactSalved.id;

  try {
    if (message.hasMedia) {
      console.log("Message recebida é uma midia");

      const file = await message.downloadMedia();

      await prisma.messages.create({
        data: {
          contactId,
          body: file.data,
          mimeType: file.mimetype,
          isMedia: true,
          receivedIn: new Date(),
        },
      });
      return;
    }

    await prisma.messages.create({
      data: {
        contactId,
        isMedia: false,
        mimeType: null,
        body: message.body,
        receivedIn: new Date(),
      },
    });
  } catch (err: any) {
    console.log("Erro ao salvar mensagem: ", err.message);
  }
});

client.initialize();
