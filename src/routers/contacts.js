import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  GetAllContactsController,
  GetContactByIDController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { upload } from '../middlewares/multer.js';


const router = Router();

router.get('/', ctrlWrapper(GetAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(GetContactByIDController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.post(
  '/',
  // isValidId,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
