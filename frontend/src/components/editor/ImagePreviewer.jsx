import React, {useState, useEffect } from "react";

const ImagePreviewer = ({onChange, 
    label = "Image (Required) *", 
    error, 
    oldImage, 
    width = "max-w-md", 
    height = "h-64"}) => {
    const [mainPreview, setMainPreview] = useState(null);

    
    const handleMainImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setMainPreview(URL.createObjectURL(file));
        
        
        if (onChange) {
            onChange(file);
        }
    };

    //clean memory
    useEffect(() => {
        return () => {
            if (mainPreview) {
                URL.revokeObjectURL(mainPreview);
            }
        };
    }, [mainPreview]);

    const previewSource = mainPreview || oldImage;
    return (
        <>
            <div className="border-2 border-dashed border-primary p-6 rounded-lg">
            <label className="block mb-2 font-semibold text-lg">
                {label}
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                required={!oldImage}
                className="w-full p-2"
            />
            </div>   

            {error && (
                <p className="text-sm text-destructive mt-2">
                    {error}
                </p>
            )}

            {previewSource && (
                <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                        {mainPreview ? "New Image Preview" : "Current Image:"}
                    </p>
                    <img src={previewSource} alt="Main Preview" 
                    className={`w-full ${width} ${height} object-cover rounded-lg shadow-lg`}/>
                </div>
            )}
        </>

    )
}

export default ImagePreviewer;