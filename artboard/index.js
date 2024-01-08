document.addEventListener("DOMContentLoaded", function() {
    
    let board = document.getElementById("ART_BOARD"); 

    function getPosts() {
        return fetch("/artboard/assets/index.json")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
    }

    function getImg(id) {
        return fetch(`/artboard/assets/art/${id}.png`)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
    }

    getPosts().then(posts => {
        posts.forEach(post => {
            let payload = document.createElement("span");
            payload.classList.add("post");

            let post_image = document.createElement("a")
            getImg(post.id).then(src => {
                post_image.href = src;
                post_image.target = "_blank";
                post_image.innerHTML = `<img class="post-img" src="${src}" alt="${post.name} loading="lazy"">` // Assuming the post object has a name property
                payload.appendChild(post_image);

                let post_info = document.createElement("div");
                post_info.classList.add("post-info");
                payload.appendChild(post_info);

                let post_title = document.createElement("h3");
                post_title.textContent = post.name; // Assuming the post object has a name property
                post_info.appendChild(post_title);

                let post_artist = document.createElement("p");
                post_artist.classList.add("post-artist");
                post_artist.innerHTML = `By <a href="${post.artist_link}" target="_blank">${post.artist}</a>`; // Assuming the post object has artist and artist_link properties
                post_info.appendChild(post_artist);

                if (post.source) {
                    let post_source = document.createElement("p");
                    post_source.classList.add("post-source");
                    post_source.innerHTML = `Source: <a href="${post.source}" target="_blank">here</a>`; // Assuming the post object has a source property
                    post_info.appendChild(post_source);
                }


                board.appendChild(payload);
                board.appendChild(document.createElement("br"));
                board.appendChild(document.createElement("br"));
                board.appendChild(document.createElement("br"));
            });
        })
    })
})