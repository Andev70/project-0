function noop() {
}
function is_promise(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && typeof value.then === "function";
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
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
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
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
const _boolean_attributes = [
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
const boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name2) => {
    if (invalid_attribute_name_character.test(name2))
      return;
    const value = attributes[name2];
    if (value === true)
      str += " " + name2;
    else if (boolean_attributes.has(name2.toLowerCase())) {
      if (value)
        str += " " + name2;
    } else if (value != null) {
      str += ` ${name2}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name2 = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name2)
      continue;
    style_object[name2] = value;
  }
  for (const name2 in style_directive) {
    const value = style_directive[name2];
    if (value) {
      style_object[name2] = value;
    } else {
      delete style_object[name2];
    }
  }
  return style_object;
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
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name2) {
  if (!component || !component.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(`<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`);
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
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key) => style_object[key]).map((key) => `${key}: ${escape_attribute_value(style_object[key])};`).join(" ");
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
const addQuery = (pathname, query) => pathname + (query ? `?${query}` : "");
const resolve = (to, base) => {
  if (to.startsWith("/"))
    return to;
  const [toPathname, toQuery] = to.split("?");
  const [basePathname] = base.split("?");
  const toSegments = segmentize(toPathname);
  const baseSegments = segmentize(basePathname);
  if (toSegments[0] === "")
    return addQuery(basePathname, toQuery);
  if (!toSegments[0].startsWith(".")) {
    const pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }
  const allSegments = baseSegments.concat(toSegments);
  const segments = [];
  allSegments.forEach((segment) => {
    if (segment === "..")
      segments.pop();
    else if (segment !== ".")
      segments.push(segment);
  });
  return addQuery("/" + segments.join("/"), toQuery);
};
const combinePaths = (basepath, path) => `${stripSlashes(
  path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
)}/`;
const canUseDOM = () => typeof window !== "undefined" && "document" in window && "location" in window;
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaCurrent;
  let $$restProps = compute_rest_props($$props, ["to", "replace", "state", "getProps"]);
  let $location, $$unsubscribe_location;
  let $base, $$unsubscribe_base;
  let { to = "#" } = $$props;
  let { replace = false } = $$props;
  let { state = {} } = $$props;
  let { getProps = () => ({}) } = $$props;
  const location = getContext(LOCATION);
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  const { base } = getContext(ROUTER);
  $$unsubscribe_base = subscribe(base, (value) => $base = value);
  getContext(HISTORY);
  createEventDispatcher();
  let href, isPartiallyCurrent, isCurrent, props;
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  if ($$props.replace === void 0 && $$bindings.replace && replace !== void 0)
    $$bindings.replace(replace);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.getProps === void 0 && $$bindings.getProps && getProps !== void 0)
    $$bindings.getProps(getProps);
  href = to === "/" ? $base.uri : resolve(to, $base.uri);
  isPartiallyCurrent = $location.pathname.startsWith(href);
  isCurrent = href === $location.pathname;
  ariaCurrent = isCurrent ? "page" : void 0;
  props = getProps({
    location: $location,
    href,
    isPartiallyCurrent,
    isCurrent,
    existingProps: $$restProps
  });
  $$unsubscribe_location();
  $$unsubscribe_base();
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        "aria-current": escape_attribute_value(ariaCurrent)
      },
      escape_object(props),
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({ active: !!ariaCurrent }) : ``}</a>`;
});
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
      return `
            ${validate_component((resolvedComponent == null ? void 0 : resolvedComponent.default) || resolvedComponent || missing_component, "svelte:component").$$render($$result, Object.assign({}, routeParams, routeProps), {}, {})}
        `;
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
      stop = start(set) || noop;
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
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (started) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
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
    addEventListener(name2, fn) {
    },
    removeEventListener(name2, fn) {
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
const { navigate } = globalHistory;
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
const todoTitle = writable(null);
const todoStatus = writable(null);
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="bg-white pr-4 shadow-lg h-14"><div class="container mx-auto flex justify-end items-center h-full"><button class="px-4 py-2 bg-blue-500 text-white rounded">Logout </button></div></nav>`;
});
const todos = writable([]);
const Alltodo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allTodos;
  todoStatus.subscribe((value) => value);
  todoTitle.subscribe((value) => value);
  todos.subscribe((value) => allTodos = value);
  return `<main>${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  <div class="container mx-auto px-4 py-8"><div class="mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:w-[90%] sm:w-5/6"><div class="bg-gray-200 px-4 py-6"><h1 class="text-2xl text-gray-800 font-bold">Todo List</h1></div>
      <div class="bg-white px-4 py-6"><form class="mb-4"><div class="flex items-center border-b border-gray-200 pb-2"><input type="text" class="flex-grow outline-none px-2 py-1 text-gray-700" placeholder="Add a task...">
            <button type="submit" class="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">Add
            </button></div></form>
        <ul class="space-y-4">${each(allTodos, (todo2) => {
    return `<li class="todo-item flex items-center justify-between px-2 py-2 bg-white border-b border-gray-200"><div class="flex items-center"><input ${todo2.status ? "checked" : ""} type="checkbox" class="mr-2">

                <span class="text-gray-800">${escape(todo2.title)}</span></div>
              <div><button${add_attribute("value", todo2._id, 0)} class="text-gray-500 mr-2">Edit</button>
                <button${add_attribute("value", todo2._id, 0)} class="text-gray-500">Delete</button>
              </div></li>
            `;
  })}</ul></div></div></div></main>
;`;
});
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100"><div class="bg-white rounded-lg shadow-lg p-8 mx-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"><h1 class="text-4xl font-bold text-gray-800 mb-8">404 - Page not found</h1>
    <p class="text-gray-600 text-lg mb-8">We&#39;re sorry, but the page you&#39;re looking for cannot be found.
    </p>
    ${validate_component(Link, "Link").$$render(
    $$result,
    {
      to: "/",
      class: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    },
    {},
    {
      default: () => {
        return `Go back to homepage
    `;
      }
    }
  )}</div></div>`;
});
const email$1 = writable("");
const password$1 = writable("");
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  email$1.subscribe((value) => value);
  password$1.subscribe((value) => value);
  return `<div class=""><div class="p-8 lg:w-1/2 mx-auto"><div class="bg-white rounded-t-lg p-8"><p class="text-center text-sm text-gray-400 font-light">Sign in with</p>
      <div><div class="msgs relativepg flex items-center justify-center space-x-4 mt-3"><button class="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-6 h-6 mr-3"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            Github
          </button>
          <button class="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-3" viewBox="0 0 48 48"><path fill="#fbc02d" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#e53935" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1565c0" d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
            Google
          </button></div></div></div>
    <div class="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24"><p class="text-center text-sm text-gray-500 font-light">Or sign in with credentials
      </p>
      <form class="mt-6"><div class="relative"><input class="email appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="email" type="email" placeholder="Email">
          <div class="absolute left-0 inset-y-0 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg></div></div>
        <div class="relative mt-3"><input class="password appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="password" type="password" placeholder="Password">
          <div class="absolute left-0 inset-y-0 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"></path></svg></div></div>
        <div class="flex items-center justify-between relative"><div class="mt-4 flex items-center text-gray-500"><input type="checkbox" id="remember" name="remember" class="mr-3">

            <label for="remember">Remember me</label></div>
          <p style="bottom: 0;right:0;" class="absolute text-sm"><a class="text-blue-800" href="#">Forgot your password?</a></p></div>
        <div class="flex items-center justify-center mt-8"><button class="login text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Sign in
          </button></div></form></div></div>
  <div class="flex items-center justify-center"><span class="text-gray-600 text-sm">Don&#39;t have an account?</span>
    ${validate_component(Link, "Link").$$render(
    $$result,
    {
      to: "/signup",
      class: "text-sm ml-2 text-blue-600 font-bold hover:text-blue-800"
    },
    {},
    {
      default: () => {
        return `Signup`;
      }
    }
  )}</div></div>`;
});
const email = writable("");
const password = writable("");
const name = writable("");
const Signup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  email.subscribe((value) => value);
  password.subscribe((value) => value);
  name.subscribe((value) => value);
  return `<div class="pt-4 pb-4 flex items-center justify-center min-h-screen bg-gray-100"><div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"><h2 class="text-3xl text-center mb-8 font-bold">Sign Up</h2>
    <form><div class="mb-4"><label for="name" class="text-gray-700 font-semibold">Name </label>
        <input type="text" id="name" class="w-full border border-gray-300 rounded-md p-2 mt-1" placeholder="Enter your name"></div>
      <div class="mb-4"><label for="email" class="text-gray-700 font-semibold">Email </label>
        <input type="email" id="email" class="w-full border border-gray-300 rounded-md p-2 mt-1" placeholder="Enter your email"></div>
      <div class="mb-6"><label for="password" class="text-gray-700 font-semibold">Password
        </label>
        <input type="password" id="password" class="w-full border border-gray-300 rounded-md p-2 mt-1" placeholder="Enter your password"></div>

      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Sign Up
      </button></form></div></div>`;
});
const modal = writable(false);
const isLoading = writable(true);
const todo = writable({});
const editModal_svelte_svelte_type_style_lang = "";
const css = {
  code: ".edit-modal.svelte-1yihkfc{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}",
  map: null
};
const Edit_modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="bg-white mt-4 edit-modal rounded w-5/6 shadow-lg p-4 sm:w-96 md:w-2/3 lg:w-4/5 xl:w-3/4 2xl:w-1/2 svelte-1yihkfc"><h2 class="text-2xl font-semibold mb-4 text-center">Edit Todo</h2>
      <form><div class="mb-4"><label for="title" class="block font-medium text-lg mb-2">Title
          </label>
          <input type="text" id="title" class="w-full border rounded p-2" placeholder="Todo title"></div>
        <div class="mb-4"><label for="title" class="block font-medium text-lg mb-2">Status
          </label>
          <input type="text" id="status" class="w-full border rounded p-2" placeholder="eg: true or false"></div>
        <div class="mb-4"><label for="description" placeholder="Todo description" class="block font-medium text-lg mb-2">Description
          </label>
          <textarea id="description" class="w-full border rounded p-2"></textarea></div>
        <div class="flex justify-end"><button type="button" class="mr-2 bg-gray-200 px-4 py-2 rounded">Cancel
          </button>
          <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded">Save
          </button></div></form></div>`;
});
const Todo_detailes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isModal;
  let loading;
  isLoading.subscribe((value) => loading = value);
  modal.subscribe((value) => isModal = value);
  let singleTodo;
  todo.subscribe((value) => singleTodo = value);
  if (typeof localStorage !== void 0) {
    const token = localStorage.getItem("token");
    const todoId = localStorage.getItem("todoId");
    if (!token && !todoId) {
      navigate("/");
    }
    const getTodo = async () => {
      try {
        const res = await fetch(`/api/v1/${todoId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: token
          }
        });
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e.message);
      }
    };
    getTodo().then((res) => {
      if (res.status === "ok") {
        todo.update((value) => res.todo);
        isLoading.update((value) => false);
        console.log(singleTodo);
      }
    });
  }
  return `<div class="container mx-auto p-4 relative"><div class="bg-white rounded-lg shadow p-8"><div class="border-b mb-4 pb-3"><h2 class="text-2xl font-semibold text-gray-800">Todo Details</h2></div>
    <div class="mb-4"><label for="title" class="block font-medium text-gray-700 mb-1">Title
      </label>
      <input disabled${add_attribute("value", loading ? `loading...` : singleTodo.title, 0)} type="text" id="title" class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"></div>
    <div class="mb-4"><label for="description" class="block font-medium text-gray-700 mb-1">description
      </label>
      <textarea disabled id="description" class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800">${escape(loading ? `loading...` : singleTodo.description, false)}</textarea></div>
    <div class="mb-4"><label for="due-date" class="block font-medium text-gray-700 mb-1">Due Date
      </label>
      <input disabled${add_attribute("value", loading ? `loading...` : singleTodo.timestamp, 0)} type="text" id="due-date" class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"></div>
    <div class="mb-4"><label for="edit-status" class="block font-medium text-gray-700 mb-1">Edit status
      </label>
      <input${add_attribute("value", loading ? `loading...` : singleTodo.__v, 0)} disabled type="text" id="edit-status" class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"></div>
    <div class="mb-4"><label for="due-date" class="block font-medium text-gray-700 mb-1">Status
      </label>
      <input disabled${add_attribute("value", loading ? `loading...` : singleTodo.status, 0)} type="text" id="status" class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"></div>

    <div class="flex justify-end"><button type="button" class="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Edit
      </button></div></div>
  
  ${isModal ? `
    ${validate_component(Edit_modal, "Editmadal").$$render($$result, {}, {}, {})}` : ``}</div>`;
});
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Router, "Router").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Route, "Route").$$render($$result, { path: "/" }, {}, {
        default: () => {
          return `${validate_component(Login, "Login").$$render($$result, {}, {}, {})}`;
        }
      })}
  ${validate_component(Route, "Route").$$render($$result, { path: "/signup" }, {}, {
        default: () => {
          return `${validate_component(Signup, "Signup").$$render($$result, {}, {}, {})}`;
        }
      })}
  ${validate_component(Route, "Route").$$render($$result, { path: "/todos/:id" }, {}, {
        default: () => {
          return `${validate_component(Alltodo, "TodoList").$$render($$result, {}, {}, {})}`;
        }
      })}
  ${validate_component(Route, "Route").$$render($$result, { path: "/edit/:id" }, {}, {
        default: () => {
          return `${validate_component(Todo_detailes, "TodoDetails").$$render($$result, {}, {}, {})}`;
        }
      })}
  ${validate_component(Route, "Route").$$render($$result, { path: "*" }, {}, {
        default: () => {
          return `${validate_component(Error$1, "Error").$$render($$result, {}, {}, {})}`;
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
