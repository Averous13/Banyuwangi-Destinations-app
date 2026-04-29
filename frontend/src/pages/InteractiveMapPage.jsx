import { useState, useMemo, useEffect } from "react";
import TestMap from "@/components/BigMap";
import DestList from "@/components/DestList";
import destinationApi from "@/api/destination";
import { toast } from "sonner";
import { Camera, TreePalm, Landmark, Trees, FerrisWheel, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  {label:"Semua"  ,Icon: Camera,     cssVar: "--color-ijen-cyan"},
  {label:"Pantai"  ,Icon: TreePalm,      cssVar: "--color-ocean-blue" },
  {label:"Budaya"  , Icon: Landmark,      cssVar: "--color-ijen-purple" },
  {label:"Alam"  , Icon: Trees,         cssVar: "--color-bay-green" },
  {label:"Buatan"  , Icon: FerrisWheel,   cssVar: "--color-ijen-orange" },
  {label:"Konservasi"  , Icon: Leaf,      cssVar: "--color-ijen-green" },
]

const InteractiveMapPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await destinationApi.get("/");
        setDestinations(response.data.destinations);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data, try again please");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, []);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchCategory =
        activeCategory === "Semua" || d.category === activeCategory;

      const matchSearch = d.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, search, destinations]);

  return (
    <div className="flex h-screen font-sans">
      
      {/* Sidebar */}
      <div className="w-80 flex flex-col border-r bg-card">
        
        {/* Header */}
        <div className="p-4 border-b">
          <h3 className="mb-3">Wisata Indonesia</h3>

          {/* Search */}
          <input
            type="text"
            placeholder="Cari destinasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />

          {/* Filter kategori */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`
                  flex flex-col items-center gap-2 py-3 rounded-xl transition-all
                  ${activeCategory === cat.label
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {/* Icon Circle */}
                <Button
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: `var(${cat.cssVar})` }}
                >
                  <cat.Icon size={22} color="white" strokeWidth={2} />
                </Button>

                {/* Label */}
                <span className="text-xs font-medium text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* List destinasi */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <p className="text-center text-muted-foreground mt-10">
              Loading...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">
              Tidak ada destinasi ditemukan
            </p>
          ) : (
            filtered.map((dest) => (
              <DestList
                key={dest._id}
                dest={dest}
                isSelected={dest.id === selectedId}
                onClick={() => setSelectedId(dest._id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <TestMap
          destinations={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  );
};

export default InteractiveMapPage;