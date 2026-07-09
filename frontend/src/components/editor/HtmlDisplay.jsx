// components/HtmlContent.jsx
import DOMPurify from 'dompurify';

const HtmlContent = ({ content, className = '' }) => {
    if (!content) return null;

    const cleanHTML = DOMPurify.sanitize(content, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target']
    });

    return (
        <div 
            className={`tiptap-content ${className}`}
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
    );
};

export default HtmlContent;