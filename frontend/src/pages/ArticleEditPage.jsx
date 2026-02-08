import { useState } from "react"
import TiptapEditor from "../components/TipTap"


const ArticleEditPage = () => {
    const [content, setContent] = useState('');
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <TiptapEditor value={content} onChange={setContent}/>
            </div>
        </>
    )
}

export default ArticleEditPage