<style>
.dot {
  background-color: #676a79;
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.comment-said {
  background-color: #eef0f2;
  border-radius: 6.4px;
}
.comment-view {
  font-size: 13.125px;
}
.name {
  font-size: 15px;
  color: rgb(20, 25, 30);
}

.comment-input {
  border-radius: 0.4rem;
  border: 1px solid rgb(225, 228, 230);
}

.count-like {
  font-size: 13.12px;
  font-family: sans-serif;
  column-gap: 4px;
  margin-left: 4px;
}

.post-img {
  border-radius: 5.4px;
}
.caption {
  font-size: 15px;
}
.time,
.user-bio-short {
  font-size: 13.125px;
}
.name-poster {
  color: #14191e;
  font-family: sans-serif;
  font-size: 15px;
  font-weight: 600;
}

.single-post-wrapper {
  border-radius: 6.4px;
  border: 0.727273px solid rgba(0, 0, 0, 0.09);
}
</style>

<script>
import postDp from '../soflex-assets/images/post/1by1/04.jpg';
import threeDot from '../soflex-assets/images/icon/post-three-dot.svg';
import sharedImg from '../soflex-assets/images/post/3by2/01.jpg';
import like from '../soflex-assets/images/icon/heart-solid.svg';
import comment from '../soflex-assets/images/icon/comment-solid.svg';
import share from '../soflex-assets/images/icon/share-solid.svg';
</script>

<section
  class="all-wrapper-post flex flex-col items-center w-full h-max pt-4 pb-3 gap-y-4"
>
  <!-- single post wrapper -->
  <div class="single-post-wrapper h-max w-[369.09px] bg-white">
    <!-- card header starts -->
    <header class="header-post pl-[20px] pr-[20px] pt-[20px] w-full h-[68px]">
      <div
        class="header-contentw-full h-full justify-between items-center flex"
      >
        <!-- full profile info -->
        <section class="profile-post h-full w-[234.45px] flex items-center">
          <!-- profile-picture starts -->
          <span
            class=" flex justify-center items-center overflow-hidden profile-img w-[58px] pr-2"
          >
            <img
              src="{postDp}"
              alt="DP"
              class="profile-image w-12 h-12 rounded-full"
            />
          </span>
          <!-- profile pic finished -->
          <!-- info profile start -->
          <span
            class="profile-info-wrap w-[178.45px] h-[39.38px] flex flex-col"
          >
            <div class="name-time flex items-center">
              <h1 class="name-poster">Lori Ferguson</h1>
              <span
                class="time w-[47.15px] h-[19.69px] text-light-100 flex font-normal items-center font-sans"
              >
                <h1 class="ml-2 font-bold dot"></h1>
                <h1 class="ml-2">2hr</h1>
              </span>
            </div>
            <h1 class="font-sans user-bio-short text-light-100">
              Web Developer at Webestica
            </h1>
          </span>
        </section>
        <!-- dropdown start -->

        <div class="dropdown-parent w-[32.46px] h-[32.26px]">
          <button class="py-1 px-2 dropdown-action-post">
            <i class="w-full h-full">
              <svg
                aria-label="More Options"
                class="_ab6-"
                color="rgb(115, 115, 115)"
                fill="rgb(115, 115, 115)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                ><circle cx="12" cy="12" r="1.5"></circle><circle
                  cx="6"
                  cy="12"
                  r="1.5"></circle><circle cx="18" cy="12" r="1.5"
                ></circle></svg
              >
            </i>
          </button>
        </div>

        <!-- drop down finished -->
      </div>
    </header>
    <!-- post header is completed -->

    <!-- caption area is starting here -->

    <div class="caption-parent w-full px-[20px] pt-[20px] pb-4">
      <p class="caption text-light-100 font-sans">
        I'm thrilled to share that I've completed a graduate certificate course
        in project management with the president's honor roll.
      </p>
    </div>

    <!-- caption area is finished -->
    <!-- post image is starting here -->
    <section class="overflow-hidden post-image-parent px-[20px]">
      <img src="{sharedImg}" class="post-img" alt="SHARED IMAGE" />
    </section>
    <!-- post image is finished -->
    <!-- reaction react action starts -->
    <section class="reaction-parent w-full h-[59.87px] py-4 px-[20px]">
      <ul
        class="react-opts w-full h-full gap-x-[11.2px] items-center flex flex-wrap"
      >
        <!-- like svg is here -->
        <li
          class="text-light-100 py-1 flex like-parent items-center w-max h-full"
        >
          <i class="like-svg"></i>
          <img src="{like}" alt="LK" class="like w-[13.12px] h-[13.12px]" />
          <span class="count-like flex w-max h-max">
            <h1 class="like-text">Liked</h1>
            <h1 class="like-count">(56)</h1>
          </span>
        </li>
        <!-- like action button finished -->
        <!-- comment svg starts -->
        <li
          class="text-light-100 py-1 flex like-parent items-center w-max h-full"
        >
          <i class="like-svg"></i>
          <img src="{comment}" alt="LK" class="like w-[13.12px] h-[13.12px]" />
          <span class="count-like flex w-max h-max">
            <h1 class="like-text">Comments</h1>
            <h1 class="like-count">(56)</h1>
          </span>
        </li>

        <!-- comment svg is finished -->

        <!-- share svg is starting -->
        <li
          class="text-light-100 py-1 flex like-parent items-center w-max h-full"
        >
          <i class="like-svg"></i>
          <img src="{share}" alt="LK" class="like w-[13.12px] h-[13.12px]" />
          <span class="count-like flex w-max h-max">
            <h1 class="like-text">Share</h1>
            <h1 class="like-count">(56)</h1>
          </span>
        </li>

        <!-- share svg is finished -->
      </ul>
    </section>
    <!-- reaction action finished -->
    <!-- comment input starts -->
    <section class="comment-area w-full h-[56.5px] flex pb-4 px-[20px]">
      <!-- profile commenter -->
      <span class="comment-profile w-[35px] h-[35px] rounded-full">
        <img class="w-full h-full rounded-full" src="{postDp}" alt="CD" />
      </span>
      <!-- profile commenter finished -->
      <!-- input comment starts -->
      <input
        type="text"
        placeholder="Add a comment..."
        name="comment"
        class="comment-input w-[284.64px] h-[40.5px]py-2 pr-6 pl-4 ml-2"
      />
      <!-- input comment ends -->
    </section>
    <!-- comment input finished -->
    <!-- comment view start -->
    <section
      class="comment-view text-light-100 font-sans w-full h-max px-[20px]"
    >
      <div class="single-comment-area flex">
        <!-- profile area -->
        <span class="comment-dp w-[35px] h-[35px] rounded-full">
          <img class="w-full h-[35px] rounded-full" src="{postDp}" alt="CP" />
        </span>
        <!-- profile area finished -->
        <!-- all comment comment content -->
        <section class="all-comment-info ml-2 w-[284.64px] flex flex-col">
          <div class="comment-said h-max w-full p-4">
            <!-- commenter name -->
            <header class="commenter-name flex justify-between h-[22.75px]">
              <h1 class="name font-semibold">Frances Guerrero</h1>
              <h1 class="ago">5hr</h1>
            </header>
            <p class="comment-real">
              Removed demands expense account in outward tedious do. Particular
              way thoroughly unaffected projection.Removed demands expense
              account in outward tedious do. Particular way thoroughly
              unaffected projection Removed demands expense account in outward
              tedious do. Particular way thoroughly unaffected
              projection.Removed demands expense account in outward tedious do.
              Particular way thoroughly unaffected projection.
            </p>
          </div>
          <!-- all comment actions -->

          <section class="comment-action h-[35.69px] py-2">
            <ul class="w-full h-full flex items-center">
              <li class="like-comment flex justify-end w-max">
                <h1 class="like-name">Like</h1>
                <h1 class="comment-likes ml-1">(4)</h1>
              </li>
              <li
                class="replyw-[60.94px] flex items-center gap-x-[11.2px] ml-[11px]"
              >
                <div class="dot"></div>
                <span class="replay-text">
                  <h1>Reply</h1>
                </span>
              </li>
              <li class="replyw-max flex items-center gap-x-[11.2px] ml-[11px]">
                <div class="dot"></div>
                <span class="replay-text flex items-center gap-x-1">
                  <h1>View</h1>
                  <h1 class="reply-count">5</h1>
                  <h1>replies</h1>
                </span>
              </li>
            </ul>
          </section>

          <!-- all comment acvtions -->
          <!-- all reply content is here -->

          <div class="all-reply-info flex h-max w-full">
            <!-- profile reply -->
            <span class="comment-dp w-[35px] h-[35px] rounded-full">
              <img
                class="w-full h-[35px] rounded-full"
                src="{postDp}"
                alt="CP"
              />
            </span>

            <!-- profile reply -->
            <!-- all reply info -->
            <section
              class="replies-info font-sans text-light-100 ml-2 flex flex-col w-[240.64px]"
            >
              <div class="comment-said h-max w-full p-4">
                <!-- commenter name -->
                <header class="commenter-name flex justify-between h-[22.75px]">
                  <h1 class="name font-semibold">Frances Guerrero</h1>
                  <h1 class="ago">5hr</h1>
                </header>
                <p class="comment-real">
                  Removed demands expense account in outward tedious do.
                  Particular way thoroughly unaffected projection.Removed
                  demands expense account in outward tedious do. Particular way
                  thoroughly unaffected projection Removed demands expense
                  account in outward tedious do. Particular way thoroughly
                  unaffected projection.Removed demands expense account in
                  outward tedious do. Particular way thoroughly unaffected
                  projection.
                </p>
              </div>
              <!-- all reply actions starts                 -->
              <ul class="w-full h-full flex items-center py-2">
                <li class="like-comment flex justify-end w-max">
                  <h1 class="like-name">Like</h1>
                  <h1 class="comment-likes ml-1">(4)</h1>
                </li>
                <li
                  class="replyw-[60.94px] flex items-center gap-x-[11.2px] ml-[11px]"
                >
                  <div class="dot"></div>
                  <span class="replay-text">
                    <h1>Reply</h1>
                  </span>
                </li>
              </ul>

              <!-- all reply actions finished -->
            </section>
            <!-- all reply info finished -->
          </div>

          <!-- all reply content finished -->
        </section>
        <!-- all comment contents finished -->
      </div>
    </section>
    <!-- comment view finished -->
  </div>
</section>
