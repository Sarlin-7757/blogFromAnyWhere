document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const blogTitle = queryParams.get('title');

    if (blogTitle) {
        // Fetch the blog post details
        fetch(`/api/blogs/${encodeURIComponent(blogTitle)}?t=${Date.now()}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('blog-title').innerText = data.title;
                document.getElementById('blog-content').innerText = data.content;
            })
            .catch(error => console.error('Error fetching blog post:', error));

        // Fetch comments for the blog post
        fetch(`/api/comments/${encodeURIComponent(blogTitle)}?t=${Date.now()}`)
            .then(response => response.json())
            .then(data => {
                const commentsContainer = document.getElementById('comments');
                commentsContainer.innerHTML = ''; // Clear existing comments
                data.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <h4>${comment.name}</h4>
                        <p>${comment.comment}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));

        // Form-submission logic
        document.getElementById('comment-form').addEventListener('submit', (event) => {
            event.preventDefault();

            const name = event.target.name.value;
            const email = event.target.email.value;
            const comment = event.target.comment.value;

            fetch(`/api/comments/${encodeURIComponent(blogTitle)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, comment })
            })
            .then(response => response.json())
            .then(data => {
                // Adding new comment to the list
                const newCommentElement = document.createElement('div');
                newCommentElement.classList.add('comment');
                newCommentElement.innerHTML = `
                    <h4>${data.comment.name}</h4>
                    <p>${data.comment.comment}</p>
                `;
                document.getElementById('comments').appendChild(newCommentElement);
                event.target.reset(); // Clear the form
            })
            .catch(error => console.error('Error adding comment:', error));
        });
    }
});
