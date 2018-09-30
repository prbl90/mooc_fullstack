


const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes;
    };

    return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    if(blogs) {
        let favBlog = blogs.length > 0 ? blogs[0] : null;

        blogs.forEach((blog) => {
            if (blog.likes > favBlog.likes)
                favBlog = blog;
        });

        return favBlog;
    }
    return null;
};

const mostBlogs = (blogs) => {
    if(blogs && blogs.length > 0) {
        let blogsPerAuthor = {};
        let mostBlogsAuthor = blogs[0].author;
        let mostBlogsCount = 1;

        blogs.forEach((blog) => {
            if (blogsPerAuthor[blog.author]) {
                blogsPerAuthor[blog.author] += 1;
                if(blogsPerAuthor[blog.author] > mostBlogsCount) {
                    mostBlogsAuthor = blog.author;
                    mostBlogsCount = blogsPerAuthor[blog.author];
                }
            }
            else
                blogsPerAuthor[blog.author] = 1;
        });

        return { author: mostBlogsAuthor, blogs: mostBlogsCount};
    }
    return null;
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
};