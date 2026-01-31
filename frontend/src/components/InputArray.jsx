import React, {useState} from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import {
    Field,
    FieldLabel
} from "../components/ui/field";

const InputArray = ( {
    label,
    value = [],
    onChange,
    placeholder = "Enter to add",
    normalize = (v) => v.trim(),
}) => {
    const [input, setInput] = useState("");

        const handleAddTag = (e) => {
            if (e.key !== "Enter") return
            e.preventDefault()


            const tag = normalize(input);
            if ( !tag || value.includes(tag)) return;
    
            onChange([...value, tag]);
            setInput("")
    
        }
    
        const removeTag = (tag) => {
            onChange(value.filter(t => t !== tag))
        }
    
    return (
    <Field>
        <FieldLabel>
            {label}
        </FieldLabel>
        <Input placeholder={placeholder} 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleAddTag}/>
        {/* preview tag */}
        {value.length > 0 &&
            <div className="flex flex-wrap gap-2">
            {value.map(tag => (
                <Badge 
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1 hover:bg-accent"
                >
                    {tag}
                    <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    >
                        <X size={14} />
                    </button>
                </Badge>
            ))}
        </div>
        }   
    </Field>
    )
}

export default InputArray;