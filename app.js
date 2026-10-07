"use strict";
const entries = Array.isArray(window.TOOLBOX_TOOLS) ? window.TOOLBOX_TOOLS : [];
const search = document.getElementById("search");
const category = document.getElementById("category");
const container = document.getElementById("tools");
const validTools = entries.filter(tool => tool && typeof tool.title === "string" && typeof tool.category === "string" && typeof tool.description === "string" && /^tools\/[a-zA-Z0-9_-]+\.html$/.test(tool.href));
for (const name of [...new Set(validTools.map(tool => tool.category))].sort()) {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  category.append(option);
}
function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = validTools.filter(tool => (!category.value || tool.category === category.value) && [tool.title, tool.category, tool.description, tool.keywords || ""].join(" ").toLocaleLowerCase().includes(query));
  container.replaceChildren();
  for (const tool of visible) {
    const card = document.createElement("a");
    card.className = "tool";
    card.href = tool.href;
    const icon = document.createElement("div");
    icon.className = "tool-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M8 6h8M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2"/></svg>';
    const tag = document.createElement("p");
    tag.className = "tool-category";
    tag.textContent = tool.category;
    const title = document.createElement("h2");
    title.textContent = tool.title;
    const description = document.createElement("p");
    description.className = "tool-description";
    description.textContent = tool.description;
    const open = document.createElement("span");
    open.className = "tool-open";
    open.textContent = "Open tool →";
    card.append(icon, tag, title, description, open);
    container.append(card);
  }
  document.getElementById("count").textContent = query || category.value ? `${visible.length} of ${validTools.length} tools` : `${validTools.length} tool${validTools.length === 1 ? "" : "s"} ready to use`;
  document.getElementById("empty").hidden = visible.length > 0;
}
search.addEventListener("input", render);
category.addEventListener("change", render);
render();
