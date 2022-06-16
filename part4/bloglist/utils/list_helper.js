const dummy = (blogs) =>{
    if(blogs.constructor === Array){
        return 1;
    }
}

const totalLikes = (blogs) =>{
    if(blogs.constructor === Array){
        const sum = blogs.reduce((a, b) => ({likes: a.likes + b.likes}));
        return sum.likes;
    }
    return null;
}

module.exports = {
    dummy,
    totalLikes
}