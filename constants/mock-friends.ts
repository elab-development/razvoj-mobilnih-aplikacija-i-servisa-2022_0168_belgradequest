export type Friend = {
  id: string;
  name: string;
  xp: number;
  isMe?: boolean;
};

export const FRIENDS: Friend[] = [
  { id: 'me', name: 'Korisnik', xp: 1255, isMe: true },
  { id: '1', name: 'Korisnik5', xp: 1025 },
  { id: '2', name: 'Korisnik33', xp: 250 },
  { id: '3', name: 'Korisnik54', xp: 150 },
  { id: '4', name: 'Korisnik4', xp: 25 },
];

export function getRankedFriends(): (Friend & { rank: number })[] {
  return [...FRIENDS]
    .sort((a, b) => b.xp - a.xp)
    .map((friend, index) => ({ ...friend, rank: index + 1 }));
}