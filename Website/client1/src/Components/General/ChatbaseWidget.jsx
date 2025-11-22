import { useEffect } from "react";

export default function ChatbaseWidget() {
  useEffect(() => {
    // bootstrap window.chatbase (mirrors your IIFE behavior)
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      const base = (...args) => {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(base, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });
    }

    const onLoad = () => {
      // avoid duplicate script injection
      if (document.getElementById("G_0JaPw8Dfmixr9QJFl6n")) return;
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "G_0JaPw8Dfmixr9QJFl6n"; // your provided ID
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      // Optional cleanup: remove the script if you ever unmount this globally
      // const el = document.getElementById("G_0JaPw8Dfmixr9QJFl6n");
      // if (el) el.remove();
    };
  }, []);

  return null; // no UI needed; this just injects the script
}
