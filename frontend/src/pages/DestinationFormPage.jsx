import React,{ useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import {Textarea} from "../components/ui/textarea";
import {
    Field,
    FieldSet,
    FieldGroup,
    FieldDescription,
    FieldLegend,
    FieldLabel
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../components/ui/select";
import { toast } from "sonner";

import Header from "../components/Header";
import InputArray from "../components/InputArray";
import ImagePreviewer from "../components/ImagePreviewer";

import destinationApi from "../api/destination";

const DestinationFormPage = () => {

    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: "",
            category: "",
            tags: [],
            contacts: [],
            loc: "",
            description: "",
            image: null,
        },
    });


    const submitHandler = async (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value === null || value === undefined) return;

            if (Array.isArray(value)) {
                value.forEach(v => formData.append(key, v));
            } else {
                formData.append(key, value);
            }
        });

        // console.log([...formData.entries()]);


        try {
            setLoading(true);
            await destinationApi.post("/", formData, {
                withCredentials: true,
            });
            toast.success("Destination created successfully");
            navigate("/data-destinations");
        } catch (error) {
            console.log("Error creating note:", error);
            if (error.response.status === 429) {
                toast.error("Slow down! You're creating note too fast", {
                duration: 4000,
                icon: "💀",
            });
        } else {
            toast.error("Failed to create note");
            }
        } finally {
        setLoading(false);
        }
    }

    const description = watch("description") || "";
    const wordCounter = description
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    
    return (
        <>
        <Header />
        <section id="form-dest" className="min-h-screen grid place-items-center bg-muted/40 py-24" >
            <div className="w-full max-w-2xl rounded-xl border bg-background p-6 shadow-lg transition-all hover:shadow-xl">
            <form onSubmit={handleSubmit(submitHandler)}>
                <FieldSet>
                    <FieldLegend>
                            Destination
                    </FieldLegend>
                    <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel>
                                Name
                            </FieldLabel>
                            <Input placeholder="Name of destination" 
                                {...register("name", {required: true})}
                                className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}/>
                            {errors.name &&(
                                <p className="text-sm text-destructive mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Category</FieldLabel>
                            <Controller
                            name="category"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Destination Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pantai">Pantai</SelectItem>
                                    <SelectItem value="Alam">Alam</SelectItem>
                                    <SelectItem value="Budaya">Budaya</SelectItem>
                                    <SelectItem value="Taman">Taman</SelectItem>
                                    <SelectItem value="Buatan">Buatan</SelectItem>
                                </SelectContent>
                                </Select>
                            )}
                            />
                        </Field>

                         {/* Tags    */}
                        <Controller
                            name="tags"
                            control={control}
                            render={({field}) => (
                                <InputArray 
                                    label="Tags"
                                    value={field.value}
                                    onChange={field.onChange}/>
                            )}
                        ></Controller>

                        {/* Contacts */}
                        <Controller
                            name="contacts"
                            control={control}
                            render={({field}) => (
                                <InputArray 
                                label="Contact"
                                value={field.value}
                                onChange={field.onChange}/>
                            )}
                        ></Controller>


                    </div>
                    </FieldGroup>

                    <FieldGroup>
                        <Field>
                            <FieldLabel>
                                Location
                            </FieldLabel>
                            <FieldDescription>
                                Input as Google Map Link
                            </FieldDescription>
                            <Input 
                                {...register("loc", {required: true 
                                })} />
                        </Field>

                        <Field>
                            <FieldLabel>
                                Description
                            </FieldLabel>
                            <FieldDescription>
                                Minimun at least contain 50 words
                            </FieldDescription>
                            <Textarea 
                                {...register("description", {
                                    required: true,
                                    validate: (v) => 
                                        v.trim().split(/\s+/).length >= 50,
                                })}/>
                            <FieldDescription>
                                It containt {wordCounter} words
                            </FieldDescription> 
                        </Field>

                        <Field>
                            <Controller
                                name="image"
                                control={control}
                                rules={{
                                    required: "Image is required",
                                    validate: file => {
                                        if(!file) {
                                            return "Image is required";
                                        }

                                        const maxSize = 2 * 1024 * 1024

                                        return (
                                            file.size <= maxSize ||
                                            "Image size must be less than 2 MB"
                                        );
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <ImagePreviewer onChange={field.onChange} error={fieldState.error?.message}/>
                                )}
                            ></Controller>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <div className="pt-8">
                <Field orientation="horizontal" className="flex justify-end ">
                    <Button type="submit" disabled={loading}>{loading ? "Submiting....." : "Submit"}</Button>
                    <Button variant="outline" type="button">
                    Cancel
                    </Button>
                </Field>
                </div>
            </form>
            </div>
        </section>
        </>  
    )
}

export default DestinationFormPage;