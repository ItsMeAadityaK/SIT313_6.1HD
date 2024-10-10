import React, { useState } from 'react';
import { handlePostSubmit } from './firebase';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import './PostForm.css';
import ReactMarkdown from 'react-markdown';

const QuesForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [code, setCode] = useState('');

    const handlePost = async () => {
        const post = {
            type: 'question',
            title,
            description,
            tags: tags.split(',').map(tag => tag.trim()),
            code,
        };

        try {
            await handlePostSubmit(post);
            console.log("Question posted successfully");
            setTitle('');
            setDescription('');
            setTags('');
            setCode('');
        } catch (error) {
            console.error("Error posting question:", error);
        }
    };

    return (
        <form className="post-form">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                placeholder="Start your question with how, what, why, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description">Describe your problem</label>
            <textarea
                id="description"
                placeholder="Describe your problem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="tags">Tags</label>
            <input
                type="text"
                id="tags"
                placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <label htmlFor="code">Code</label>
            <CodeMirror
                value={code}
                options={{
                    mode: 'javascript', // Set mode to match your language
                    theme: 'material',
                    lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                    setCode(value);
                }}
            />

            <button type="button" className="post-button" onClick={handlePost}>
                Post
            </button>

            {/* Displaying the code as markdown */}
            {code && (
                <div className="code-preview">
                    <h4>Preview:</h4>
                    <ReactMarkdown>{`\`\`\`javascript\n${code}\n\`\`\``}</ReactMarkdown>
                </div>
            )}
        </form>
    );
};

export default QuesForm;
