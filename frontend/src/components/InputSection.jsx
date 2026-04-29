import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";


const InputSection = ({ label, value, onChange, withItemLabel = false }) => {
    const addItem = () => {
        onChange({
            ...value,
            items: [...(value?.items || []), { label: "", detail: ""}],
        });
    };

    const removeItem = (index) => {
        const updated = value.items.filter((_, i) => i !== index);
        onChange({...value, items: updated});
    };

    const updateItem = (index, field, val) => {
        const updated = value.items.map((item, i) => 
            i === index ? { ...item, [field]: val } : item
        );
        onChange({ ...value, items: updated});
    };

    const updateDescription = (val) => {
        onChange({ ...value, description: val});
    };

      return (
    <div className="space-y-3">
      {/* Deskripsi paragraf */}
      <Textarea
        placeholder={`Deskripsi umum ${label.toLowerCase()}...`}
        rows={3}
        value={value?.description || ""}
        onChange={(e) => updateDescription(e.target.value)}
      />

      {/* List items */}
      <div className="space-y-2">
        {(value?.items || []).map((item, index) => (
          <div key={index} className="flex gap-2 items-start border rounded-lg p-3 bg-muted/30">
            <div className="flex-1 space-y-2">

              {/* Label opsional (untuk waktu: "Musim ramai", akses bisa kosong) */}
              {withItemLabel && (
                <Input
                  placeholder="Label (contoh: Musim ramai)"
                  value={item.label}
                  onChange={(e) => updateItem(index, "label", e.target.value)}
                />
              )}

              <Input
                placeholder="Detail..."
                value={item.detail}
                onChange={(e) => updateItem(index, "detail", e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-muted-foreground hover:text-destructive transition-colors mt-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus size={14} className="mr-1" /> Tambah Detail
      </Button>
    </div>
  );
};

export default InputSection;