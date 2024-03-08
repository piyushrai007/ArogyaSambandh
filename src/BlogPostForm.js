import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogPostForm() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [draft, setDraft] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);
            formData.append('category', category);
            formData.append('summary', summary);
            formData.append('content', content);
            formData.append('draft', draft);

            const response = await axios.post('https://piyushrai.pythonanywhere.com/api/blogpost/new/', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
            setError('Failed to submit blog post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    const handleEditorChange = (content) => {
        setContent(content);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex flex-col">
            <label className="font-bold">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
            <label className="font-bold">Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
            <label className="font-bold">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
                <option value="">Select a category</option>
                <option value="mental_health">Mental Health</option>
                <option value="heart_disease">Heart Disease</option>
                <option value="covid19">Covid19</option>
                <option value="immunization">Immunization</option>
            </select>
        </div>
        <div className="flex flex-col">
            <label className="font-bold">Summary</label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Enter summary" className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
                <label className="font-bold">Content</label>
                <ReactQuill value={content} onChange={handleEditorChange} />
            </div>
        <div className="flex items-center">
            <input id="draft" type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} />
            <label htmlFor="draft" className="ml-2">Draft</label>
        </div>
        {isLoading ? (
            <button type="button" disabled className="mt-4 bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                Submitting...
            </button>
        ) : (
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
);
}
export default BlogPostForm;
