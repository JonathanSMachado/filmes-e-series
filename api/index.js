var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (
    (module2 && typeof module2 === "object") ||
    typeof module2 === "function"
  ) {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, {
          get: () => module2[key],
          enumerable:
            !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        "default",
        !isNodeMode && module2 && module2.__esModule
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  );
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return (
      (cache && cache.get(module2)) ||
      ((temp = __reExport(__markAsModule({}), module2, 1)),
      cache && cache.set(module2, temp),
      temp)
    );
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  },
});

// node_modules/remix/index.js
var require_remix = __commonJS({
  "node_modules/remix/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require("@remix-run/node");
    Object.defineProperty(exports, "createCookie", {
      enumerable: true,
      get: function () {
        return node.createCookie;
      },
    });
    Object.defineProperty(exports, "createCookieSessionStorage", {
      enumerable: true,
      get: function () {
        return node.createCookieSessionStorage;
      },
    });
    Object.defineProperty(exports, "createFileSessionStorage", {
      enumerable: true,
      get: function () {
        return node.createFileSessionStorage;
      },
    });
    Object.defineProperty(exports, "createMemorySessionStorage", {
      enumerable: true,
      get: function () {
        return node.createMemorySessionStorage;
      },
    });
    Object.defineProperty(exports, "createSessionStorage", {
      enumerable: true,
      get: function () {
        return node.createSessionStorage;
      },
    });
    Object.defineProperty(exports, "unstable_createFileUploadHandler", {
      enumerable: true,
      get: function () {
        return node.unstable_createFileUploadHandler;
      },
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function () {
        return node.unstable_createMemoryUploadHandler;
      },
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function () {
        return node.unstable_parseMultipartFormData;
      },
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require("@remix-run/server-runtime");
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function () {
        return serverRuntime.createSession;
      },
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function () {
        return serverRuntime.isCookie;
      },
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function () {
        return serverRuntime.isSession;
      },
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function () {
        return serverRuntime.json;
      },
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function () {
        return serverRuntime.redirect;
      },
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = require("@remix-run/react");
    Object.defineProperty(exports, "Form", {
      enumerable: true,
      get: function () {
        return react.Form;
      },
    });
    Object.defineProperty(exports, "Link", {
      enumerable: true,
      get: function () {
        return react.Link;
      },
    });
    Object.defineProperty(exports, "Links", {
      enumerable: true,
      get: function () {
        return react.Links;
      },
    });
    Object.defineProperty(exports, "LiveReload", {
      enumerable: true,
      get: function () {
        return react.LiveReload;
      },
    });
    Object.defineProperty(exports, "Meta", {
      enumerable: true,
      get: function () {
        return react.Meta;
      },
    });
    Object.defineProperty(exports, "NavLink", {
      enumerable: true,
      get: function () {
        return react.NavLink;
      },
    });
    Object.defineProperty(exports, "Outlet", {
      enumerable: true,
      get: function () {
        return react.Outlet;
      },
    });
    Object.defineProperty(exports, "PrefetchPageLinks", {
      enumerable: true,
      get: function () {
        return react.PrefetchPageLinks;
      },
    });
    Object.defineProperty(exports, "RemixBrowser", {
      enumerable: true,
      get: function () {
        return react.RemixBrowser;
      },
    });
    Object.defineProperty(exports, "RemixServer", {
      enumerable: true,
      get: function () {
        return react.RemixServer;
      },
    });
    Object.defineProperty(exports, "Scripts", {
      enumerable: true,
      get: function () {
        return react.Scripts;
      },
    });
    Object.defineProperty(exports, "ScrollRestoration", {
      enumerable: true,
      get: function () {
        return react.ScrollRestoration;
      },
    });
    Object.defineProperty(exports, "useActionData", {
      enumerable: true,
      get: function () {
        return react.useActionData;
      },
    });
    Object.defineProperty(exports, "useBeforeUnload", {
      enumerable: true,
      get: function () {
        return react.useBeforeUnload;
      },
    });
    Object.defineProperty(exports, "useCatch", {
      enumerable: true,
      get: function () {
        return react.useCatch;
      },
    });
    Object.defineProperty(exports, "useFetcher", {
      enumerable: true,
      get: function () {
        return react.useFetcher;
      },
    });
    Object.defineProperty(exports, "useFetchers", {
      enumerable: true,
      get: function () {
        return react.useFetchers;
      },
    });
    Object.defineProperty(exports, "useFormAction", {
      enumerable: true,
      get: function () {
        return react.useFormAction;
      },
    });
    Object.defineProperty(exports, "useHref", {
      enumerable: true,
      get: function () {
        return react.useHref;
      },
    });
    Object.defineProperty(exports, "useLoaderData", {
      enumerable: true,
      get: function () {
        return react.useLoaderData;
      },
    });
    Object.defineProperty(exports, "useLocation", {
      enumerable: true,
      get: function () {
        return react.useLocation;
      },
    });
    Object.defineProperty(exports, "useMatches", {
      enumerable: true,
      get: function () {
        return react.useMatches;
      },
    });
    Object.defineProperty(exports, "useNavigate", {
      enumerable: true,
      get: function () {
        return react.useNavigate;
      },
    });
    Object.defineProperty(exports, "useNavigationType", {
      enumerable: true,
      get: function () {
        return react.useNavigationType;
      },
    });
    Object.defineProperty(exports, "useOutlet", {
      enumerable: true,
      get: function () {
        return react.useOutlet;
      },
    });
    Object.defineProperty(exports, "useOutletContext", {
      enumerable: true,
      get: function () {
        return react.useOutletContext;
      },
    });
    Object.defineProperty(exports, "useParams", {
      enumerable: true,
      get: function () {
        return react.useParams;
      },
    });
    Object.defineProperty(exports, "useResolvedPath", {
      enumerable: true,
      get: function () {
        return react.useResolvedPath;
      },
    });
    Object.defineProperty(exports, "useSearchParams", {
      enumerable: true,
      get: function () {
        return react.useSearchParams;
      },
    });
    Object.defineProperty(exports, "useSubmit", {
      enumerable: true,
      get: function () {
        return react.useSubmit;
      },
    });
    Object.defineProperty(exports, "useTransition", {
      enumerable: true,
      get: function () {
        return react.useTransition;
      },
    });
  },
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes,
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
});
init_react();
var import_server = require("react-dom/server");
var import_remix = __toESM(require_remix());
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const markup = (0, import_server.renderToString)(
    /* @__PURE__ */ React.createElement(import_remix.RemixServer, {
      context: remixContext,
      url: request.url,
    })
  );
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta,
});
init_react();
var import_react = require("@remix-run/react");
var import_nprogress = __toESM(require("nprogress"));

// node_modules/nprogress/nprogress.css
var nprogress_default = "/build/_assets/nprogress-JFUSETFZ.css";

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/root.tsx
var import_react2 = require("react");

// node_modules/react-circular-progressbar/dist/styles.css
var styles_default = "/build/_assets/styles-WSYSZ5GR.css";

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/root.tsx
var import_remix2 = __toESM(require_remix());

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-NVDGMXRC.css";

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/root.tsx
var meta = () => {
  return {
    title: "Filmes e S\xE9ries",
    description: "Cat\xE1logo de filmes e s\xE9ries",
    "og:type": "website",
    "og:url": "https://filmes-e-series.vercel.app/",
    "og:title": "Filmes e S\xE9ries",
    "og:description": "Cat\xE1logo de filmes e s\xE9ries atualizado.",
    "og:image": "",
    "twitter:card": "summary_large_image",
    "twitter:url": "https://filmes-e-series.vercel.app/",
    "twitter:title": "Filmes e S\xE9ries",
    "twitter:description": "Cat\xE1logo de filmes e s\xE9ries atualizado.",
    "twitter:image": "",
  };
};
var links = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwind_default,
    },
    {
      rel: "stylesheet",
      href: nprogress_default,
    },
    {
      rel: "icon",
      type: "image/ico",
      href: "/fav_icon.ico",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles_default,
    },
  ];
};
function App() {
  const transition = (0, import_react.useTransition)();
  (0, import_react2.useEffect)(() => {
    if (transition.state === "idle") {
      import_nprogress.default.done();
    } else {
      import_nprogress.default.start();
    }
  }, [transition.state]);
  return /* @__PURE__ */ React.createElement(
    "html",
    {
      lang: "en",
    },
    /* @__PURE__ */ React.createElement(
      "head",
      null,
      /* @__PURE__ */ React.createElement("meta", {
        charSet: "utf-8",
      }),
      /* @__PURE__ */ React.createElement("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1",
      }),
      /* @__PURE__ */ React.createElement(import_remix2.Meta, null),
      /* @__PURE__ */ React.createElement(import_remix2.Links, null)
    ),
    /* @__PURE__ */ React.createElement(
      "body",
      {
        className:
          "flex flex-col items-center bg-gradient-to-tr from-slate-900 to-slate-700 min-h-screen",
      },
      /* @__PURE__ */ React.createElement(import_remix2.Outlet, null),
      /* @__PURE__ */ React.createElement(
        import_remix2.ScrollRestoration,
        null
      ),
      /* @__PURE__ */ React.createElement(import_remix2.Scripts, null),
      /* @__PURE__ */ React.createElement(import_remix2.LiveReload, null)
    )
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo.tsx
var catalogo_exports = {};
__export(catalogo_exports, {
  default: () => CatalogLayout,
});
init_react();
var import_remix5 = __toESM(require_remix());

// app/layout/Layout.tsx
init_react();
var import_outline = require("@heroicons/react/outline");
var import_react3 = require("react");

// app/components/Footer/index.tsx
init_react();
function Footer() {
  const linkStyle =
    "cursor-pointer transition-colors ease-in-out text-cyan-700 hover:text-cyan-500";
  return /* @__PURE__ */ React.createElement(
    "footer",
    {
      className: "container mt-8 py-5 text-cyan-700",
    },
    /* @__PURE__ */ React.createElement(
      "p",
      {
        className: "flex flex-col sm:flex-row justify-center items-center",
      },
      "Desenvolvido com \xA0",
      /* @__PURE__ */ React.createElement(
        "a",
        {
          href: "https://remix.run",
          target: "_blank",
          rel: "noreferrer",
          className: linkStyle,
        },
        "Remix.run"
      ),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          className: "hidden sm:block",
        },
        "\xA0 & \xA0"
      ),
      /* @__PURE__ */ React.createElement(
        "a",
        {
          href: "https://www.themoviedb.org/documentation/api",
          target: "_blank",
          rel: "noreferrer",
          className: linkStyle,
        },
        "The Movie Database API"
      )
    )
  );
}

// app/components/Header/index.tsx
init_react();
var import_remix4 = __toESM(require_remix());

// app/components/Search/index.tsx
init_react();
var import_remix3 = __toESM(require_remix());
function Search(props) {
  const { action, method } = props;
  const transition = (0, import_remix3.useTransition)();
  return /* @__PURE__ */ React.createElement(
    import_remix3.Form,
    {
      method,
      action,
      className: "flex",
    },
    /* @__PURE__ */ React.createElement("input", {
      type: "search",
      name: "search",
      required: true,
      placeholder: "Buscar filmes e s\xE9ries...",
      autoComplete: "off",
      className:
        "w-auto sm:w-80 rounded-l-md border border-r-0 border-slate-400 text-slate-700 focus:border-slate-400 focus:shadow-none focus:outline-none",
    }),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        className:
          "rounded-r-md border border-l-0 border-slate-400 h-auto px-7 text-slate-200 bg-slate-600 hover:bg-cyan-500 hover:text-slate-100 transition-all ease-in-out",
      },
      transition.state !== "idle" ? "Buscando..." : "Buscar"
    )
  );
}

// app/components/Header/index.tsx
function Header() {
  const linkStyle =
    "text-slate-300 border-b-2 border-transparent transition-all ease-in-out hover:border-cyan-500";
  const activeLinkStyle = "border-b-2 border-cyan-500";
  return /* @__PURE__ */ React.createElement(
    "header",
    {
      className:
        "w-full px-6 flex flex-col lg:flex-row items-center justify-between bg-transparent text-slate-300",
    },
    /* @__PURE__ */ React.createElement(
      import_remix4.Link,
      {
        to: "/",
        className: "self-start",
      },
      /* @__PURE__ */ React.createElement("img", {
        src: "/images/logo.png",
        alt: "Filmes e S\xE9ries",
        className:
          "w-64 h-auto hover:scale-105 transition-transform ease-in-out",
        width: "256",
        height: "110",
      })
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "flex flex-col lg:flex-row items-center",
      },
      /* @__PURE__ */ React.createElement(
        "nav",
        {
          className: "flex gap-6 text-xl",
        },
        /* @__PURE__ */ React.createElement(
          import_remix4.NavLink,
          {
            to: "/catalogo/filmes",
            role: "button",
            className: ({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle,
          },
          "Filmes"
        ),
        /* @__PURE__ */ React.createElement(
          import_remix4.NavLink,
          {
            to: "/catalogo/series",
            role: "button",
            className: ({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle,
          },
          "S\xE9ries"
        )
      ),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "mx-0 my-4 lg:my-0 lg:mx-14",
        },
        /* @__PURE__ */ React.createElement(Search, {
          method: "get",
          action: "/catalogo",
        })
      ),
      /* @__PURE__ */ React.createElement(
        "a",
        {
          href: "https://github.com/JonathanSMachado/filmes-e-series",
          target: "_blank",
          className:
            "absolute top-10 right-4 ml-14 opacity-90 hover:opacity-100 transition-opacity",
        },
        /* @__PURE__ */ React.createElement("img", {
          src: "/images/GitHub-Mark-Light-32px.png",
          alt: "Projeto no GitHub",
          title: "Projeto no GitHub",
          width: "32",
          height: "32",
        })
      )
    )
  );
}

// app/layout/Layout.tsx
function Layout({ children }) {
  (0, import_react3.useEffect)(() => {
    if (typeof window !== "undefined") {
      const backToTopButton = document.getElementById("back-to-top-button");
      backToTopButton == null
        ? void 0
        : backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
      window.onscroll = function () {
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
          backToTopButton == null
            ? void 0
            : backToTopButton.classList.remove("hidden");
        } else {
          backToTopButton == null
            ? void 0
            : backToTopButton.classList.add("hidden");
        }
      };
    }
  }, []);
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement(Header, null),
    /* @__PURE__ */ React.createElement(
      "main",
      {
        className: "w-full flex-grow",
      },
      children
    ),
    /* @__PURE__ */ React.createElement(Footer, null),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        id: "back-to-top-button",
        title: "Voltar ao topo",
        className:
          "hidden fixed bottom-5 right-6 border-0 outline-none bg-cyan-700 cursor-pointer p-2 rounded-full text-lg transition-all hover:bg-cyan-500",
      },
      /* @__PURE__ */ React.createElement(import_outline.ArrowUpIcon, {
        className: " w-5 h-5 text-slate-300 hover:text-slate-100",
      })
    )
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo.tsx
function CatalogLayout() {
  return /* @__PURE__ */ React.createElement(
    Layout,
    null,
    /* @__PURE__ */ React.createElement(import_remix5.Outlet, null)
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo/$type.$id.tsx
var type_id_exports = {};
__export(type_id_exports, {
  default: () => Details,
  loader: () => loader,
});
init_react();
var import_react5 = require("react");
var import_react_player = __toESM(require("react-player"));
var import_remix7 = __toESM(require_remix());

// app/api/TMDB/index.ts
init_react();

// app/api/TMDB/api.ts
var api_exports = {};
__export(api_exports, {
  getDetails: () => getDetails,
  getMostPopular: () => getMostPopular,
  getRecommendations: () => getRecommendations,
  getSimilar: () => getSimilar,
  getTrending: () => getTrending,
  search: () => search,
});
init_react();

// app/utils/converters.ts
init_react();
function convertTypeToTMDB(type) {
  switch (type) {
    case "series":
      return "tv";
    default:
      return "movie";
  }
}
function convertPeriodToTMDB(period) {
  switch (period) {
    case "semana":
      return "week";
    default:
      return "day";
  }
}

// app/api/TMDB/api.ts
var TYPES = ["movie", "tv"];
async function getMostPopular({ type, page, limit }) {
  try {
    const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
    let collection = [];
    if (type) {
      const data = await fetchData(`${convertTypeToTMDB(type)}/popular`, {
        page: page ?? 1,
      });
      collection = data.results.map((item) => ({
        id: item.id,
        title: item.title || item.name || "",
        adult: item.adult || false,
        vote_average: item.vote_average,
        poster_path: tmdbImagesUrl + item.poster_path,
        type: item.title ? "filmes" : "series",
        popularity: item.popularity,
        release_date: item.release_date ?? item.first_air_date,
      }));
    } else {
      for (const type2 of TYPES) {
        const data = await fetchData(`${type2}/popular`, {
          page: page ?? 1,
        });
        const items = data.results.map((item) => ({
          id: item.id,
          title: item.title || item.name || "",
          adult: item.adult || false,
          vote_average: item.vote_average,
          poster_path: tmdbImagesUrl + item.poster_path,
          type: item.title ? "filmes" : "series",
          popularity: item.popularity,
          release_date: item.release_date ?? item.first_air_date,
        }));
        collection = [...collection, ...items];
      }
    }
    if (limit) {
      collection = collection.slice(0, limit);
    }
    return collection;
  } catch (error) {
    throw new Error(error);
  }
}
async function getDetails({ type, id }) {
  var _a, _b;
  try {
    let getVideoBaseUrl = function (site) {
      switch (site) {
        case "YouTube":
          return "https://www.youtube.com/watch?v=";
        case "Vimeo":
          return "https://vimeo.com/";
        default:
          return "";
      }
    };
    const posterUrl = ENV.TMDB_POSTER_IMAGES_URL;
    const backdropUrl = ENV.TMDB_BACKDROP_IMAGES_URL;
    const data = await fetchData(`${convertTypeToTMDB(type)}/${id}`, {
      appendVideos: true,
    });
    const videos =
      (_b =
        (_a = data == null ? void 0 : data.videos) == null
          ? void 0
          : _a.results) == null
        ? void 0
        : _b.map((video) => {
            return {
              id: video.id,
              name: video.name,
              url: `${getVideoBaseUrl(video.site)}${video.key}`,
              published_at: video.published_at,
            };
          });
    return {
      adult: data.adult,
      backdrop_path: backdropUrl + data.backdrop_path,
      genres: data.genres,
      homepage: data.homepage,
      id: data.id,
      overview: data.overview,
      popularity: data.popularity,
      poster_path: posterUrl + data.poster_path,
      title: data.title || data.name,
      type: data.title ? "filmes" : "series",
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      release_date: data.release_date ?? data.first_air_date,
      number_of_episodes: data.number_of_episodes,
      number_of_seasons: data.number_of_seasons,
      tagline: data.tagline || "",
      runtime: data.runtime || 0,
      videos,
    };
  } catch (error) {
    throw new Error(error);
  }
}
async function getRecommendations({ type, id, page, limit }) {
  try {
    const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
    const data = await fetchData(
      `${convertTypeToTMDB(type)}/${id}/recommendations`,
      {
        page: page ?? 1,
      }
    );
    if (limit) {
      data.results = data.results.slice(0, limit);
    }
    data.results = data.results.map((item) => ({
      id: item.id,
      title: item.title || item.name || "",
      adult: item.adult || false,
      vote_average: item.vote_average,
      poster_path: tmdbImagesUrl + item.poster_path,
      type: item.title ? "filmes" : "series",
      popularity: item.popularity,
      release_date: item.release_date ?? item.first_air_date,
    }));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
async function getSimilar({ type, id, page, limit }) {
  const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
  const data = await fetchData(`${convertTypeToTMDB(type)}/${id}/similar`, {
    page: page ?? 1,
  });
  if (limit) {
    data.results = data.results.slice(0, limit);
  }
  data.results = data.results.map((item) => ({
    id: item.id,
    title: item.title || item.name || "",
    adult: item.adult || false,
    vote_average: item.vote_average,
    poster_path: tmdbImagesUrl + item.poster_path,
    type: item.title ? "filmes" : "series",
    popularity: item.popularity,
    release_date: item.release_date ?? item.first_air_date,
  }));
  return data;
}
async function getTrending({ type, page, limit, period }) {
  const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
  let endpoint = type
    ? `trending/${convertTypeToTMDB(type)}/`
    : "trending/all/";
  endpoint += period ? convertPeriodToTMDB(period) : "day";
  const data = await fetchData(endpoint, { page: page ?? 1 });
  if (limit) {
    data.results = data.results.slice(0, limit);
  }
  return data.results.map((item) => {
    return {
      id: item.id,
      title: item.title || item.name || "",
      adult: item.adult || false,
      vote_average: item.vote_average,
      poster_path: tmdbImagesUrl + item.poster_path,
      type: item.title ? "filmes" : "series",
      popularity: item.popularity,
      release_date: item.release_date ?? item.first_air_date,
    };
  });
}
async function search({ query, type, page }) {
  const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
  if (type) {
    const data = await fetchData(`search/${convertTypeToTMDB(type)}`, {
      query,
      page: page ?? 1,
    });
    return data.results.map((item) => ({
      id: item.id,
      title: item.title || item.name || "",
      adult: item.adult || false,
      vote_average: item.vote_average,
      poster_path: tmdbImagesUrl + item.poster_path,
      type: item.title ? "filmes" : "series",
      popularity: item.popularity,
      release_date: item.release_date ?? item.first_air_date,
    }));
  } else {
    let collection = [];
    for (const type2 of TYPES) {
      const data = await fetchData(`search/${type2}`, {
        query,
        page: page ?? 1,
      });
      const items = data.results.map((item) => ({
        id: item.id,
        title: item.title || item.name || "",
        adult: item.adult || false,
        vote_average: item.vote_average,
        poster_path: `${tmdbImagesUrl}/${item.poster_path}`,
        type: item.title ? "filmes" : "series",
        popularity: item.popularity,
        release_date: item.release_date ?? item.first_air_date,
      }));
      collection = [...collection, ...items];
    }
    return collection;
  }
}
async function fetchData(endpoint, params) {
  const token = process.env.TMDB_TOKEN;
  const queryParams = ["language=pt-BR"];
  if (params) {
    if (params.page) {
      queryParams.push(`page=${params.page}`);
    }
    if (params.query) {
      queryParams.push(`query=${params.query}`);
    }
    if (params.appendVideos) {
      queryParams.push("append_to_response=videos");
    }
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/${endpoint}?${queryParams.join("&")}`,
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}

// app/components/Card/index.tsx
init_react();
var import_remix6 = __toESM(require_remix());

// app/utils/date.ts
init_react();
function formatDateToPtBr(date) {
  if (!date || typeof date !== "string") {
    return "";
  }
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T23:59:59"));
}
function convertMinutesToFormattedHours(minutes) {
  if (minutes === 0) {
    return "";
  }
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return `${hours}h ${minutesLeft}m`;
}

// app/components/Card/Score.tsx
init_react();
var import_react4 = require("react");
var import_react_circular_progressbar = require("react-circular-progressbar");
var Score = (props) => {
  const { value } = props;
  const calculateValue = (0, import_react4.useCallback)(
    (value2) => {
      return Math.ceil(value2 * 10);
    },
    [value]
  );
  return /* @__PURE__ */ React.createElement(
    import_react_circular_progressbar.CircularProgressbar,
    {
      value: calculateValue(value),
      text: `${calculateValue(value)}%`,
      background: true,
      backgroundPadding: 5,
      strokeWidth: 5,
      styles: (0, import_react_circular_progressbar.buildStyles)({
        textSize: "1.7em",
        backgroundColor: "#000",
        textColor: "#fff",
        pathColor: `
          ${value > 6.5 ? "green" : value < 3.5 ? "red" : "orange"}
        `,
      }),
    }
  );
};
var Score_default = Score;

// app/components/Card/index.tsx
function Card({ item, link, size, showScore }) {
  return /* @__PURE__ */ React.createElement(
    import_remix6.Link,
    {
      prefetch: "intent",
      to: link ?? "",
      className: `card group${!link ? " pointer-events-none" : ""}${
        size ? ` card-${size}` : ""
      }`,
      title: item.title,
    },
    link &&
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className:
            "card-description group-hover:opacity-100 group-hover:visible group-hover:h-1/4 group-focus:opacity-100 group-focus:h-1/4",
        },
        /* @__PURE__ */ React.createElement(
          "p",
          {
            className:
              "text-slate-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity delay-75",
          },
          item.title,
          /* @__PURE__ */ React.createElement("br", null),
          /* @__PURE__ */ React.createElement(
            "small",
            null,
            formatDateToPtBr(item.release_date)
          )
        )
      ),
    item.adult &&
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "card-adult-content-alert",
        },
        /* @__PURE__ */ React.createElement("div", {
          className: "image",
        })
      ),
    (showScore === void 0 || showScore) &&
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "card-user-score",
          title: "Pontua\xE7\xE3o (quanto maior melhor)",
        },
        /* @__PURE__ */ React.createElement(Score_default, {
          value: item.vote_average,
        })
      ),
    item.poster_path &&
      /* @__PURE__ */ React.createElement("img", {
        className: "card__image__bg",
        src: item.poster_path,
        alt: item.title,
        loading: "lazy",
      })
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo/$type.$id.tsx
var loader = async ({ params }) => {
  const { type, id } = params;
  if (typeof type !== "string" || typeof id !== "string") {
    throw new Error("Invalid params.");
  }
  const data = await api_exports.getDetails({ type, id });
  return (0, import_remix7.json)(data, {
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
};
function Details() {
  var _a;
  const item = (0, import_remix7.useLoaderData)();
  const emptyTMDBResponse = {
    page: 1,
    total_pages: 1,
    total_results: 1,
    results: [],
  };
  const [recommendations, setRecommendations] = (0, import_react5.useState)(
    emptyTMDBResponse
  );
  const fetcher = (0, import_remix7.useFetcher)();
  (0, import_react5.useEffect)(() => {
    fetcher.load(`/catalogo/${item.type}/${item.id}/recomendacoes?limit=6`);
  }, [item]);
  (0, import_react5.useEffect)(() => {
    if (fetcher.data) {
      setRecommendations(fetcher.data);
    }
  }, [fetcher.data]);
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement(
      "section",
      {
        className:
          "flex flex-col sm:flex-row gap-10 p-10 py-20 bg-cover bg-no-repeat",
        style: {
          backgroundImage: `url(${item.backdrop_path})`,
          backgroundColor: "rgba(0,0,0,.7)",
          backgroundBlendMode: "darken",
        },
      },
      /* @__PURE__ */ React.createElement(Card, {
        item,
        size: "large",
        showScore: false,
      }),
      /* @__PURE__ */ React.createElement(
        "article",
        {
          className: "text-slate-200",
        },
        /* @__PURE__ */ React.createElement(
          "h1",
          {
            className: "text-4xl text-slate-100",
          },
          item.title
        ),
        /* @__PURE__ */ React.createElement(
          "p",
          {
            className: "text-sm mt-2",
          },
          item.release_date && formatDateToPtBr(item.release_date) + " (BR)",
          /* @__PURE__ */ React.createElement(
            "span",
            {
              className: "mx-2",
            },
            "-"
          ),
          item.genres.map((genre) => genre.name).join(", "),
          /* @__PURE__ */ React.createElement(
            "span",
            {
              className: "mx-2",
            },
            "-"
          ),
          convertMinutesToFormattedHours(item.runtime)
        ),
        item.tagline &&
          /* @__PURE__ */ React.createElement(
            "p",
            {
              className: "italic my-6 text-slate-300",
            },
            item.tagline
          ),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "mt-6",
          },
          /* @__PURE__ */ React.createElement(
            "h2",
            {
              className: "text-2xl mb-4 font-semibold",
            },
            "Sinopse"
          ),
          /* @__PURE__ */ React.createElement(
            "p",
            {
              className: "text-justify text-lg",
            },
            item.overview
              ? item.overview
              : /* @__PURE__ */ React.createElement(
                  "span",
                  {
                    className: "italic",
                  },
                  "Nenhuma informa\xE7\xE3o dispon\xEDvel"
                )
          )
        ),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "mt-6 flex items-center",
          },
          /* @__PURE__ */ React.createElement(
            "div",
            {
              className: "w-20 h-20 hover:scale-110 transition-all",
            },
            /* @__PURE__ */ React.createElement(Score_default, {
              value: item.vote_average,
            })
          ),
          /* @__PURE__ */ React.createElement(
            "p",
            {
              className: "ml-2 text-slate-300",
            },
            "Avalia\xE7\xE3o dos usu\xE1rios"
          )
        )
      )
    ),
    ((_a = item.videos) == null ? void 0 : _a.length) &&
      /* @__PURE__ */ React.createElement(
        "section",
        {
          className: "p-10",
        },
        /* @__PURE__ */ React.createElement(
          "h3",
          {
            className: "text-xl text-slate-300 mb-10",
          },
          "V\xEDdeos"
        ),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "flex flex-wrap gap-6",
          },
          item.videos.map((video) => {
            return /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "w-72 md:w-96 h-44 md:h-64 relative",
                key: video.id,
              },
              /* @__PURE__ */ React.createElement(
                "span",
                {
                  className: "absolute top-0 left-1 text-slate-300",
                },
                video.name
              ),
              /* @__PURE__ */ React.createElement(import_react_player.default, {
                url: video.url,
                controls: true,
                width: "100%",
                height: "100%",
                light: true,
              })
            );
          })
        )
      ),
    recommendations.results.length &&
      /* @__PURE__ */ React.createElement(
        "section",
        {
          className: "p-10",
        },
        /* @__PURE__ */ React.createElement(
          "h3",
          {
            className: "text-xl text-slate-300 mb-10",
          },
          "Recomendados"
        ),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "flex flex-wrap gap-6 text-slate-400",
          },
          recommendations.results.map((item2) =>
            /* @__PURE__ */ React.createElement(Card, {
              key: `${item2.type}-${item2.id}`,
              item: item2,
              size: "small",
              link: `/catalogo/${item2.type}/${item2.id}`,
            })
          )
        )
      )
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo/$type.$id/recomendacoes.tsx
var recomendacoes_exports = {};
__export(recomendacoes_exports, {
  default: () => Recommendations,
  loader: () => loader2,
});
init_react();
var import_react6 = require("react");
var import_remix8 = __toESM(require_remix());
var loader2 = async ({ params, request }) => {
  const type = params.type;
  const id = Number(params.id);
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit"));
  if (!type || typeof type !== "string" || !id || typeof id !== "number") {
    throw new Error("Invalid params.");
  }
  const data = await api_exports.getRecommendations({
    type,
    id,
    page,
    limit,
  });
  return (0, import_remix8.json)(data, {
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
};
function Recommendations() {
  const data = (0, import_remix8.useLoaderData)();
  const oldItems = (0, import_remix8.useOutletContext)();
  const [items, setItems] = (0, import_react6.useState)(oldItems);
  (0, import_react6.useEffect)(() => {
    if (!oldItems.length || !data.results.length) {
      return;
    }
    setItems(
      data.results.filter((item) => {
        const oldIds = oldItems.map((oldItem) => oldItem.id);
        return !oldIds.includes(item.id);
      })
    );
  }, [oldItems, data]);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex flex-wrap justify-around items-center gap-y-10 gap-x-6 ",
    },
    items.map((item) =>
      /* @__PURE__ */ React.createElement(Card, {
        key: `${item.type}-${item.id}`,
        item,
        size: "small",
        link: `/catalogo/${item.type}/${item.id}`,
      })
    )
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo/$type.tsx
var type_exports = {};
__export(type_exports, {
  default: () => Type,
  loader: () => loader3,
});
init_react();
var import_remix10 = __toESM(require_remix());

// app/components/CardContainer/index.tsx
init_react();
var import_react7 = require("react");
var import_remix9 = __toESM(require_remix());
var sortByPopularity = (a, b) => b.popularity - a.popularity;
function CardContainer(props) {
  const [scrollPosition, setScrollPosition] = (0, import_react7.useState)(0);
  const [clientHeight, setClientHeight] = (0, import_react7.useState)(0);
  const [height, setHeight] = (0, import_react7.useState)(null);
  const [shouldFetch, setShouldFetch] = (0, import_react7.useState)(true);
  const [page, setPage] = (0, import_react7.useState)(2);
  const fetcher = (0, import_remix9.useFetcher)();
  const [items, setItems] = (0, import_react7.useState)(props.items);
  const infinityScroll = props.infinityScroll || false;
  const [search2, setSearch] = (0, import_react7.useState)(null);
  const [type, setType] = (0, import_react7.useState)(null);
  const mainHeight = (0, import_react7.useCallback)(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [items.length]
  );
  if (infinityScroll) {
    (0, import_react7.useEffect)(() => {
      const scrollListener = () => {
        setClientHeight(window.innerHeight);
        setScrollPosition(window.scrollY);
      };
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", scrollListener);
        const url = new URL(window.location.href);
        setSearch(url.searchParams.get("search"));
        setType(url.pathname.split("/")[2]);
      }
      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("scroll", scrollListener);
        }
      };
    }, []);
    (0, import_react7.useEffect)(() => {
      if (!shouldFetch || !height) return;
      if (clientHeight + scrollPosition + 100 < height) return;
      let endpoint = `/catalogo?index&page=${page}`;
      if (search2) {
        endpoint += `&search=${search2}`;
      }
      if (type) {
        endpoint += `&type=${type}`;
      }
      fetcher.load(endpoint);
      setShouldFetch(false);
    }, [clientHeight, scrollPosition, fetcher]);
    (0, import_react7.useEffect)(() => {
      var _a;
      const items2 =
        (_a = fetcher == null ? void 0 : fetcher.data) == null
          ? void 0
          : _a.items;
      if ((items2 == null ? void 0 : items2.length) === 0) {
        setShouldFetch(false);
        return;
      }
      if ((items2 == null ? void 0 : items2.length) > 0) {
        setItems((prevItems) => [...prevItems, ...items2]);
        setPage((page2) => page2 + 1);
        setShouldFetch(true);
      }
    }, [fetcher.data]);
  }
  (0, import_react7.useEffect)(() => {
    setItems(props.items);
  }, [props.items]);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: mainHeight,
      className: "card-container",
    },
    !items.length
      ? /* @__PURE__ */ React.createElement(
          "p",
          {
            className: "text-slate-300",
          },
          "Nenhum item encontrado!"
        )
      : items.sort(sortByPopularity).map((item) =>
          /* @__PURE__ */ React.createElement(Card, {
            key: `${item.type}-${item.id}`,
            item,
            link: `/catalogo/${item.type}/${item.id}`,
          })
        ),
    fetcher.state === "loading" &&
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "flex justify-center mt-3 text-slate-300",
        },
        "Carregando..."
      )
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo/$type.tsx
var loader3 = async ({ params }) => {
  const type = params.type;
  const items = await api_exports.getMostPopular({ type });
  return (0, import_remix10.json)(
    { items },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};
function Type() {
  const { items } = (0, import_remix10.useLoaderData)();
  return /* @__PURE__ */ React.createElement(CardContainer, {
    items,
    infinityScroll: true,
  });
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/catalogo/index.tsx
var catalogo_exports2 = {};
__export(catalogo_exports2, {
  default: () => Catalog,
  loader: () => loader4,
});
init_react();
var import_remix11 = __toESM(require_remix());
var getPage = (searchParams) => {
  const page = searchParams.get("page");
  return page ? parseInt(page) : 1;
};
var loader4 = async ({ request }) => {
  const url = new URL(request.url);
  const page = getPage(url.searchParams);
  const search2 = url.searchParams.get("search");
  const type = url.searchParams.get("type");
  let items = [];
  if (search2) {
    items = await api_exports.search({ query: search2, page });
  } else if (type) {
    items = await api_exports.getMostPopular({ type, page });
  } else {
    items = await api_exports.getMostPopular({ page });
  }
  return (0, import_remix11.json)(
    { search: search2, items },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};
function Catalog() {
  const { search: search2, items } = (0, import_remix11.useLoaderData)();
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    search2 &&
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-slate-300 text-xl mx-10",
        },
        "Resultado da busca por ",
        /* @__PURE__ */ React.createElement(
          "em",
          {
            className: "text-slate-100",
          },
          search2
        )
      ),
    /* @__PURE__ */ React.createElement(CardContainer, {
      items,
      infinityScroll: true,
    })
  );
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => Index,
  loader: () => loader5,
});
init_react();
var import_react8 = require("react");
var import_remix12 = __toESM(require_remix());

// app/components/AppError/index.tsx
init_react();
function Error2({ error, children }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className:
        "h-screen w-screen px-10 flex flex-col justify-center text-sm text-red-500",
    },
    /* @__PURE__ */ React.createElement(
      "p",
      {
        className: "mb-5 break-all",
      },
      error.message
    ),
    /* @__PURE__ */ React.createElement(
      "pre",
      {
        className: "whitespace-pre-wrap break-all",
      },
      error.stack
    ),
    /* @__PURE__ */ React.createElement("p", null, children)
  );
}

// app/components/Button/index.tsx
init_react();
function Button(props) {
  const { children, type, className, variant, size, onclick } = props;
  return /* @__PURE__ */ React.createElement(
    "button",
    __spreadValues(
      {
        type: type ?? "button",
        className: `btn btn-${variant ?? "primary"} btn-${size ?? "medium"} ${
          className ?? ""
        }`,
      },
      onclick && { onClick: onclick }
    ),
    children
  );
}

// app/components/HeroArea/index.tsx
init_react();
function HeroArea() {
  return /* @__PURE__ */ React.createElement("div", null);
}

// route:/Volumes/MacbookHDD/Projetos/Remix.run/filmespedia/app/routes/index.tsx
var loader5 = async ({ request }) => {
  const url = new URL(request.url);
  const period = url.searchParams.get("tendencias");
  const data = await api_exports.getTrending({ period });
  return (0, import_remix12.json)(data, {
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
};
function Index() {
  const data = (0, import_remix12.useLoaderData)();
  const [isTodayActive, setIsTodayActive] = (0, import_react8.useState)(true);
  (0, import_react8.useEffect)(() => {
    setIsTodayActive(
      window.location.search.includes("tendencias=hoje") ||
        !window.location.search.includes("tendencias")
    );
  }, [data]);
  return /* @__PURE__ */ React.createElement(
    Layout,
    null,
    /* @__PURE__ */ React.createElement(HeroArea, null),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "px-10 py-5 flex flex-col md:flex-row items-center",
      },
      /* @__PURE__ */ React.createElement(
        "h3",
        {
          className: "text-2xl text-slate-300",
        },
        "Tend\xEAncias"
      ),
      /* @__PURE__ */ React.createElement(
        "nav",
        {
          className:
            "relative mt-2 md:mt-0 md:ml-10 flex bg-slate-300 rounded-full overflow-hidden",
        },
        /* @__PURE__ */ React.createElement("div", {
          className: `absolute top-0 bottom-0 rounded-full bg-cyan-500 w-full z-10 transition-all ease-in-out duration-200 ${
            isTodayActive ? "-translate-x-32" : "translate-x-16"
          }`,
        }),
        /* @__PURE__ */ React.createElement(
          import_remix12.NavLink,
          {
            to: "?tendencias=hoje",
            className: `px-4 py-1 rounded-full bg-transparent z-10 ${
              isTodayActive && "text-slate-200"
            }`,
          },
          "Hoje"
        ),
        /* @__PURE__ */ React.createElement(
          import_remix12.NavLink,
          {
            to: "?tendencias=semana",
            className: `px-4 py-1 whitespace-nowrap rounded-full bg-transparent z-10 ${
              !isTodayActive && "text-slate-200"
            }`,
          },
          "Nesta semana"
        )
      )
    ),
    /* @__PURE__ */ React.createElement(CardContainer, {
      items: data,
    }),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "mt-10 flex justify-center",
      },
      /* @__PURE__ */ React.createElement(
        import_remix12.Form,
        {
          action: "catalogo",
        },
        /* @__PURE__ */ React.createElement(
          Button,
          {
            className: "mt-6",
            type: "submit",
            size: "large",
            variant: "primary",
          },
          "Ver cat\xE1logo completo"
        )
      )
    )
  );
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ React.createElement(Error2, {
    error,
  });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = {
  version: "f081377b",
  entry: {
    module: "/build/entry.client-23QQ5RLU.js",
    imports: ["/build/_shared/chunk-S67RCOCN.js"],
  },
  routes: {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/root-A73QBXUI.js",
      imports: void 0,
      hasAction: false,
      hasLoader: false,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
    "routes/catalogo": {
      id: "routes/catalogo",
      parentId: "root",
      path: "catalogo",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/catalogo-JL5DD4IT.js",
      imports: ["/build/_shared/chunk-6K5HG5UQ.js"],
      hasAction: false,
      hasLoader: false,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
    "routes/catalogo/$type": {
      id: "routes/catalogo/$type",
      parentId: "routes/catalogo",
      path: ":type",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/catalogo/$type-WIG6V7XG.js",
      imports: [
        "/build/_shared/chunk-NY65BVGM.js",
        "/build/_shared/chunk-TLBBQVZI.js",
      ],
      hasAction: false,
      hasLoader: true,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
    "routes/catalogo/$type.$id": {
      id: "routes/catalogo/$type.$id",
      parentId: "routes/catalogo",
      path: ":type/:id",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/catalogo/$type.$id-G2U6WA4G.js",
      imports: ["/build/_shared/chunk-TLBBQVZI.js"],
      hasAction: false,
      hasLoader: true,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
    "routes/catalogo/$type.$id/recomendacoes": {
      id: "routes/catalogo/$type.$id/recomendacoes",
      parentId: "routes/catalogo/$type.$id",
      path: "recomendacoes",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/catalogo/$type.$id/recomendacoes-5NNB56IJ.js",
      imports: void 0,
      hasAction: false,
      hasLoader: true,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
    "routes/catalogo/index": {
      id: "routes/catalogo/index",
      parentId: "routes/catalogo",
      path: void 0,
      index: true,
      caseSensitive: void 0,
      module: "/build/routes/catalogo/index-LS2BOLNK.js",
      imports: [
        "/build/_shared/chunk-NY65BVGM.js",
        "/build/_shared/chunk-TLBBQVZI.js",
      ],
      hasAction: false,
      hasLoader: true,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
    "routes/index": {
      id: "routes/index",
      parentId: "root",
      path: void 0,
      index: true,
      caseSensitive: void 0,
      module: "/build/routes/index-6GSMTTDM.js",
      imports: [
        "/build/_shared/chunk-6K5HG5UQ.js",
        "/build/_shared/chunk-NY65BVGM.js",
        "/build/_shared/chunk-TLBBQVZI.js",
      ],
      hasAction: false,
      hasLoader: true,
      hasCatchBoundary: false,
      hasErrorBoundary: true,
    },
  },
  url: "/build/manifest-F081377B.js",
};

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports,
  },
  "routes/catalogo": {
    id: "routes/catalogo",
    parentId: "root",
    path: "catalogo",
    index: void 0,
    caseSensitive: void 0,
    module: catalogo_exports,
  },
  "routes/catalogo/$type.$id": {
    id: "routes/catalogo/$type.$id",
    parentId: "routes/catalogo",
    path: ":type/:id",
    index: void 0,
    caseSensitive: void 0,
    module: type_id_exports,
  },
  "routes/catalogo/$type.$id/recomendacoes": {
    id: "routes/catalogo/$type.$id/recomendacoes",
    parentId: "routes/catalogo/$type.$id",
    path: "recomendacoes",
    index: void 0,
    caseSensitive: void 0,
    module: recomendacoes_exports,
  },
  "routes/catalogo/$type": {
    id: "routes/catalogo/$type",
    parentId: "routes/catalogo",
    path: ":type",
    index: void 0,
    caseSensitive: void 0,
    module: type_exports,
  },
  "routes/catalogo/index": {
    id: "routes/catalogo/index",
    parentId: "routes/catalogo",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: catalogo_exports2,
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports,
  },
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    assets,
    entry,
    routes,
  });
/**
 * @remix-run/node v1.5.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.5.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.5.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
//# sourceMappingURL=index.js.map
