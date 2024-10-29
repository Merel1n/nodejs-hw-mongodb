import { Router } from "express";
import { createContactController, deleteContactController, GetAllContactsController, GetContactByIDController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidID.js";

const router = Router();

router.get("/contacts", ctrlWrapper(GetAllContactsController));
router.get("/contacts/:contactId", isValidId, ctrlWrapper(GetContactByIDController));
router.post("/contacts", ctrlWrapper(createContactController));
router.patch("/contacts/:contactId", isValidId, ctrlWrapper(patchContactController));
router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;
