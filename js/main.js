const postsDiv = document.querySelector(".posts");
const loading = document.querySelector(".loader");
const filter = document.querySelector(".filter-input");

let postsPerPage = 5;
let numOfPages = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${postsPerPage}&_page=${numOfPages}`
  );

  const data = await res.json();
  return data;
}

// Show loader and fetch posts
function showLoading() {
  // add class show
  loading.classList.add("show");

  setTimeout(() => {
    // remove class .show
    loading.classList.remove("show");

    setTimeout(() => {
      numOfPages++; // Increase number of pages
      showPosts();
    }, 200);
  }, 1000);
}

//  Filter posts
function filterPosts(e) {
  const word = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();

    if (title.indexOf(word) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}
filter.addEventListener("input", filterPosts);

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElem = document.createElement("div");
    postElem.classList.add("post");
    postElem.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>`;

    postsDiv.appendChild(postElem);
  });
}

// Show posts
showPosts();

// Show loader on scroll event
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
