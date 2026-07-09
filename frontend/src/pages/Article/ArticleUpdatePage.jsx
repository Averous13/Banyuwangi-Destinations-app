import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import TiptapEditor from "../../components/editor/TipTap"
import { useNavigate } from "react-router-dom";
import {
    FieldSet,
    FieldLabel,
    Field
} from "../../components/ui/field";

import { Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent
 } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import {toast} from "sonner"
import Title2 from "@/components/Title2";
import { Button } from "@/components/ui/button"; 
import ImagePreviewer from "@/components/editor/ImagePreviewer";
import articleApi from "@/api/article";

import { useForm, Controller} from "react-hook-form";
import destinationApi from "@/api/destination";


const ArticleUpdatePage = () => {
    const {id} = useParams();
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            title: "",
            content: localStorage.getItem('article-content') || "",
            author: "",
            status: "",
            related: id,
            hero: null,
            category: ""
        },
        });
    const [isUpload, setIsUpload] = useState(false);
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [existingHero, setExistingHero] = useState(null)
    const contentValue = watch("content")
    const navigate = useNavigate();


    useEffect(() => {
        localStorage.setItem('article-content', contentValue);
    }, [contentValue]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleApi.get(`/${id}`)
                const data = response.data

                console.log(data)
                reset({
                    title: data.title,
                    content: data.content,
                    author: data.author,
                    status: data.status,
                    hero: null,
                    related: data.related,
                    category: data.category


                })

                if (data.hero?.url) {
                    setExistingHero(data.hero.url)
                }
            } catch (error) {
                console.error("Error fetching data:", error)
                toast.error("Failed to load article data")
            }
        }

        fetchArticle();
    }, [id, reset])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await destinationApi.get('/')
                setData(response.data.destinations);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    const submitHandler = async (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === "hero" && (value === null || value === undefined)) return;
            if (value === null || value === undefined) return;

            if (Array.isArray(value)) {
                value.forEach(v => formData.append(key, v));
            } else {
                formData.append(key, value);
            }
        });
        console.log([...formData.entries()]);

        try {
            setIsUpload(true);
            await articleApi.put(`/${id}`, formData, {
                withCredentials: true,
            });

            const successMessage = data.status === "published"
                ? "Article Published Successfully"
                : "Article Saved as Draft";
            toast.success(successMessage);
            localStorage.removeItem('article-content');
            navigate("/data-article");
        } catch (error) {
            console.log("Error creating note:", error);
            if (error.response.status === 429) {
                toast.error("Slow down! You're creating note too fast", {
                duration: 4000,
                icon: "💀",
            });
        } else {
            toast.error("Failed to update article");
            }
        } finally {
        setIsUpload(false);
        }
    }

    const handlePublish = () => {
        setValue('status', 'published');
        handleSubmit(submitHandler)();
    }

    const handleDraft = () => {
        setValue('status', 'draft');
        handleSubmit(submitHandler)();
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <section className="min-h-screen grid place-items-center bg-muted/40">
                <div className="w-full max-w-7xl rounded-xl border bg-background p-6 shadow-lg transition-all hover:shadow-xl">
                    <form onSubmit={(e) => e.preventDefault()}>
                    <Title2 title={`Write down new article`} spaceY="pt-2">
                        <div className="flex gap-2">
                            <Button type="submit" disabled={isUpload} onClick={handleDraft}>
                                {isUpload ? "Saving....." : "Save"}
                            </Button>
                            <Button type="submit" disabled={isUpload} onClick={handlePublish}> 
                                {isUpload ? "Publishing....." : "Publish"}
                            </Button>

                        </div>
                    </Title2>
                    <FieldSet>
                            <Field>
                                <FieldLabel className="text-lg">
                                    Title
                                </FieldLabel>
                                <Input placeholder="Title max contain 60 character"
                                    {...register("title", {
                                        required: true,
                                        maxLength: 60})}
                                    className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""}/>
                                    {errors.title &&(
                                        <p className="text-sm text-destructive mt-1">
                                            {errors.title.message}
                                        </p>
                                    )}
                            </Field>
                            <div className="grid grid-cols-3 gap-4">
                            <Field>
                                <FieldLabel className="text-lg">
                                    Author
                                </FieldLabel>
                                <Input {...register("author", {
                                    required: true
                                })}
                                className={errors.author ? "border-destructive focus-visible:ring-destructive" : ""}/>
                                    {errors.author &&(
                                        <p className="text-sm text-destructive mt-1">
                                            {errors.author.message}
                                        </p>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel className="text-lg">Category</FieldLabel>
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
                                        <SelectValue placeholder="Select Article Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="populer">Populer</SelectItem>
                                        <SelectItem value="keluarga">Keluarga</SelectItem>
                                        <SelectItem value="budaya">Budaya</SelectItem>
                                        <SelectItem value="petualangan">Petualangan</SelectItem>
                                        <SelectItem value="event">Event</SelectItem>
                                        <SelectItem value="kuliner">Kuliner</SelectItem>
                                    </SelectContent>
                                    </Select>
                                )}
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="text-lg">Related</FieldLabel>
                                <Controller
                                name="related"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Related to Destination" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            None
                                        </SelectItem>
                                        {data.map((dest) => (
                                            <SelectItem key={dest._id} value={dest._id}>
                                                {dest.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                )}
                                />
                            </Field>
                            
                        </div>
                                <Field>
                                    <FieldLabel className="text-lg">
                                        Hero Image
                                    </FieldLabel>
                                    <Controller
                                        name="hero"
                                        control={control}
                                        rules={{
                                            required: "Hero is required",
                                            validate: file => {
                                                if(!file) {
                                                    return "Hero is required";
                                                }

                                                const maxSize = 5 * 1024 * 1024

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
                                <Controller
                                    name="content"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TiptapEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        />
                                    )}
                                    />
                    </FieldSet>

                    </form>
                </div>
            </section>

        </>
    )
}

export default ArticleUpdatePage