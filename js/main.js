// PCVR Nexus — legal pages. Small progressive touches; every page reads fine without this file.
(function () {
  "use strict";

  // Contents list built from the numbered section headings (<h2 id="..."> inside .doc).
  function buildContents() {
    var toc = document.querySelector(".toc");
    var doc = document.querySelector(".doc");
    if (!toc || !doc) return;

    var headings = doc.querySelectorAll("h2[id]");
    if (headings.length < 3) return;

    var list = document.createElement("ol");
    headings.forEach(function (h, i) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      link.href = "#" + h.id;

      var num = document.createElement("span");
      num.className = "num";
      num.textContent = (i + 1) + ".";
      link.appendChild(num);
      link.appendChild(document.createTextNode(h.firstChild.textContent.trim()));

      item.appendChild(link);
      list.appendChild(item);
    });
    toc.appendChild(list);
    toc.hidden = false;
  }

  // A quiet "#" after each section heading so a section can be linked to directly.
  function addHeadingLinks() {
    document.querySelectorAll(".doc h2[id]").forEach(function (h) {
      var a = document.createElement("a");
      a.className = "anchor";
      a.href = "#" + h.id;
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
    buildContents();
    addHeadingLinks();
    fillYear();
  });
})();
