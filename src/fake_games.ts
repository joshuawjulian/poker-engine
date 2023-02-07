import { HoldemPlayerType, HoldemStateType } from './state';

export function generatePlayer(
	seat: number,
	stack: number
): HoldemPlayerType {
	return { seat, stack };
}

export const simple_pre_finish: HoldemStateType = {
	players: [
		{ seat: 1, stack: 200 },
		{ seat: 2, stack: 200 },
		{ seat: 3, stack: 200 },
		{ seat: 4, stack: 200 },
		{ seat: 5, stack: 200 },
		{ seat: 6, stack: 200 }
	],
	actions: [
		{ action: 'preflop', seat: 'dealer' },
		{ action: 'blind', seat: 1, amount: 1 },
		{ action: 'blind', seat: 2, amount: 2 },
		{ action: 'fold', seat: 3 },
		{ action: 'bet', seat: 4, amount: 10 },
		{ action: 'call', seat: 5, amount: 10 },
		{ action: 'fold', seat: 6 },
		{ action: 'fold', seat: 1 },
		{ action: 'fold', seat: 2 }
	]
};

export const simple_pre_action: HoldemStateType = {
	players: [
		{ seat: 1, stack: 200 },
		{ seat: 2, stack: 200 },
		{ seat: 3, stack: 200 },
		{ seat: 4, stack: 200 },
		{ seat: 5, stack: 200 }
	],
	actions: [
		{ action: 'preflop', seat: 'dealer' },
		{ action: 'blind', seat: 1, amount: 1 },
		{ action: 'blind', seat: 2, amount: 2 },
		{ action: 'fold', seat: 3 },
		{ action: 'bet', seat: 4, amount: 10 }
	]
};

export const simple_flop_action: HoldemStateType = {
	players: [
		{ seat: 1, stack: 200 },
		{ seat: 2, stack: 200 },
		{ seat: 3, stack: 200 },
		{ seat: 4, stack: 200 },
		{ seat: 5, stack: 200 }
	],
	actions: [
		{ action: 'preflop', seat: 'dealer' },
		{ action: 'blind', seat: 1, amount: 1 },
		{ action: 'blind', seat: 2, amount: 2 },
		{ action: 'fold', seat: 3 },
		{ action: 'bet', seat: 4, amount: 10 },
		{ seat: 5, action: 'call', amount: 10 },
		{ seat: 1, action: 'fold' },
		{ seat: 2, action: 'fold' },
		{
			seat: 'dealer',
			action: 'flop',
			cards: [
				{ rank: 'A', suit: 'h' },
				{ rank: 'A', suit: 's' },
				{ rank: 'A', suit: 'c' }
			]
		}
	]
};
