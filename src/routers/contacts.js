import { Router } from "express";
import { createContactController, deleteContactController, GetAllContactsController, GetContactByIDController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
const router = Router();

router.get("/contacts", ctrlWrapper(GetAllContactsController));
router.get("/contacts/:contactId", ctrlWrapper(GetContactByIDController));
router.post("/contacts", ctrlWrapper(createContactController));
router.patch("/contacts/:contactId", ctrlWrapper(patchContactController));
router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));

export default router;
