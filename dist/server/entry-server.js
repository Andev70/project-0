import returnTrue from "returner-pro-dep";
function noop() {
}
function is_promise(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && typeof /** @type {any} */
  value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
const LOCATION = {};
const ROUTER = {};
const HISTORY = {};
const PARAM = /^:(.+)/;
const SEGMENT_POINTS = 4;
const STATIC_POINTS = 3;
const DYNAMIC_POINTS = 2;
const SPLAT_PENALTY = 1;
const ROOT_POINTS = 1;
const segmentize = (uri) => uri.replace(/(^\/+|\/+$)/g, "").split("/");
const stripSlashes = (string) => string.replace(/(^\/+|\/+$)/g, "");
const rankRoute = (route, index) => {
  const score = route.default ? 0 : segmentize(route.path).reduce((score2, segment) => {
    score2 += SEGMENT_POINTS;
    if (segment === "") {
      score2 += ROOT_POINTS;
    } else if (PARAM.test(segment)) {
      score2 += DYNAMIC_POINTS;
    } else if (segment[0] === "*") {
      score2 -= SEGMENT_POINTS + SPLAT_PENALTY;
    } else {
      score2 += STATIC_POINTS;
    }
    return score2;
  }, 0);
  return { route, score, index };
};
const rankRoutes = (routes) => routes.map(rankRoute).sort(
  (a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
);
const pick = (routes, uri) => {
  let match;
  let default_;
  const [uriPathname] = uri.split("?");
  const uriSegments = segmentize(uriPathname);
  const isRootUri = uriSegments[0] === "";
  const ranked = rankRoutes(routes);
  for (let i = 0, l = ranked.length; i < l; i++) {
    const route = ranked[i].route;
    let missed = false;
    if (route.default) {
      default_ = {
        route,
        params: {},
        uri
      };
      continue;
    }
    const routeSegments = segmentize(route.path);
    const params = {};
    const max = Math.max(uriSegments.length, routeSegments.length);
    let index = 0;
    for (; index < max; index++) {
      const routeSegment = routeSegments[index];
      const uriSegment = uriSegments[index];
      if (routeSegment && routeSegment[0] === "*") {
        const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);
        params[splatName] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }
      if (typeof uriSegment === "undefined") {
        missed = true;
        break;
      }
      const dynamicMatch = PARAM.exec(routeSegment);
      if (dynamicMatch && !isRootUri) {
        const value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        missed = true;
        break;
      }
    }
    if (!missed) {
      match = {
        route,
        params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }
  return match || default_ || null;
};
const combinePaths = (basepath, path) => `${stripSlashes(
  path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
)}/`;
const canUseDOM = () => typeof window !== "undefined" && "document" in window && "location" in window;
const Route = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeRoute, $$unsubscribe_activeRoute;
  let { path = "" } = $$props;
  let { component = null } = $$props;
  let routeParams = {};
  let routeProps = {};
  const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
  $$unsubscribe_activeRoute = subscribe(activeRoute, (value) => $activeRoute = value);
  const route = {
    path,
    // If no path prop is given, this Route will act as the default Route
    // that is rendered if no other Route in the Router is a match.
    default: path === ""
  };
  registerRoute(route);
  onDestroy(() => {
    unregisterRoute(route);
  });
  if ($$props.path === void 0 && $$bindings.path && path !== void 0)
    $$bindings.path(path);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  {
    if ($activeRoute && $activeRoute.route === route) {
      routeParams = $activeRoute.params;
      const { component: c, path: path2, ...rest } = $$props;
      routeProps = rest;
      if (c) {
        if (c.toString().startsWith("class "))
          component = c;
        else
          component = c();
      }
      canUseDOM() && (window == null ? void 0 : window.scrollTo(0, 0));
    }
  }
  $$unsubscribe_activeRoute();
  return `${$activeRoute && $activeRoute.route === route ? `${component ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(resolvedComponent) {
      return ` ${validate_component((resolvedComponent == null ? void 0 : resolvedComponent.default) || resolvedComponent || missing_component, "svelte:component").$$render($$result, Object.assign({}, routeParams, routeProps), {}, {})} `;
    }(__value);
  }(component)}` : `${slots.default ? slots.default({ params: routeParams }) : ``}`}` : ``}`;
});
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
const getLocation = (source) => {
  return {
    ...source.location,
    state: source.history.state,
    key: source.history.state && source.history.state.key || "initial"
  };
};
const createHistory = (source) => {
  const listeners = [];
  let location = getLocation(source);
  return {
    get location() {
      return location;
    },
    listen(listener) {
      listeners.push(listener);
      const popstateListener = () => {
        location = getLocation(source);
        listener({ location, action: "POP" });
      };
      source.addEventListener("popstate", popstateListener);
      return () => {
        source.removeEventListener("popstate", popstateListener);
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    },
    navigate(to, { state, replace = false } = {}) {
      state = { ...state, key: Date.now() + "" };
      try {
        if (replace)
          source.history.replaceState(state, "", to);
        else
          source.history.pushState(state, "", to);
      } catch (e) {
        source.location[replace ? "replace" : "assign"](to);
      }
      location = getLocation(source);
      listeners.forEach(
        (listener) => listener({ location, action: "PUSH" })
      );
      document.activeElement.blur();
    }
  };
};
const createMemorySource = (initialPathname = "/") => {
  let index = 0;
  const stack = [{ pathname: initialPathname, search: "" }];
  const states = [];
  return {
    get location() {
      return stack[index];
    },
    addEventListener(name, fn) {
    },
    removeEventListener(name, fn) {
    },
    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        index++;
        stack.push({ pathname, search });
        states.push(state);
      },
      replaceState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        stack[index] = { pathname, search };
        states[index] = state;
      }
    }
  };
};
const globalHistory = createHistory(
  canUseDOM() ? window : createMemorySource()
);
const Router = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  let $routes, $$unsubscribe_routes;
  let $base, $$unsubscribe_base;
  let $activeRoute, $$unsubscribe_activeRoute;
  let { basepath = "/" } = $$props;
  let { url = null } = $$props;
  let { history = globalHistory } = $$props;
  setContext(HISTORY, history);
  const locationContext = getContext(LOCATION);
  const routerContext = getContext(ROUTER);
  const routes = writable([]);
  $$unsubscribe_routes = subscribe(routes, (value) => $routes = value);
  const activeRoute = writable(null);
  $$unsubscribe_activeRoute = subscribe(activeRoute, (value) => $activeRoute = value);
  let hasActiveRoute = false;
  const location = locationContext || writable(url ? { pathname: url } : history.location);
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  const base = routerContext ? routerContext.routerBase : writable({ path: basepath, uri: basepath });
  $$unsubscribe_base = subscribe(base, (value) => $base = value);
  const routerBase = derived([base, activeRoute], ([base2, activeRoute2]) => {
    if (!activeRoute2)
      return base2;
    const { path: basepath2 } = base2;
    const { route, uri } = activeRoute2;
    const path = route.default ? basepath2 : route.path.replace(/\*.*$/, "");
    return { path, uri };
  });
  const registerRoute = (route) => {
    const { path: basepath2 } = $base;
    let { path } = route;
    route._path = path;
    route.path = combinePaths(basepath2, path);
    if (typeof window === "undefined") {
      if (hasActiveRoute)
        return;
      const matchingRoute = pick([route], $location.pathname);
      if (matchingRoute) {
        activeRoute.set(matchingRoute);
        hasActiveRoute = true;
      }
    } else {
      routes.update((rs) => [...rs, route]);
    }
  };
  const unregisterRoute = (route) => {
    routes.update((rs) => rs.filter((r) => r !== route));
  };
  if (!locationContext) {
    setContext(LOCATION, location);
  }
  setContext(ROUTER, {
    activeRoute,
    base,
    routerBase,
    registerRoute,
    unregisterRoute
  });
  if ($$props.basepath === void 0 && $$bindings.basepath && basepath !== void 0)
    $$bindings.basepath(basepath);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0)
    $$bindings.history(history);
  {
    {
      const { path: basepath2 } = $base;
      routes.update((rs) => rs.map((r) => Object.assign(r, { path: combinePaths(basepath2, r._path) })));
    }
  }
  {
    {
      const bestMatch = pick($routes, $location.pathname);
      activeRoute.set(bestMatch);
    }
  }
  $$unsubscribe_location();
  $$unsubscribe_routes();
  $$unsubscribe_base();
  $$unsubscribe_activeRoute();
  return `${slots.default ? slots.default({
    route: $activeRoute && $activeRoute.uri,
    location: $location
  }) : ``}`;
});
const Welcome = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  console.log(returnTrue());
  return `<section class="bg-gray-50 h-screen dark:bg-gray-900" data-svelte-h="svelte-1l924mp"><div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"><a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"><img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
      Flowbite</a> <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"><div class="p-6 space-y-4 md:space-y-6 sm:p-8"><h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1> <form class="space-y-4 md:space-y-6" action="#"><div><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></div> <div><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></div> <div class="flex items-center justify-between"><div class="flex items-start"><div class="flex items-center h-5"><input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></div> <div class="ml-3 text-sm"><label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label></div></div> <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a></div> <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-300 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button> <p class="text-sm font-light text-gray-500 dark:text-gray-400">Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a></p></form></div></div></div></section>`;
});
const postDp = "/assets/04-039ff470.jpg";
const sharedImg = "/assets/01-dd2e9e9d.jpg";
const like = "/assets/heart-solid-19f65810.svg";
const comment = "/assets/comment-solid-e565eecc.svg";
const share = "/assets/share-solid-e84c74c2.svg";
const posts_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".dot.svelte-fmxboq{background-color:#676a79;width:4px;height:4px;border-radius:50%}.comment-said.svelte-fmxboq{background-color:#eef0f2;border-radius:6.4px}.comment-view.svelte-fmxboq{font-size:13.125px}.name.svelte-fmxboq{font-size:15px;color:rgb(20, 25, 30)}.comment-input.svelte-fmxboq{border-radius:0.4rem;border:1px solid rgb(225, 228, 230)}.count-like.svelte-fmxboq{font-size:13.12px;font-family:sans-serif;column-gap:4px;margin-left:4px}.post-img.svelte-fmxboq{border-radius:5.4px}.caption.svelte-fmxboq{font-size:15px}.time.svelte-fmxboq,.user-bio-short.svelte-fmxboq{font-size:13.125px}.name-poster.svelte-fmxboq{color:#14191e;font-family:sans-serif;font-size:15px;font-weight:600}.single-post-wrapper.svelte-fmxboq{border-radius:6.4px;border:0.727273px solid rgba(0, 0, 0, 0.09)}",
  map: null
};
const Posts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<section class="all-wrapper-post flex flex-col items-center w-full h-max pt-4 pb-3 gap-y-4"> <div class="single-post-wrapper h-max w-[369.09px] bg-white svelte-fmxboq"> <header class="header-post pl-[20px] pr-[20px] pt-[20px] w-full h-[68px]"><div class="header-contentw-full h-full justify-between items-center flex"> <section class="profile-post h-full w-[234.45px] flex items-center"> <span class="flex justify-center items-center overflow-hidden profile-img w-[58px] pr-2"><img${add_attribute("src", postDp, 0)} alt="DP" class="profile-image w-12 h-12 rounded-full"></span>   <span class="profile-info-wrap w-[178.45px] h-[39.38px] flex flex-col" data-svelte-h="svelte-1mifbsv"><div class="name-time flex items-center"><h1 class="name-poster svelte-fmxboq">Lori Ferguson</h1> <span class="time w-[47.15px] h-[19.69px] text-light-100 flex font-normal items-center font-sans svelte-fmxboq"><h1 class="ml-2 font-bold dot svelte-fmxboq"></h1> <h1 class="ml-2">2hr</h1></span></div> <h1 class="font-sans user-bio-short text-light-100 svelte-fmxboq">Web Developer at Webestica</h1></span></section>  <div class="dropdown-parent w-[32.46px] h-[32.26px]" data-svelte-h="svelte-1nwwvkx"><button class="py-1 px-2 dropdown-action-post"><i class="w-full h-full"><svg aria-label="More Options" class="_ab6-" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg></i></button></div> </div></header>   <div class="caption-parent w-full px-[20px] pt-[20px] pb-4" data-svelte-h="svelte-h94npo"><p class="caption text-light-100 font-sans svelte-fmxboq">I&#39;m thrilled to share that I&#39;ve completed a graduate certificate course
        in project management with the president&#39;s honor roll.</p></div>   <section class="overflow-hidden post-image-parent px-[20px]"><img${add_attribute("src", sharedImg, 0)} class="post-img svelte-fmxboq" alt="SHARED IMAGE"></section>   <section class="reaction-parent w-full h-[59.87px] py-4 px-[20px]"><ul class="react-opts w-full h-full gap-x-[11.2px] items-center flex flex-wrap"> <li class="text-light-100 py-1 flex like-parent items-center w-max h-full"><i class="like-svg"></i> <img${add_attribute("src", like, 0)} alt="LK" class="like w-[13.12px] h-[13.12px]"> <span class="count-like flex w-max h-max svelte-fmxboq" data-svelte-h="svelte-4c2e5d"><h1 class="like-text">Liked</h1> <h1 class="like-count">(56)</h1></span></li>   <li class="text-light-100 py-1 flex like-parent items-center w-max h-full"><i class="like-svg"></i> <img${add_attribute("src", comment, 0)} alt="LK" class="like w-[13.12px] h-[13.12px]"> <span class="count-like flex w-max h-max svelte-fmxboq" data-svelte-h="svelte-170lgmc"><h1 class="like-text">Comments</h1> <h1 class="like-count">(56)</h1></span></li>   <li class="text-light-100 py-1 flex like-parent items-center w-max h-full"><i class="like-svg"></i> <img${add_attribute("src", share, 0)} alt="LK" class="like w-[13.12px] h-[13.12px]"> <span class="count-like flex w-max h-max svelte-fmxboq" data-svelte-h="svelte-eqt70j"><h1 class="like-text">Share</h1> <h1 class="like-count">(56)</h1></span></li> </ul></section>   <section class="comment-area w-full h-[56.5px] flex pb-4 px-[20px]"> <span class="comment-profile w-[35px] h-[35px] rounded-full"><img class="w-full h-full rounded-full"${add_attribute("src", postDp, 0)} alt="CD"></span>   <input type="text" placeholder="Add a comment..." name="comment" class="comment-input w-[284.64px] h-[40.5px]py-2 pr-6 pl-4 ml-2 svelte-fmxboq"> </section>   <section class="comment-view text-light-100 font-sans w-full h-max px-[20px] svelte-fmxboq"><div class="single-comment-area flex"> <span class="comment-dp w-[35px] h-[35px] rounded-full"><img class="w-full h-[35px] rounded-full"${add_attribute("src", postDp, 0)} alt="CP"></span>   <section class="all-comment-info ml-2 w-[284.64px] flex flex-col"><div class="comment-said h-max w-full p-4 svelte-fmxboq" data-svelte-h="svelte-biok3j"> <header class="commenter-name flex justify-between h-[22.75px]"><h1 class="name font-semibold svelte-fmxboq">Frances Guerrero</h1> <h1 class="ago">5hr</h1></header> <p class="comment-real">Removed demands expense account in outward tedious do. Particular
              way thoroughly unaffected projection.Removed demands expense
              account in outward tedious do. Particular way thoroughly
              unaffected projection Removed demands expense account in outward
              tedious do. Particular way thoroughly unaffected
              projection.Removed demands expense account in outward tedious do.
              Particular way thoroughly unaffected projection.</p></div>  <section class="comment-action h-[35.69px] py-2" data-svelte-h="svelte-orxryl"><ul class="w-full h-full flex items-center"><li class="like-comment flex justify-end w-max"><h1 class="like-name">Like</h1> <h1 class="comment-likes ml-1">(4)</h1></li> <li class="replyw-[60.94px] flex items-center gap-x-[11.2px] ml-[11px]"><div class="dot svelte-fmxboq"></div> <span class="replay-text"><h1>Reply</h1></span></li> <li class="replyw-max flex items-center gap-x-[11.2px] ml-[11px]"><div class="dot svelte-fmxboq"></div> <span class="replay-text flex items-center gap-x-1"><h1>View</h1> <h1 class="reply-count">5</h1> <h1>replies</h1></span></li></ul></section>   <div class="all-reply-info flex h-max w-full"> <span class="comment-dp w-[35px] h-[35px] rounded-full"><img class="w-full h-[35px] rounded-full"${add_attribute("src", postDp, 0)} alt="CP"></span>   <section class="replies-info font-sans text-light-100 ml-2 flex flex-col w-[240.64px]" data-svelte-h="svelte-x5y9h6"><div class="comment-said h-max w-full p-4 svelte-fmxboq"> <header class="commenter-name flex justify-between h-[22.75px]"><h1 class="name font-semibold svelte-fmxboq">Frances Guerrero</h1> <h1 class="ago">5hr</h1></header> <p class="comment-real">Removed demands expense account in outward tedious do.
                  Particular way thoroughly unaffected projection.Removed
                  demands expense account in outward tedious do. Particular way
                  thoroughly unaffected projection Removed demands expense
                  account in outward tedious do. Particular way thoroughly
                  unaffected projection.Removed demands expense account in
                  outward tedious do. Particular way thoroughly unaffected
                  projection.</p></div>  <ul class="w-full h-full flex items-center py-2"><li class="like-comment flex justify-end w-max"><h1 class="like-name">Like</h1> <h1 class="comment-likes ml-1">(4)</h1></li> <li class="replyw-[60.94px] flex items-center gap-x-[11.2px] ml-[11px]"><div class="dot svelte-fmxboq"></div> <span class="replay-text"><h1>Reply</h1></span></li></ul> </section> </div> </section> </div></section> </div></section>`;
});
const navbar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".hamburger.svelte-jc2ny7{font-size:20px}.all-nav-btns.svelte-jc2ny7{column-gap:8px}.logo-parent.svelte-jc2ny7{font-size:24px}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<nav class="w-full h-[56px] bg-white px-3 flex justify-between items-center" data-svelte-h="svelte-5y8plh"> <span class="logo-parent w-10 h-10 rounded-[6.4px] svelte-jc2ny7"><button class="logo-button w-full h-full rounded-[6.4px] flex justify-center items-center"><i class="bi bi-megaphone-fill text-blue-500 "></i></button></span>   <div class="all-nav-btns h-full flex items-center w-max svelte-jc2ny7"> <button class="flex justify-center items-center w-10 h-10 rounded-[6.4px] bg-[#eef0f2]"><i class="bi bi-messenger text-gray-700"></i></button>  <button class="flex justify-center items-center w-10 h-10 rounded-[6.4px] bg-[#eef0f2]"><i class="bi bi-bell-fill text-gray-700"></i></button>  <button class="flex justify-center items-center w-10 h-10 rounded-[6.4px] bg-[#eef0f2]"><i class="bi bi-list hamburger text-gray-700 svelte-jc2ny7"></i></button></div> </nav>`;
});
const avatar = "/assets/02-2d41ba9f.jpg";
const postArea_svelte_svelte_type_style_lang = "";
const css = {
  code: ".my-profile.svelte-oex23r{font-size:15px}",
  map: null
};
const Post_area = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="pt-[16px] bg-[#eef0f2] post-greate-parent w-full h-max flex justify-center"><div class="profile-parent-all px-4 w-[369.09px] flex gap-x-3 items-center"><div class="profile-details w-[48px] h-[48px] rounded-full "><button class="h-full w-full rounded-full outline-none"><img${add_attribute("src", avatar, 0)} class="w-full h-full rounded-full" alt="PF"></button></div>  <button class="got-pf h-max" data-svelte-h="svelte-1udt6fu"><h1 class="my-profile font-semibold font-sans text-[#14191e] svelte-oex23r">My profile</h1></button></div></section>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}   <section class="wrapper overflow-hidden bg-background-100 w-screen h-screen"><div class="w-full h-full overflow-scroll"> ${validate_component(Post_area, "Postpublish").$$render($$result, {}, {}, {})}  ${validate_component(Posts, "Post").$$render($$result, {}, {}, {})} ${validate_component(Posts, "Post").$$render($$result, {}, {}, {})} ${validate_component(Posts, "Post").$$render($$result, {}, {}, {})}</div></section> `;
});
let error = "false";
const Signup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="bg-gray-50 dark:bg-gray-900"><div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"><a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-1pjlj3i"><img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
      Flowbite</a> <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"><div class="p-6 space-y-4 md:space-y-6 sm:p-8"><h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" data-svelte-h="svelte-b9rvfq">Create and account</h1> <form class="space-y-4 md:space-y-6" action="#"><div data-svelte-h="svelte-1kgac7z"><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></div> <div><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-12d084n">Password</label> <input type="password" name="password" id="password" placeholder="••••••••"${add_attribute("class", `${error} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`, 0)} required=""></div> <div data-svelte-h="svelte-10xhbxg"><label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label> <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></div> <div class="flex items-start" data-svelte-h="svelte-5lix0l"><div class="flex items-center h-5"><input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></div> <div class="ml-3 text-sm"><label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label></div></div> <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" data-svelte-h="svelte-1rezrfw">Create an account</button> <p class="text-sm font-light text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1oeom7">Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></p></form></div></div></div></section>`;
});
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Router, "Router").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Route, "Route").$$render($$result, { path: "/signup" }, {}, {
        default: () => {
          return `${validate_component(Signup, "Signup").$$render($$result, {}, {}, {})}`;
        }
      })} ${validate_component(Route, "Route").$$render($$result, { path: "/home" }, {}, {
        default: () => {
          return `${validate_component(Home, "Home").$$render($$result, {}, {}, {})}`;
        }
      })} ${validate_component(Route, "Route").$$render($$result, { path: "/" }, {}, {
        default: () => {
          return `${validate_component(Welcome, "WelcomeInstagram").$$render($$result, {}, {}, {})}`;
        }
      })} ${validate_component(Route, "Route").$$render($$result, { path: "*" }, {}, {
        default: () => {
          return `error`;
        }
      })}`;
    }
  })}`;
});
function render() {
  return App.render();
}
export {
  render
};
