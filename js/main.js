// PCVR Nexus — legal pages. Small progressive touches; every page reads fine without this file.
(function () {
  "use strict";

  // "On this page" list built from the numbered section headings (<section id> <h2> inside .doc).
  function buildContents() {
    var toc = document.querySelector(".toc");
    var sections = document.querySelectorAll(".doc > section[id]");
    if (!toc || sections.length < 3) return [];

    var list = document.createElement("ol");
    var links = [];
    sections.forEach(function (section, i) {
      var heading = section.querySelector("h2");
      if (!heading) return;
      var link = document.createElement("a");
      link.href = "#" + section.id;

      var num = document.createElement("span");
      num.className = "num";
      num.textContent = String(i + 1).padStart(2, "0");
      link.appendChild(num);

      var label = document.createElement("span");
      label.textContent = heading.firstChild.textContent.trim();
      link.appendChild(label);

      var item = document.createElement("li");
      item.appendChild(link);
      list.appendChild(item);
      links.push({ link: link, section: section });
    });
    toc.appendChild(list);
    toc.hidden = false;
    return links;
  }

  // Highlight the section being read in the sidebar list.
  function followScroll(links) {
    if (!links.length || !("IntersectionObserver" in window)) return;
    var visible = new Map();
    function mark() {
      var current = null;
      links.forEach(function (entry) {
        if (visible.get(entry.section) && !current) current = entry;
      });
      links.forEach(function (entry) {
        if (entry === current) entry.link.setAttribute("aria-current", "true");
        else entry.link.removeAttribute("aria-current");
      });
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible.set(e.target, e.isIntersecting); });
      mark();
    }, { rootMargin: "-80px 0px -55% 0px" });
    links.forEach(function (entry) { observer.observe(entry.section); });
  }

  // A quiet "#" after each section heading so a section can be linked to directly.
  function addHeadingLinks() {
    document.querySelectorAll(".doc > section[id] > h2").forEach(function (h) {
      var a = document.createElement("a");
      a.className = "anchor";
      a.href = "#" + h.parentElement.id;
      a.setAttribute("aria-label", "Link to this section");
      a.textContent = "#";
      h.appendChild(a);
    });
  }

  function fillYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var links = buildContents();
    addHeadingLinks();
    followScroll(links);
    fillYear();
  });
})();
