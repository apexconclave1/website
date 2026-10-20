'use client';

import React, { useState, useEffect } from 'react';
import { SeatPortfolioEntity, ChamberEntity } from '@/types/schema';
import { subscribeToSeats } from '@/lib/firebase/seats';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Filter, CheckCircle, Clock, Lock } from 'lucide-react';

export interface SeatMatrixProps {
  chambers: ChamberEntity[];
  selectedChamberId: string;
  onSelectSeat?: (seat: SeatPortfolioEntity) => void;
}

export function SeatMatrix({
  chambers,
  selectedChamberId,
  onSelectSeat,
}: SeatMatrixProps) {
  const [activeChamberId, setActiveChamberId] = useState(selectedChamberId);
  const [seats, setSeats] = useState<SeatPortfolioEntity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  useEffect(() => {
    setActiveChamberId(selectedChamberId);
  }, [selectedChamberId]);

  useEffect(() => {
    const unsubscribe = subscribeToSeats(activeChamberId, (updatedSeats) => {
      setSeats(updatedSeats);
    });
    return () => unsubscribe();
  }, [activeChamberId]);

  const filteredSeats = seats.filter((seat) => {
    const matchesSearch = seat.portfolioName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === 'ALL' || seat.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const availableCount = seats.filter((s) => s.status === 'AVAILABLE').length;
  const reservedCount = seats.filter((s) => s.status === 'RESERVED').length;
  const allocatedCount = seats.filter((s) => s.status === 'ALLOCATED').length;

  return (
    <div className="bg-surface border border-[#1a1d1e] rounded-lg p-6 space-y-6">
      {/* Header & Chamber Selector Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#212527] pb-5">
        <div>
          <h3 className="text-xl font-bold text-soft-white">
            Country Portfolio Matrix
          </h3>
          <p className="text-xs text-muted-grey mt-0.5">
            Agent-free direct delegation seat tracking powered by real-time status.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101213] border border-[#212527]">
            <CheckCircle className="w-3.5 h-3.5 text-soft-white" />
            <span className="text-muted-grey">Available:</span>
            <span className="text-soft-white font-semibold">{availableCount}</span>
          </div>
          <div className="flex items-[#101213] gap-1.5 px-2.5 py-1 rounded bg-[#101213] border border-[#212527]">
            <Clock className="w-3.5 h-3.5 text-muted-grey" />
            <span className="text-muted-grey">Reserved:</span>
            <span className="text-muted-grey font-semibold">{reservedCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101213] border border-[#212527]">
            <Lock className="w-3.5 h-3.5 text-warm-bronze" />
            <span className="text-muted-grey">Allocated:</span>
            <span className="text-warm-bronze font-semibold">{allocatedCount}</span>
          </div>
        </div>
      </div>

      {/* Committee Chamber Selection Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {chambers.map((chamber) => (
          <button
            key={chamber.id}
            onClick={() => setActiveChamberId(chamber.id)}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
              activeChamberId === chamber.id
                ? 'bg-soft-white text-bg'
                : 'bg-[#101213] text-muted-grey hover:text-soft-white hover:bg-[#181a1b] border border-[#212527]'
            }`}
          >
            {chamber.code} — {chamber.name}
          </button>
        ))}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-muted-grey absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search country or portfolio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white placeholder:text-muted-grey focus:outline-none focus:border-warm-bronze"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-grey" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white px-3 py-2 focus:outline-none focus:border-warm-bronze"
          >
            <option value="ALL">All Regions</option>
            <option value="Americas">Americas</option>
            <option value="Asia-Pacific">Asia-Pacific</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Middle East">Middle East</option>
          </select>
        </div>
      </div>

      {/* Seat Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {filteredSeats.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-grey text-sm">
            No country portfolios match your search criteria.
          </div>
        ) : (
          filteredSeats.map((seat) => (
            <div
              key={seat.id}
              className="bg-[#0d0f10] border border-[#1f2325] rounded p-4 flex items-center justify-between hover:border-[#2f3538] transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-soft-white text-sm">
                    {seat.portfolioName}
                  </span>
                  {seat.isoCode && (
                    <span className="text-[10px] font-mono uppercase bg-[#181b1d] text-muted-grey px-1.5 py-0.5 rounded border border-[#24292c]">
                      {seat.isoCode}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-grey flex items-center gap-2">
                  <span>{seat.region}</span>
                  {seat.assignedDelegateName && (
                    <span className="text-warm-bronze">
                      • {seat.assignedDelegateName}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge status={seat.status} />
                {seat.status === 'AVAILABLE' && onSelectSeat && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectSeat(seat)}
                    className="text-xs px-2.5 py-1"
                  >
                    Select
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
