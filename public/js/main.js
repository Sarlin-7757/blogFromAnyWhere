document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/blogs')
        .then(response => response.json())
        .then(data => {
            const blogsContainer = document.getElementById('blogs');
            data.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.classList.add('blog-post');
                const encodedTitle = encodeURIComponent(blog.title);
                blogElement.innerHTML = `
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-content">${blog.content.substring(0, 100)}... <a href="blog-post.html?title=${encodedTitle}">Read More</a></p>
                `;
                blogsContainer.appendChild(blogElement);
            });
        })
        .catch(error => console.error('Error fetching blogs:', error));
});
