import "./style.css";
import { get } from "./api";
import { formatUnixTime, getDomainFromUrl, getTimeSinceUnix } from "./util";

const topstories = document.getElementById("topstories");

const addItem = (post: number) => {
  get(`https://hacker-news.firebaseio.com/v0/item/${post}.json`).then(
    (res: {
      id: number;
      type: string;
      url: string;
      title: string;
      by: string;
      score: number;
      time: number;
      descendants: number;
    }) => {
      const post = document.createElement("div");
      post.classList.add("post");

      const post_title = document.createElement("span");
      post_title.classList.add("post_title");
      post_title.setAttribute("title", res.title);

      const a = document.createElement("a");
      a.href = res.url;
      a.innerHTML = `${res.title} <span class="post_domain">(${getDomainFromUrl(
        res.url
      )})</span>`;
      post_title.append(a);

      post.append(post_title);

      const post_info = document.createElement("div");
      post_info.classList.add("post_info");
      post.append(post_info);

      const post_points = document.createElement("span");
      post_points.classList.add("post_points");
      post_points.setAttribute("title", `${res.score} points`);
      post_points.innerText = `↑ ${res.score}`;
      post_info.append(post_points);

      const post_author = document.createElement("span");
      post_author.classList.add("post_author");
      post_author.setAttribute("title", `by ${res.by}`);
      post_author.innerHTML = `by ${res.by}`;
      post_info.append(post_author);

      const post_time = document.createElement("span");
      post_time.classList.add("post_time");
      post_time.setAttribute("title", `${formatUnixTime(res.time)}`);
      post_time.innerText = `${getTimeSinceUnix(res.time)}`;
      post_info.append(post_time);

      if (res.descendants > 0) {
        const post_comments = document.createElement("span");
        post_comments.classList.add("post_comments");
        post_comments.setAttribute("title", `${res.descendants} comments`);
        post_comments.innerHTML = `<a href="https://news.ycombinator.com/item?id=${res.id}">${res.descendants} comments</a>`;
        post_info.append(post_comments);
      }

      topstories.append(post);
    }
  );
};

(async () => {
  get("https://hacker-news.firebaseio.com/v0/topstories.json").then(
    (res: Array<number>) => {
      for (let i = 0; i < res.length; i++) {
        // max number of posts to load
        if (i < 50) addItem(res[i]);
      }
    }
  );
})();
