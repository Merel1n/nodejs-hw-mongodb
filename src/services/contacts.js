import { Contact } from "../models/contact.js";

export const createContact = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
  };

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await Contact.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );
  
    if (!rawResult || !rawResult.value) return null;
  
    return {
      student: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  };

  export const deleteContact = async (contactId)=>{
    const contact = await Contact.findOneAndDelete({
        _id: contactId,
      });
    
      return contact;
  };