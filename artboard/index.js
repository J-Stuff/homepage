document.addEventListener("DOMContentLoaded", function() {
    
    var board = document.getElementById("ART_BOARD"); 

    async function getPosts() {
        const response = await fetch("/artboard/assets/index.json");
        const data = await response.json();
        console.debug(data);
        return data;
    }
    
    async function getImg(id) {
        const response = await fetch(`/artboard/assets/art/${id}.png`);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }
    
    window.onload = async function() {
    
        const posts = await getPosts();
        for (const post of posts) {
            let payload = document.createElement("span");
            payload.classList.add("post");
    
            let post_image = new Image();
            post_image.href = `/artboard/assets/art/${post.id}.png`;
            post_image.src = await getImg(post.id);
            post_image.classList.add("post-img");
            payload.appendChild(post_image);

            let image_link = document.createElement("a");
            image_link.href = `/artboard/assets/art/${post.id}.png`;
            image_link.target = "_blank";
            image_link.appendChild(post_image);
            payload.appendChild(image_link);
    
            let post_info = document.createElement("div");
            post_info.classList.add("post-info");
            payload.appendChild(post_info);
    
            let post_title = document.createElement("h3");
            post_title.textContent = post.title; // Assuming the post object has a title property
            post_info.appendChild(post_title);
    
            let post_artist = document.createElement("p");
            post_artist.innerHTML = `By <a href="${post.artist_link}" target="_blank">${post.artist}</a>`; // Assuming the post object has artist and artist_link properties
            post_info.appendChild(post_artist);
    
            board.appendChild(payload);
            board.appendChild(document.createElement("br"));
        }
    }
})