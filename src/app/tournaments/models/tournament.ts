export interface CreateTournamentRequest {
  name: string;
  description: string;
  startDate: number;
  entryFee?: number;
  entryFeeCurrency?: string;
  gameId: string;
  platformIds: string[];
  typeId: string;
  maxEntries: number;
}
