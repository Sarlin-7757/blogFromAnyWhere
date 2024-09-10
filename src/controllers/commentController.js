import Blog from '../model/blogs.js';
import Comment from '../model/comment.js';

export const createCommentByTitle = async (req, res) => {
    const { title } = req.params;  
    const { name, email, comment } = req.body;

    try {
        // Find the blog by title
        const blog = await Blog.findOne({ title:new RegExp(`^${title}$`, 'i')});

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Create the new comment
        const newComment = new Comment({
            name,
            email,
            comment,
            blog: blog._id  
        });

        const savedComment = await newComment.save();

        // Add the comment to the blog post
        await Blog.findByIdAndUpdate(blog._id, {
            $push: { comments: savedComment._id }
        });

        res.status(201).json({ message: 'Comment added successfully', comment: savedComment });
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

export const getCommentsForBlogByTitle = async (req, res) => {
    const { title } = req.params;  // Use title instead of blogId

    try {
        // Find the blog by title
        const blog = await Blog.findOne({ title: new RegExp(`^${title}$`, 'i')}).populate('comments');

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json(blog.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving comments', error });
    }
};