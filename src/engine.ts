import { StatsBase } from 'fs';
import { ActionsType } from './actions';
import { type PossibleActionsType } from './possible_actions';
import { type HoldemStateType, HoldemStateSchema } from './state';
import { simple_pre } from './fake_games';

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

if (import.meta.vitest) {
	const { describe, expect, it } = import.meta.vitest;

	describe('engine.ts', () => {
		it('simple_pre print build table', () => {
			console.table(makeTable(simple_pre));
		});
	});
}
