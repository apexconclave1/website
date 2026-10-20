import { LeaderEntity } from '@/types/schema';
import { leadershipTeam } from '@/lib/data/organization';

// Real Apex Conclave team. Add Diplovia dais / advisory members here once confirmed.
export const leadersData: LeaderEntity[] = leadershipTeam.map((m) => ({
  id: m.name.toLowerCase().replace(/\s+/g, '-'),
  name: m.name,
  role: m.role,
  bio: m.quote,
  photoUrl: 'photo' in m ? (m.photo as string) : '',
  organization: 'Apex Conclave',
}));
