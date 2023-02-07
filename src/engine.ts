import { ActionsType } from './actions';
import { type PossibleActionsType } from './possible_actions';
import { type HoldemStateType, HoldemStateSchema } from './state';
import { simple_flop_action, simple_pre_action } from './fake_games';
import { StreetType } from './types';

export function next(state: HoldemStateType): PossibleActionsType | Error {
	const result = HoldemStateSchema.safeParse(state);
	if (result.success === false) return result.error;
	state = result.data;

	return {
		action: 'preflop',
		seat: 'dealer',
		numberCards: 0
	};
}

function makeTable(state: HoldemStateType): (ActionsType | string)[][] {
	let table: (ActionsType | string)[][] = new Array();

	state.actions.forEach((action: ActionsType) => {
		let idx = 0;
		if (action.seat !== 'dealer') idx = action.seat;
		let row: (ActionsType | string)[] = new Array(
			state.players.length + 1
		).fill('');
		row[idx] = action.action;
		table.push(row);
	});

	return table;
}

type ActionStreetType = {
	seat: number | 'dealer';
	action: ActionsType | null;
	street: StreetType;
};

export function lastActionArray(
	state: HoldemStateType
): ActionStreetType[] {
	state = HoldemStateSchema.parse(state);
	let lastActionArr: ActionStreetType[] = new Array(
		state.players.length + 1
	);
	for (let i = 0; i < state.players.length + 1; i++) {
		let seat: number | 'dealer' = i;
		if (i === 0) seat = 'dealer';
		lastActionArr[i] = {
			seat,
			action: null,
			street: 'preflop'
		};
	}
	let currStreet: StreetType = 'preflop';
	for (let i = 0; i < state.actions.length; i++) {
		const action = state.actions[i];
		let idx = 0;
		if (action) {
			if (action.seat === 'dealer') {
				idx = 0;
				currStreet = action.action;
			} else {
				idx = action.seat;
			}
			lastActionArr[idx] = {
				seat: action.seat,
				action,
				street: currStreet
			};
		}
	}
	return lastActionArr;
}

export function previousAggressiveAction(
	state: HoldemStateType
): ActionStreetType {}

export function getStreet(state: HoldemStateType): StreetType {
	state = HoldemStateSchema.parse(state);
	let street: StreetType = 'preflop';
	for (let i = 0; i < state.actions.length; i++) {
		let action = state.actions.at(i);
		if (action && action.seat === 'dealer') street = action.action;
	}

	return street;
}

if (import.meta.vitest) {
	const { describe, expect, it } = import.meta.vitest;

	describe('engine.ts', () => {
		it('simple_pre print build table', () => {
			console.time('makeTable()');
			const tbl = makeTable(simple_pre_action);
			console.timeLog('makeTable()');

			//console.table(tbl);
		});

		it('detect street', () => {
			let street = getStreet(simple_pre_action);
			expect(street, 'preflop');

			street = getStreet(simple_flop_action);
			expect(street, 'flop');
		});
	});

	describe('lastActionArray()', () => {
		it('should make an array', () => {
			console.log(lastActionArray(simple_flop_action));
		});
	});
}
