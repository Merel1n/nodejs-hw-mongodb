import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { Contact } from '../models/contact.js';
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function GetAllContactsController(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
}

export async function GetContactByIDController(req, res, next) {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  if (contact.userId.toString() !== req.user.id.toString()){
    return next(createHttpError(404, 'Contact not found'))
  };

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export const createContactController = async (req, res) => {
  
  const contact = await createContact({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      contactType: req.body.contactType,
      isFavourite: req.body.isFavourite,
      userId: req.user.id,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById =  await Contact.findById(contactId);

  if (req.user.id.toString()!== contactById.userId.toString()){
    next(createHttpError(404, 'Contact not found'));
  };

  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById =  await Contact.findById(contactId);

  if (req.user.id.toString()!== contactById.userId.toString()){
    next(createHttpError(404, 'Contact not found'));
  };
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
