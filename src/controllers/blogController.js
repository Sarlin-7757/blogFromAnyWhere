import Blog from "../model/blogs.js";


// Create a new blog post
export const createBlogPost = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const { title, author, content } = req.body;

        if (!title || !author || !content) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newBlogPost = new Blog({
            title,
            author,
            content
        });

        const savedBlogPost = await newBlogPost.save();
        res.status(201).json({ message: 'Blog post created successfully',savedBlogPost });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Error creating blog post', error });
    }
};

// Get all blog posts
export const getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await Blog.find().populate('comments');
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog posts', error });
    }
};


// Get a blog post by title
export const getBlogPostByTitle = async (req, res) => {
    const { title } = req.params;

    try {
        // Use a case-insensitive regular expression to find the blog post by title
        const blogPost = await Blog.findOne({ title: new RegExp(`^${title}$`, 'i') }).populate('comments');

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog post', error });
    }
};
