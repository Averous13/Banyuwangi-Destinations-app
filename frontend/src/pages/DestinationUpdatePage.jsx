import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldDescription,
  FieldLegend,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { toast } from "sonner";

import Header from "../components/Header";
import InputArray from "../components/InputArray";
import ImagePreviewer from "../components/ImagePreviewer";
import { latLongToMapUrl } from "@/utils/latLongToMapUrl";

import destinationApi from "../api/destination";


const DestinationUpdatePage = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [oldImage, setOldImage] = useState(null);

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
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

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const res = await destinationApi.get(`/${id}`);
                const data = res.data;
                reset({
                    name:data.name,
                    category: data.category,
                    tags: data.tags || [],
                    contacts: data.contacts || [],
                    loc: latLongToMapUrl(data.location.lat, data.location.long),
                    description: data.description,
                    image: null,
                });

                setOldImage(data.image?.url || null);
            } catch (error) {
                toast.error(`Failed to load destination: ${error}`);
                navigate("/data-destination");
            } finally {
                setFetching(false);
            }
        };

        fetchDestination();
    }, [id, reset, navigate]);

    const submitHandler = async (data) => {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (value === null || value === undefined) return;

            if (Array.isArray(value)) {
                value.forEach((v) => formData.append(key, v));
            } else {
                formData.append(key, value)
            }
        })

        console.log([...formData.entries()]);
        try {
            setLoading(true);
            await destinationApi.put(`/${id}`, formData, {
                withCredentials: true,
            });

            toast.success("Destination updated successfully");
            navigate("/data-destinations");
        } catch (error) {
            toast.error(`Failed to update destination ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const description = watch("description") || "";
    const wordCounter = description
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    if (fetching) {
        return <p className="text-center py-20">Loading...</p>;
    }
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
                                    validate: file => {
                                        if(!file) {
                                            return true;
                                        }

                                        const maxSize = 2 * 1024 * 1024

                                        return (
                                            file.size <= maxSize ||
                                            "Image size must be less than 2 MB"
                                        );
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <ImagePreviewer onChange={field.onChange} error={fieldState.error?.message} oldImage={oldImage}/>
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

export default DestinationUpdatePage;