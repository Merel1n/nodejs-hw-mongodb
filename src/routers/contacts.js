import { Router } from "express";
import { createContactController, deleteContactController, GetAllContactsController, GetContactByIDController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js"
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";


const router = Router();

router.get("/contacts", ctrlWrapper(GetAllContactsController));
router.get("/contacts/:contactId", isValidId, ctrlWrapper(GetContactByIDController));
router.post("/contacts", validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch("/contacts/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;
