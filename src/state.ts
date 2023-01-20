import { z } from 'zod';
import { ActionsSchema } from './actions';

export const HoldemPlayerSchema = z.object({
	seat: z.number(),
	stack: z.number()
});

export type HoldemPlayerType = z.infer<typeof HoldemPlayerSchema>;

export const HoldemStateSchema = z.object({
	players: z.array(HoldemPlayerSchema),
	actions: z.array(ActionsSchema)
});

export type HoldemStateType = z.infer<typeof HoldemStateSchema>;
