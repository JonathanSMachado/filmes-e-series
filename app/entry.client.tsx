import { RemixBrowser } from "@remix-run/react";
// import { hydrate } from "react-dom";
import { hydrateRoot } from "react-dom/client";

// hydrate(<RemixBrowser />, document);
hydrateRoot(document, <RemixBrowser />);
