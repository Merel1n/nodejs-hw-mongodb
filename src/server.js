import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { Contact } from './models/contact.js';

const PORT = Number(env('PORT', 3000));

function setupServer() {
  const app = express;
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());

app.get("/contacts", async (req, res)=>{
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})
app.get("/contacts/:contactId", async(req,res)=>{
  const {id}=req.params;
  try {
      const contact = await Contact.findById(id);

    if (contact === null) {
      return res.status(404).send('Contact no found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})
  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };
