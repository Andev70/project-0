<script>
  import facebookLogo from "../assets/square-facebook.svg";
import metaLogo from "../assets/meta-logo.svg";
  import {isLoginForm} from "../store/login-form.js"
  let loginForm;
  isLoginForm.subscribe(value=>loginForm=value)
</script>
  <style>
  .lang-name {
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgb(115, 115, 115);
}

.drop-svg-wel {
  transform: rotate(180deg);
}

.logo-sit {
  background-image: url("../assets/insta_text_logo.png");
  background-size: 176px 181px;
  background-position-x: 0px;
  background-position-y: 0px;
  background-repeat: no-repeat;
  display: inline-block;
}

.welcome-text {
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  line-height: 27px;
}

.photo-text {
  color: #ff0169;
}

.vid-text {
  color: #ff0169;
}

.getapp-btn {
  border-radius: 8px;
  background-color: #1877f2;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  color: white;
}

.bring-login {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  color: #0095f6;
}

.else-text {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  color: #737373;
}
.to-signup {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  color: #0095f6;
}

.list-items {
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  color: #737373;
}

.log-facebook-btn {
  border-radius: 8px;
  background-color: #1877f2;
}

.text-log-face {
  font-size: 14px;
  font-weight: 600;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.separator-area {
  column-gap: 18px;
}
.or-text-sep {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  color: #737373;
}

.email-input {
  border: 0.727273px solid rgb(219, 219, 219);
  border-radius: 3px;
  background-color: #fafafa;
}

.email-input::placeholder {
  font-size: 12px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #737373;
}

.password-input {
  border: 0.727273px solid rgb(219, 219, 219);
  border-radius: 3px;
  background-color: #fafafa;
}

.password-input::placeholder {
  font-size: 12px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #737373;
}

.forgot-text {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  color: #0095f6;
}

.login-btn {
  background-color: #0095f6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}



.not-user{
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #737373;
}

.signup-link{

  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  color: #0095f6;
}

</style>
<main class="parent-welcome w-screen h-screen">
      <div
        class="all-welcomeholder w-full h-full flex justify-center overflow-scrollr"
      >
        <section class="to-scroll h-max w-max flex flex-col">
          <!-- welcome nav for welcome page -->
          <nav class="welcome-nav w-screen h-10 px-4 pt-4 pb-[6px]">
            <div
              class="lang-wrapper w-full h-full flex justify-center items-center"
            >
              <div class="lang-par flex items-center gap-x-1">
                <h1 class="lang-name">English</h1>
                <span class="drop-arrow-wel">
                  <svg
                    aria-label="Back"
                    class="drop-svg-wel"
                    color="rgb(115, 115, 115)"
                    fill="rgb(115, 115, 115)"
                    height="12"
                    role="img"
                    viewBox="0 0 24 24"
                    width="12"
                  >
                    <title>Back</title>
                    <path
                      d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </nav>
          <!-- welcome nav for welcome page -->
          <!-- welcome main area -->

   

          <section
            class="main-welcome w-screen h-max flex justify-center pt-10"
          >
            <div class="all-wel-wrap w-max h-max mt-3 pb-[60px]">
              <div
                class="border-for w-max h-max border py-[10px] border-gray-300 flex flex-col items-center"
              >
                <section class="insta-logo-img w-max h-[103.55] pt-9 pb-3">
                  <span class="logo-sit w-[175px] h-[51px]"></span>
                </section>
                <div class="main-login-and-welcome w-full h-full">
                  
{#if !loginForm}
   
                  <!-- welcome contents goes here -->
                  <div class="wel-wrap w-full h-full pt-5">
                    <section
                      class="wel-contents-parent w-full text-center h-full flex flex-col items-center"
                    >
                      <div
                        class="welcome-text-area w-[348.55px] h-[61px] px-7 pb-4 text-center"
                      >
                        <h1 class="welcome-text">
                          Sign up to see
                          <span class="photo-text">photos</span> and{" "}
                          <span class="vid-text">videos</span> from your
                          friends.
                        </h1>
                      </div>
                      <div class="get-app w-[348.55px] h-[60px] pt-4 px-10">
                        <span
                          class="getapp-btn-area w-full h-fullflex justify-center items-center"
                        >
                          <button
                            class="getapp-btn w-full h-full py-[13px] px-5"
                          >
                            Get Instagram Lite
                          </button>
                        </span>
                      </div>

                      <div
                        class="signin-signup-btns w-[105.24px] h-[38px] pt-5 flex gap-x-1"
                      >
                        <button on:click={(e)=>{
                          e.preventDefault()
                          isLoginForm.update(value=>value=true)

                        }} class="bring-login">Login</button>
                        <span class="else-text"> or</span>
                        <link to="/accounts/signup" />
                        <button class="to-signup">sign up</button>
                      </div>
                    </section>
                  </div>
                  <!-- welcome contents goes here -->
                  {:else}
   <section class="login-parent-main pb-[10px] w-[317.09px] h-max pt-6">
      <div class="w-full login-wrapper h-full ">
        

        <div class="facebook-login-area w-[317.09px] px-10 py-2 h-[50.55px]">
          <button class="log-facebook-btn w-full h-full py-[7px] px-4 flex justify-center items-center gap-x-2">
            <i class="facebook-icon w-[17px] h-[17px]">
              <img
                src={facebookLogo}
                alt="facebook logo"
                class="icon-fa-squar w-full h-full"
              />
            </i>
            <h1 class="text-log-face">Continue with Facebook</h1>
          </button>
        </div>
        
        <div class="separator-area w-[317.09px] h-[50.99px] pt-[14px] pb-[22px] px-10 flex justify-center items-center ">
          <span class="line-one h-[1px] w-[91.91px] bg-gray-300"></span>
          <span class="or-text-sep">OR</span>
          <span class="line-one h-[1px] w-[91.91px] bg-gray-300"></span>
        </div>
        

        <div class="email-input-area w-[317.09px] h-max pb-[6px] px-10">
          <input
            type="email"
            name="email"
            class="email-input w-full h-[37px] outline-none pl-2"
            id="main"
            placeholder="Phone number, username, or email"
          />
        </div>

        

        <div class="password-input-area w-[317.09px] h-max pb-[6px] px-10">
          <input
            type="password"
            name="password"
            class="password-input w-full h-[37px] outline-none pl-2"
            id="passkey"
            placeholder="Password"
          />
        </div>

      

        <div class="forgot-password-area w-[317.09px] h-[43px]  pb-[8px] px-10">
          <span class="for-forgot-text  w-full h-full py-3 flex flex-col items-end justify-center">
            <h1 class="forgot-text">Forgot password?</h1>
          </span>
        </div>
      

        <section class="login-btn-area w-[317.09px] h-12 px-10 py-2">
          <button class="login-btn w-full h-full rounded-lg py-[7px] px-4 flex  justify-center items-center">
            Log in
          </button>
        </section>
        <div class="signup-reminder-area w-[317.09px] h-[55px] pt-4">
          <div class="w-full h-full flex justify-center items-center gap-x-1">
            <h1 class="not-user">Dont't have an account?</h1>
            <h1 class="signup-link">Sign up</h1>
          </div>
        </div>
      </div>
    </section>
                  {/if}        
                </div>
              </div>
            </div>
          </section>

          <!--welcome main area is ending here-->
          <!-- meta logo welcome is starting -->
          <section
            class="meta-logo-parent w-screen h-[82px] pt-8 pb-6 flex justify-center items-center"
          >
            <img
              src={metaLogo}
              alt="meta logo"
              class="meta-logo-img w-[52px] h-[26.57px]"
            />
          </section>
          <!--meta logo welcome is finished-->
          <!-- welcome footer starting here -->
          <section class="footer-parent w-screen h-[82px] px-4 pb-3">
            <div class="fotter-links h-full w-full pt-6">
              <ul
                class="list w-full h-full flex justify-center items-center flex-wrap gap-x-3"
              >
                <li class="list-items">Meta</li>
                <li class="list-items">About</li>
                <li class="list-items">Blog</li>
                <li class="list-items">Jobs</li>
                <li class="list-items">Help</li>
                <li class="list-items">Api</li>
                <li class="list-items">Privacy</li>
                <li class="list-items">Terms</li>
                <li class="list-items">Top accounts</li>
                <li class="list-items">Locations</li>
                <li class="list-items">Instagram Lite</li>
                <li class="list-items">Contact Uploading & Non-Users</li>
                <li class="list-items">Meta Verified</li>
              </ul>
            </div>
          </section>
          <!-- meta logo welcome is ending here -->
        </section>
      </div>
    </main>
