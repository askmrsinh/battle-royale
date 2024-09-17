import Router from 'express-promise-router';
import { transformThenValidate, transformValidationErrors } from '../utils';
import { Request, Response } from 'express';
import { PlayerEntity } from '../entities';
import { CreatePlayerBodyDto } from '../dtos';
import { PlayerFactory } from '../factories';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  return await req.em
    .getRepository(PlayerEntity)
    .findAll()
    .then((r) => res.json(r));
});

router.post('/', async (req: Request, res: Response) => {
  const { data, errors } = transformThenValidate(CreatePlayerBodyDto, req.body);

  return errors.length > 0
    ? res.status(400).json({ error: transformValidationErrors(errors) })
    : await new PlayerFactory(req.em).createOne({ ...data }).then((r) => res.json(r));
});

export const PlayerController = router;
