import Router from 'express-promise-router';
import { Request, Response } from 'express';
import { BattleEntity, PlayerEntity } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  return await req.em
    .getRepository(BattleEntity)
    .findAll()
    .then((r) => res.json(r));
});

// Get attacks under a battle
// TODO: Validation
router.get('/:id/attacks', async (req: Request, res: Response) => {
  return await req.em
    .findOne(BattleEntity, req.params.id, { populate: ['attacks'] })
    .then((r) => res.json(r));
});

// Initiate a battle between two players (using their UUID)
// TODO: Validation
router.post('/', async (req: Request, res: Response) => {
  const from = await req.em.findOne(PlayerEntity, req.body.from);
  const to = await req.em.findOne(PlayerEntity, req.body.to);

  if (from != null && to != null) {
    const battle = new BattleEntity(from, to);
    req.em.persist(battle);

    await req.em
      .getRepository(BattleEntity)
      .initiateAttack(battle)
      .then((r) => res.json(r))
      .catch((e) => res.status(400).json({ message: e }));
  }

  return res.status(400).json({ message: 'One or more players not found.' });
});

export const BattleController = router;
