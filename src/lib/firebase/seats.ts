import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './config';
import { SeatPortfolioEntity } from '@/types/schema';
import { seatsData } from '@/lib/data/seats';

/**
 * Subscribe to real-time seat matrix for a specific committee chamber.
 * Falls back safely to static dataset if Firestore is offline/unconfigured.
 */
export function subscribeToSeats(
  chamberId: string,
  onUpdate: (seats: SeatPortfolioEntity[]) => void
): () => void {
  if (!db) {
    // Static fallback: filter static seats dataset by chamberId
    const initialSeats = seatsData.filter((s) => s.chamberId === chamberId);
    onUpdate(initialSeats.length > 0 ? initialSeats : seatsData);
    return () => {};
  }

  try {
    const seatsRef = collection(db, 'seats');
    const q = query(seatsRef, where('chamberId', '==', chamberId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore collection has no documents yet, supply static seed seats
          const staticSeats = seatsData.filter((s) => s.chamberId === chamberId);
          onUpdate(staticSeats.length > 0 ? staticSeats : seatsData);
          return;
        }

        const seats: SeatPortfolioEntity[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<SeatPortfolioEntity, 'id'>),
        }));
        onUpdate(seats);
      },
      (error) => {
        console.warn('[Firebase] Seat listener error, falling back to static seats:', error);
        const staticSeats = seatsData.filter((s) => s.chamberId === chamberId);
        onUpdate(staticSeats.length > 0 ? staticSeats : seatsData);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.warn('[Firebase] Failed to create listener:', error);
    const staticSeats = seatsData.filter((s) => s.chamberId === chamberId);
    onUpdate(staticSeats.length > 0 ? staticSeats : seatsData);
    return () => {};
  }
}
