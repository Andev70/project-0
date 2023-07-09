<style>
.user-name-post {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #262626;
  font-weight: 600;
}

.count-number {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
}

.count-text {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
}

.name {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
}

.caption {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
}

.wrap-cap {
  line-height: 19px;
}

.more-caption {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #737373;
}
.all-comment {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #737373;
}

.time-num {
  font-size: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #737373;
}

.time-text {
  font-size: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #737373;
}

.comment-user {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
}

.comment-input::placeholder {
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.post-btn {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #b3dbff;
  font-weight: 600;
}
/* Responsive styles */
@media screen and (max-width: 768px) {
  .post-area-parent {
    padding: 2rem;
  }

  .post-wrapper {
    gap: 2rem;
  }

  /* Adjust width of post container */
  .post-first-parent {
    width: 100%;
  }

  /* Adjust width of post header */
  .profile-info {
    width: 100%;
  }

  /* Adjust size of profile picture */
  .profile-dp-post {
    width: 40px;
    height: 40px;
  }

  /* Reduce font sizes for better readability */
  .user-name-post,
  .count-number,
  .count-text,
  .name,
  .caption,
  .more-caption,
  .all-comment,
  .time-num,
  .time-text,
  .comment-user,
  .comment-input::placeholder,
  .post-btn {
    font-size: 12px;
  }

  /* Reduce height of post image container */
  .post-images {
    height: 300px;
  }

  /* Adjust height of post interaction area */
  .post-interection-area {
    height: 40px;
  }

  /* Adjust font size of post interaction icons */
  .like-regular-svg,
  .comment-svg,
  .share-svg,
  .save-svg {
    height: 18px;
    width: 18px;
  }

  /* Adjust font size of like count */
  .like-count-area {
    height: 16px;
    font-size: 12px;
  }

  /* Reduce height of post caption area */
  .caption-parent {
    margin-top: 1rem;
  }

  /* Reduce font size of post caption text */
  .caption {
    font-size: 12px;
  }

  /* Reduce font size of "View all" comment text */
  .comment-all-text {
    font-size: 12px;
  }

  /* Reduce font size of comment count */
  .comment-count {
    font-size: 12px;
  }

  /* Reduce font size of comment user and comment text */
  .comment-user,
  .comment {
    font-size: 12px;
  }

  /* Adjust height of time ago section */
  .times-ago-parent {
    height: 18px;
  }

  /* Adjust font size of time ago text */
  .time-num,
  .time-text {
    font-size: 8px;
  }

  /* Adjust height of comment input area */
  .comment-input-area {
    height: 24px;
    padding: 4px 0;
    outline: none;
  }

  /* Adjust width of comment input */
  .comment-input {
    width: 320px;
    outline: none;
  }

  /* Adjust font size of post button */
  .post-btn {
    font-size: 12px;
  }
}
</style>

<script>
import demoPicture from '../assets/cld-sample-3 (1).jpg';
import verified from '../assets/verified.svg';
import demoPostImg from '../assets/cld-sample-3.jpg';
</script>

<div class="post-area-parent for-padding pt-6 w-full h-screen pr-2 pl-2">
  <div
    class="post-wrapper post-background w-full h-max flex flex-col items-center gap-y-5"
  >
    <!-- single post starts here -->
    <section class="post-first-parent h-max w-[470px]">
      <div class="post-second-parent w-full h-max flex flex-col">
        <!-- post header start here  -->
        <header class="post-header w-full h-[60.36px] flex items-center">
          <div
            class="profile-info w-[422px] h-full pl-4 pr-1 pt-[14px] pb-[14px] flex items-center"
          >
            <span
              class="profile-dp-post w-8 h-8 rounded-full flex justify-center items-center overflow-hidden"
            >
              <img
                class="w-full h-full rounded-full"
                src="{demoPicture}"
                alt="dp"
              />
            </span>
            <span
              class="profile-name-post flex items-center pl-[16px] pr-[2px] pt-[2px] pb-[2px]"
            >
              <h1 class="user-name-post">cristiano</h1>
              <div class="checked-account pl-[2px]">
                <img
                  src="{verified}"
                  alt="verified"
                  class="blue-check-post w-[16px] h-[16px]"
                />
              </div>
            </span>
          </div>

          <section
            class="three-dot-post w-[48px] h-[40px] pr-2 flex justify-center items-center"
          >
            <div
              class="for-focus-effect w-full h-full flex justify-center items-center"
            >
              <svg
                aria-label="More Options"
                class="threedot-svg"
                color="rgb(115, 115, 115)"
                fill="rgb(115, 115, 115)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
              </svg>
            </div>
          </section>
        </header>

        <!-- post image starts here -->

        <section class="post-images w-full h-[587.5px] bg-blue-500">
          <img src="{demoPostImg}" class="w-full h-full" alt="post image" />
        </section>

        <div
          class="all-iterection-parent w-full h-max border-l border-gray-300"
        >
          <!-- post intarection starts here -->
          <section
            class="post-interection-area flex justify-between mt-1 pt-[6px] pl-4 pr-4 pb-2 w-full h-[54px]"
          >
            <div class="w-max h-full flex items-center gap-x-4">
              <svg
                aria-label="Like"
                class="like-regular-svg"
                color="rgb(142, 142, 142)"
                fill="rgb(142, 142, 142)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Like</title>
                <path
                  fill="#000"
                  d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                ></path>
              </svg>

              <svg
                aria-label="Comment"
                class="comment-svg"
                color="#000"
                fill="#000"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Comment</title>
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"></path>
              </svg>

              <svg
                aria-label="Share Post"
                class="share-svg"
                color="#000"
                fill="rgb(115, 115, 115)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Share Post</title>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"></line>
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"></polygon>
              </svg>
            </div>
            <div class="shave-icon-area h-full flex items-center">
              <svg
                aria-label="Save"
                class="save-svg"
                color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Save</title>
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"></polygon>
              </svg>
            </div>
          </section>

          <!-- post count starts here  -->
          <section
            class="like-count-area flex items-center gap-x-1 w-full px-4 h-[18px]"
          >
            <span class="count">
              <h1 class="count-number">6,035,275</h1>
            </span>
            <span class="count-text-area">
              <h1 class="count-text">likes</h1>
            </span>
          </section>

          <!-- post caption area starts here -->
          <section class="caption-parent w-full mt-2 h-max px-4 flex flex-col">
            <div class="caption-area w-full h-max">
              <h1 class="wrap-cap">
                <span class="name">cristiano</span>
                <span class="caption ml-1">
                  Very proud to have supported the Singapore Olympic Foundation
                  Peter Lim Scholarship for the past 10 years....
                </span>
              </h1>
            </div>
            <button class="more-caption w-max h-max">more</button>
          </section>

          <!-- post comment viewer starts here -->
          <section class="all-comment w-full h-max px-4 flex gap-x-1 mt-1">
            <span class="comment-all-text">View all</span>
            <span class="comment-count">40,610</span>
            <span class="comment-text">comments</span>
          </section>

          <!-- post two comment starts here -->
          <section class="two-comment-parent w-full px-4 h-max flex flex-col">
            <div
              class="first-comment-area w-full flex items-center justify-between"
            >
              <span class="comment-wrapper flex items-center gap-x-1">
                <h1 class="comment-user">andrewhenderson</h1>
                <h2 class="comment">💖</h2>
              </span>
              <span class="like-two-comment-first h-full">
                <svg
                  aria-label="Like"
                  class="small-like-svg"
                  color="#000"
                  fill="#000"
                  height="12"
                  role="img"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <title>Like</title>
                  <path
                    d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                  ></path>
                </svg>
              </span>
            </div>

            <div
              class="second-comment-area w-full flex items-center justify-between"
            >
              <span class="comment-wrapper flex items-center gap-x-1">
                <h1 class="comment-user">kimlimhl</h1>
                <h2 class="comment">💖</h2>
              </span>
              <span class="like-two-comment-second h-full">
                <svg
                  aria-label="Like"
                  class="small-like-svg"
                  color="#000"
                  fill="#000"
                  height="12"
                  role="img"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <title>Like</title>
                  <path
                    d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                  ></path>
                </svg>
              </span>
            </div>
          </section>

          <!-- post time ago starts here -->
          <section
            class="times-ago-parent pl-4 w-full h-[22px] border-b border-gray-300"
          >
            <span
              class="posted-time-wrapper flex mt-[2px] gap-x-1 w-full items-center h-[7px]"
            >
              <h1 class="time-num">2</h1>
              <h2 class="time-text">DAYS AGO</h2>
            </span>
          </section>

          <!-- post comment area starts here -->
          <section class="comment-input-area h-[30.73px] w-full pr-4 py-[6px]">
            <div
              class=" overflow-hidden content-wrapper w-full h-full flex justify-between items-center"
            >
              <input
                class="comment-input w-[424.47px] border-none outline-none"
                name="comment-input"
                placeholder="Add a comment..."
                type="text"
              />

              <div class="post-btn-area w-[28.8px]">
                <button class="post-btn">Post</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <!-- single post finished here -->
  </div>
</div>
