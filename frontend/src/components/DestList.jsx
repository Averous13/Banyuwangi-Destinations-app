// src/components/CardTest.jsx
const DestList = ({ dest, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all border
      ${isSelected
        ? "border-transparent shadow-md"
        : "border-border bg-card hover:border-accent/50 hover:shadow-sm"}
    `}
    style={isSelected ? { backgroundColor: `var(--color-accent)` } : {}}
  >
    {/* Gambar */}
    <img
      src={dest.image.url}
      alt={dest.name}
      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
    />

    {/* Konten */}
    <div className="flex-1 min-w-0">
      <h7 className={`text-sm font-semibold truncate ${isSelected ? "text-white" : "text-foreground"}`}>
        {dest.name}
      </h7>
      <p className={`text-xs mt-0.5 ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
        {dest.category}
      </p>
    </div>
  </div>
);

export default DestList;