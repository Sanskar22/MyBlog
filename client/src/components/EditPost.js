import React, { useEffect, useState } from 'react';
import '../createpost.css';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from './Editor';


export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setredirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);

                })
            })
    }, [])



    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setredirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <div className="form-style-6">
            <form onSubmit={updatePost}>
                <input type="title" name="field1" placeholder="Title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <input type="summary" name="field2" placeholder="Summary"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)} />
                <input type='file'
                    onChange={ev => setFiles(ev.target.files)}
                />
                <Editor onChange={setContent} value={content} />
                <input type="submit" value="Update Post" />
            </form>
        </div>
    )
}
