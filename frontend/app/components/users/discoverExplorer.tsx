"use client";

import { CheckCircle2, Globe2, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "../public/card";
import GlobeDiscover from "./GlobeDiscover";

type Region = {
  id: string;
  country: string;
  state: string;
  label: string;
  x: number;
  y: number;
};

const regions: Region[] = [
  { id: "br-sp", country: "Brazil", state: "Sao Paulo", label: "Brazil / Sao Paulo", x: 42, y: 66 },
  { id: "br-rj", country: "Brazil", state: "Rio de Janeiro", label: "Brazil / Rio de Janeiro", x: 44, y: 68 },
  { id: "us-ca", country: "United States", state: "California", label: "United States / California", x: 15, y: 44 },
  { id: "us-ny", country: "United States", state: "New York", label: "United States / New York", x: 24, y: 43 },
  { id: "pt-lis", country: "Portugal", state: "Lisbon", label: "Portugal / Lisbon", x: 48, y: 42 },
  { id: "es-md", country: "Spain", state: "Madrid", label: "Spain / Madrid", x: 50, y: 41 },
  { id: "fr-idf", country: "France", state: "Ile-de-France", label: "France / Ile-de-France", x: 52, y: 39 },
  { id: "jp-tok", country: "Japan", state: "Tokyo", label: "Japan / Tokyo", x: 83, y: 45 },
  { id: "au-nsw", country: "Australia", state: "New South Wales", label: "Australia / New South Wales", x: 86, y: 74 },
  { id: "za-gp", country: "South Africa", state: "Gauteng", label: "South Africa / Gauteng", x: 56, y: 79 },
];

export default function DiscoverExplorer() {
  const [rotation, setRotation] = useState({ x: -12, y: 22 });
  const [dragging, setDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  const filteredRegions = useMemo(() => {
    if (!query.trim()) return regions;
    const normalized = query.toLowerCase();
    return regions.filter((region) => region.label.toLowerCase().includes(normalized));
  }, [query]);

  async function handleSearch(q: string) {
    const text = q.trim();
    if (!text) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&limit=1`
      );
      const arr = await res.json();
      if (arr && arr.length > 0) {
        const place = arr[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        setSelectedCoords({ lat, lng, name: place.display_name });
        // clear selectedRegion so UI uses live coords
        setSelectedRegion(null);
      }
    } catch (err) {
      // ignore for prototype
      console.error(err);
    }
  }

  function startDrag(clientX: number, clientY: number) {
    setDragging(true);
    setAnchor({ x: clientX, y: clientY });
  }

  function moveDrag(clientX: number, clientY: number) {
    if (!dragging || !anchor) return;
    const diffX = clientX - anchor.x;
    const diffY = clientY - anchor.y;

    setRotation((current) => ({
      x: Math.max(-45, Math.min(45, current.x - diffY * 0.14)),
      y: current.y + diffX * 0.2,
    }));
    setAnchor({ x: clientX, y: clientY });
  }

  function stopDrag() {
    setDragging(false);
    setAnchor(null);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <Card className="border-rose-300/20 bg-black/35 p-5">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200/75">Discover map</p>
            <h2 className="mt-1 text-2xl font-bold text-white">3D Globe Explorer</h2>
          </div>
          <span className="rounded-full border border-rose-300/20 bg-rose-500/10 px-3 py-1 text-xs text-rose-100/80">Drag to rotate</span>
        </div>

        <div className="relative mx-auto h-[450px] w-full max-w-[700px] rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(251,113,133,0.22),rgba(10,10,10,0.9)_60%),linear-gradient(180deg,rgba(34,5,19,0.9),rgba(8,7,15,0.95))] p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(59,130,246,0.2),transparent_45%)]" />

          <div className="flex h-full items-center justify-center">
            <div className="w-full max-w-[700px]">
              <GlobeDiscover
                lat={selectedCoords ? selectedCoords.lat : selectedRegion ? null : null}
                lng={selectedCoords ? selectedCoords.lng : selectedRegion ? null : null}
                onSelect={(d) => setSelectedCoords(d)}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="border-rose-300/20 bg-black/35 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-rose-200" />
            <h3 className="text-lg font-semibold text-white">Manual country/state search</h3>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.14em] text-white/55">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type country or state (press Enter to search)"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(query); } }}
              className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
            />
          </label>

          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={() => handleSearch(query)}
              className="inline-flex items-center gap-2 rounded-2xl bg-rose-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              onClick={() => { setQuery(''); setSelectedCoords(null); setSelectedRegion(null); }}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 max-h-[260px] space-y-2 overflow-y-auto pr-1">
            {filteredRegions.map((region) => {
              const isActive = selectedRegion?.id === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full rounded-2xl border px-3 py-3 text-left transition ${isActive ? "border-rose-300/40 bg-rose-500/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                >
                  <p className="text-sm font-semibold text-white">{region.country}</p>
                  <p className="text-xs text-white/60">{region.state}</p>
                </button>
              );
            })}

            {filteredRegions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-4 text-sm text-white/60">
                No result for this search.
              </div>
            ) : null}
          </div>
        </Card>

        <Card className="border-rose-300/20 bg-black/35 p-5">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-rose-200" />
            <h3 className="text-lg font-semibold text-white">Selection confirmation</h3>
          </div>

          {selectedRegion ? (
            <div className="space-y-3">
              <div className="rounded-2xl border border-rose-300/30 bg-rose-500/15 p-4">
                <p className="text-sm text-white/70">Selected location</p>
                <p className="mt-1 text-base font-semibold text-white">{selectedRegion.country} / {selectedRegion.state}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const payload = selectedCoords
                    ? { lat: selectedCoords.lat, lng: selectedCoords.lng, name: selectedCoords.name }
                    : selectedRegion
                    ? { name: selectedRegion.label }
                    : null;
                  if (payload) {
                    try {
                      localStorage.setItem('swipeRegion', JSON.stringify(payload));
                      alert('Location saved for Swipe session.');
                    } catch (e) {
                      console.error(e);
                    }
                  }
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-3 font-semibold text-white transition hover:from-rose-400 hover:to-red-400"
              >
                <Globe2 className="h-4 w-4" />
                Confirm location
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-4 text-sm text-white/60">
              Select a country/state on the globe or from the search list.
            </div>
          )}

          <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
            <MapPin className="h-3.5 w-3.5" />
            This is a visual prototype for the Discover experience.
          </p>
        </Card>
      </div>
    </section>
  );
}
