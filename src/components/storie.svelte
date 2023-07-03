<script>
  import noProfile from "../assets/no-profile-pic.jpg";

import sampleStoryProfile from "../assets/cld-sample-3 (1).jpg";
</script>
  <style>
  .stories-parent {
  background: #fafafa;
}

.text-story {
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.actual-sories {
  width: calc(764.73pix - 88px);
}

.story-user-name {
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serifi;
}

</style>
<section class="stories-parent pl-[8px] pr-[8px] border-b border-gray-300 flex w-full h-[95px] ">
      <div class="add-stories w-[80px] h-full flex justify-center items-center">
        <div class="w-[64px] pt-[5px] h-[84px] flex justify-between flex-col items-center ">
          <span class="for-add-input relative flex justify-center items-center w-[56px] h-[56px] rounded-full ">
            <input
              type="file"
              class="story-input w-full h-full rounded-full opacity-0"
              name="add-story"
              id="story-add"
            />
            <img
              src={noProfile}
              alt="profile"
              class="user-img w-full h-full absolute rounded-full pointer-events-none"
            />
            <div class="plus-icon-story bg-white w-[17.45px] h-[17.45px] flex justify-center items-center rounded-full absolute right-0 bottom-0">
              <svg
                aria-label="Plus icon"
                class="blue-plus-svg"
                color="rgb(0, 149, 246)"
                fill="rgb(0, 149, 246)"
                height="16"
                role="img"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Plus icon</title>
                <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5 12.5h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 1 1 0-2h4v-4a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2Z"></path>
              </svg>
            </div>
          </span>
          <span class="add-text">
            <h1 class="text-story">Your story</h1>
          </span>
        </div>
      </div>
    
      <section class="actual-sories overflow-scroll h-full">
        <div class="story-wrapper h-full  flex items-center">
      
          <article class="story-showcase  w-[80px] h-full flex justify-center items-center">
            <div class="w-[64px] h-[84px] pt-[1px] flex flex-col justify-between items-center">
              <span class="story-user-image w-[62px] h-[62px] border-2 border-gray-300 rounded-full bg-white flex justify-center items-center">
                <img
                  src={sampleStoryProfile}
                  alt="profile"
                  class="story-profile w-[56px] h-[56px] rounded-full"
                />
              </span>

              <span class="user-name-area">
                <h1 class="story-user-name">cristiano</h1>
              </span>
            </div>
          </article>
        </div>
      </section>
    </section>
