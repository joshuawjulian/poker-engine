import { z} from 'zod';

export const StreetSchema = z.union([
  z.literal('preflop'),
  z.literal('flop'),
  z.literal('turn'),
  z.literal('river'),
  z.literal('end')
]);

export type StreetType = z.infer<typeof StreetSchema>;