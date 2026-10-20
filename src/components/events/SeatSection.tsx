'use client';

import { useState } from 'react';
import { ChamberEntity, SeatPortfolioEntity } from '@/types/schema';
import { SeatMatrix } from '@/components/SeatMatrix';
import { ApplicationModal } from '@/components/ApplicationModal';

export default function SeatSection({ chambers }: { chambers: ChamberEntity[] }) {
  const [selectedSeat, setSelectedSeat] = useState<SeatPortfolioEntity | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <SeatMatrix
        chambers={chambers}
        selectedChamberId={chambers[0]?.id ?? ''}
        onSelectSeat={(seat) => {
          setSelectedSeat(seat);
          setOpen(true);
        }}
      />
      <ApplicationModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedSeat(null);
        }}
        selectedSeat={selectedSeat}
        chambers={chambers}
      />
    </>
  );
}
