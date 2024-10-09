
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { Contact } from './models/contact.js';
import {env} from './utils/env.js'
const PORT = Number(env('PORT', '3000'));

function setupServer() {
  const app = express();
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());
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
});
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };
