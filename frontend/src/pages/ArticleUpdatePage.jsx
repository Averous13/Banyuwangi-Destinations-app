import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import TiptapEditor from "../components/TipTap"
import { useNavigate } from "react-router-dom";
import destinationApi from "@/api/destination";
import {
    FieldSet,
    FieldLabel,
    Field
} from "../components/ui/field";
import { Input } from "@/components/ui/input";
import {toast} from "sonner"
import Title2 from "@/components/Title2";
import { Button } from "@/components/ui/button"; 
import ImagePreviewer from "@/components/ImagePreviewer";
import articleApi from "@/api/article";

import { useForm, Controller} from "react-hook-form";


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
            title: '',
            content: localStorage.getItem('article-content') || '',
            author: '',
            status: '',
            related: ''
        }
        });
    const [data, setData] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [isUpload, setIsUpload] = useState(false);
    const contentValue = watch("content")
    const navigate = useNavigate();


    useEffect(() => {
        localStorage.setItem('article-content', contentValue);
    }, [contentValue]);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await destinationApi.get(`/${id}`);
                const article = await articleApi.get(`/destination/${id}`);
                const data = response.data;
                setData(data);
                reset({
                    title: article.data.data[0].title,
                    content: article.data.data[0].content,
                    author: article.data.data[0].author,
                    status: article.data.data[0].status,
                    related: id
                })
            } catch(error) {
                toast.error(`Data fetching failed: ${error}`);
            } finally {
                setIsLoading(false)
            }

    } 

    fetchDestination()
    }, [id]);

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
                    <Title2 title={`Write down about ${data.name}`} spaceY="pt-2">
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
                        <div className="grid grid-cols-4 gap-4">
                            <Field className="col-span-3">
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
                        </div>
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