import { z } from 'zod';

const CheckAction = z.object({
	action: z.literal('check'),
	seat: z.number().nonnegative()
});

const BlindAction = z.object({
	action: z.literal('blind'),
	seat: z.number().nonnegative(),
	amount: z.number().nonnegative()
});

const BetAction = z.object({
	action: z.literal('bet'),
	seat: z.number().nonnegative(),
	min: z.number().nonnegative(),
	max: z.number().nonnegative(),
	isAllin: z.boolean()
});

const CallAction = z.object({
	action: z.literal('call'),
	seat: z.number().nonnegative(),
	amount: z.number().nonnegative(),
	isAllin: z.boolean()
});

const FoldAction = z.object({
	action: z.literal('fold'),
	seat: z.number().nonnegative()
});

const PreFlopAction = z.object({
	action: z.literal('preflop'),
	seat: z.literal('dealer'),
	numberCards: z.literal(0)
});

const FlopAction = z.object({
	action: z.literal('flop'),
	seat: z.literal('dealer'),
	numberCards: z.literal(3)
});

const TurnAction = z.object({
	action: z.literal('turn'),
	seat: z.literal('dealer'),
	numberCards: z.literal(1)
});

const RiverAction = z.object({
	action: z.literal('river'),
	seat: z.literal('dealer'),
	numberCards: z.literal(1)
});

const EndAction = z.object({
	action: z.literal('end'),
	seat: z.literal('dealer'),
	numberCards: z.literal(0)
});

export const PossibleActionsSchema = z.union([
	FoldAction,
	BlindAction,
	CheckAction,
	BetAction,
	CallAction,
	PreFlopAction,
	FlopAction,
	TurnAction,
	RiverAction,
	EndAction
]);

export type PossibleActionsType = z.infer<typeof PossibleActionsSchema>;
