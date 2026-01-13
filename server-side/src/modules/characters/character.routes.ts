import express from "express";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createCharacterSchema,
  deleteCharacterSchema,
  getAllCharactersSchema,
  updateCharacterSchema,
} from "./character.schemas";
import {
  createCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
} from "./character.controller";
import { getChapterByIdSchema } from "../chapters/chapter.schemas";

const router = express.Router({ mergeParams: true });

router.use(authenticateAccessToken);

router.get("/", validateRequest(getAllCharactersSchema), getAllCharacters);
router.get(
  "/:characterId",
  validateRequest(getChapterByIdSchema),
  getCharacterById
);
router.post("/", validateRequest(createCharacterSchema), createCharacter);
router.put(
  "/:characterId",
  validateRequest(updateCharacterSchema),
  updateCharacter
);
router.delete(
  "/:characterId",
  validateRequest(deleteCharacterSchema),
  deleteCharacter
);

export default router;
