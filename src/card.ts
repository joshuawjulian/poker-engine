import { z } from 'zod';

export const SuitSchema = z.union([
	z.literal('c'),
	z.literal('C'),
	z.literal('d'),
	z.literal('D'),
	z.literal('h'),
	z.literal('H'),
	z.literal('s'),
	z.literal('S'),
	z.literal('x'),
	z.literal('X')
]);
//.transform((val: string) => val.toLowerCase());
export type SuitType = z.infer<typeof SuitSchema>;

export const RankSchema = z.union([
	z.literal('2'),
	z.literal('3'),
	z.literal('4'),
	z.literal('5'),
	z.literal('6'),
	z.literal('7'),
	z.literal('8'),
	z.literal('9'),
	z.literal('t'),
	z.literal('T'),
	z.literal('j'),
	z.literal('J'),
	z.literal('q'),
	z.literal('Q'),
	z.literal('k'),
	z.literal('K'),
	z.literal('a'),
	z.literal('A'),
	z.literal('x'),
	z.literal('X')
]);

export type RankType = z.infer<typeof RankSchema>;

export const CardSchema = z.object({
	rank: RankSchema,
	suit: SuitSchema
});

export type CardType = z.infer<typeof CardSchema>;

if (import.meta.vitest) {
	const { describe, expect, it } = import.meta.vitest;

	describe('Card.ts', () => {
		it('shouldnt allow non card strings', () => {
			const result = CardSchema.safeParse({ rank: 'o', suit: 's' });
			expect(result.success).toBeFalsy();
		});
	});
}
