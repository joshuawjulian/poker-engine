import { z } from 'zod';
import { CardSchema } from './card';

const PlayerFoldAction = z.object({
	action: z.literal('fold'),
	seat: z.number().nonnegative()
});

const PlayerBetAction = z.object({
	action: z.literal('bet'),
	seat: z.number().nonnegative(),
	amount: z.number().nonnegative()
});

const PlayerBlindAction = z.object({
	action: z.literal('blind'),
	seat: z.number().nonnegative(),
	amount: z.number().nonnegative()
});

const PlayerCallAction = z.object({
	action: z.literal('call'),
	seat: z.number().nonnegative(),
	amount: z.number().nonnegative()
});

const PlayerCheckAction = z.object({
	action: z.literal('check'),
	seat: z.number().nonnegative()
});

export const PlayerActionsSchema = z.union([
	PlayerFoldAction,
	PlayerBlindAction,
	PlayerCallAction,
	PlayerCheckAction,
	PlayerBetAction
]);

const DealerPreFlopAction = z.object({
	action: z.literal('preflop'),
	seat: z.literal('dealer')
});

const DealerFlopAction = z.object({
	action: z.literal('flop'),
	seat: z.literal('dealer'),
	cards: z.array(CardSchema).length(3)
});

const DealerTurnAction = z.object({
	action: z.literal('turn'),
	seat: z.literal('dealer'),
	card: CardSchema
});

const DealerRiverAction = z.object({
	action: z.literal('River'),
	seat: z.literal('dealer'),
	card: CardSchema
});

const DealerEndAction = z.object({
	action: z.literal('end'),
	seat: z.literal('dealer')
});

export const DealerActionsSchema = z.union([
	DealerPreFlopAction,
	DealerFlopAction,
	DealerTurnAction,
	DealerRiverAction,
	DealerEndAction
]);

export const ActionsSchema = z.union([
	DealerActionsSchema,
	PlayerActionsSchema
]);

export type ActionsType = z.infer<typeof ActionsSchema>;
