const dummy = (blogs) => {
    if (blogs.constructor === Array) {
        return 1
    }
}

const totalLikes = (blogs) => {
    if (blogs.constructor === Array) {
        const sum = blogs.reduce((a, b) => ({ likes: a.likes + b.likes }))
        return sum.likes
    }
    return null
}

const favouriteBlog = (blogs) => {
    if (blogs.constructor === Array) {
        const sortbylikes = blogs.sort((obj1, obj2) => obj2.likes - obj1.likes)
        return sortbylikes[0]
    }
    return null
}

const mostBlog = (bloglist) => {
    const keys = ['author']
    if (bloglist.constructor === Array) {
        const mostBlog = keys.map((key) => {
            return Object.values(
                bloglist.reduce((acc, obj) => {
                    let objKey = obj[key]
                    acc[objKey] = acc[objKey] || { blogs: 0, author: objKey }
                    acc[objKey].blogs += 1
                    return acc
                }, {})
            )
        })

        const sortmostBlog = mostBlog[0].sort(
            (obj1, obj2) => obj2.blogs - obj1.blogs
        )
        return sortmostBlog[0]
    }
}

const mostLikes = (bloglist) => {
    const mostlike = []
    if (bloglist.constructor === Array) {
        bloglist.forEach(({ author, likes }) => {
            const authorObj = mostlike.find((list) => list.author === author)
            if (authorObj) {
                authorObj.likes += likes
            } else {
                mostlike.push({ author, likes })
            }
        })
    }
    return mostlike.sort((a, b) => b.likes - a.likes)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlog,
    mostLikes,
}
