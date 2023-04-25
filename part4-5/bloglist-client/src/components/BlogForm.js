import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const AddBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2 className="text-xl text-blue-950 pt-8 pb-4">Create New</h2>
            <form onSubmit={AddBlog} className="grid gap-4">
                <div className="grid gap-2 grid-cols-5">
                    <label className="col-span-1 grid items-center justify-start text-xl">
                        title:
                    </label>
                    <input
                        className="col-span-4 border-2 border-black rounded-md p-2"
                        id="title"
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div className="grid gap-2 grid-cols-5">
                    <label className="col-span-1 grid items-center justify-start text-xl">
                        author:
                    </label>
                    <input
                        className="col-span-4 border-2 border-black rounded-md p-2"
                        id="author"
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div className="grid gap-2 grid-cols-5">
                    <label className="col-span-1 grid items-center justify-start text-xl">
                        url:
                    </label>
                    <input
                        className="col-span-4 border-2 border-black rounded-md p-2"
                        id="url"
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <div className="grid items-center justify-center">
                    <button
                        className="border-2 border-blue-950 text-blue-700 text-lg px-8 hover:bg-blue-700 hover:text-white py-2 rounded-lg"
                        id="create"
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
