const mode = document.querySelector(".mode input");
const mode2 = document.querySelector(".toc .mode input");
let mybutton = document.getElementById("btn-back-to-top");
let iframe = document.getElementById("edgeanimation");
let iframeWindow;
let lastvisited = "";
$(document).ready(function () {
  setTimeout(() => {
    if (iframe) {
      iframeWindow = $(iframe).contents();

      console.log(iframe.contentWindow.mute);
      iframe.contentWindow.mute = false;
      console.log(iframe.contentWindow.mute);
    }
  }, 100);

  if ($(".p3.presentation main p")) {
    $(".p3.presentation main p").each(function () {
      let that = $(this);
      let childrens = $(this).children("span");
      if (childrens.length > 1) {
        console.log(childrens);
        that.css("display", "flex");
      }
    });
  }
  $.each($(".accordion"), function () {
    let that = $(this);

    that.on("click", function () {
      $(this).toggleClass("active");
      if ($(this).hasClass("active")) {
        setTimeout(() => {
          if (that.next().find(".tabs").length > 0) {
            $(that.next().find(".tabs").find("input")[0]).trigger("click");
          }
        }, 100);
      }
      let panel = that.next()[0];
      //console.log(panel);
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
      if ($(this).parent().hasClass("question")) {
        if ($(this).hasClass("active")) {
          $(this).children("i").text("help");
          that.parent().parent().parent()[0].style.maxHeight =
            that.parent().parent().parent()[0].scrollHeight +
            panel.scrollHeight +
            "px";
        } else {
          $(this).children("i").text("help_outline");
        }
      } else {
        if ($(this).hasClass("active")) {
          $(this).children("i").text("check_circle");
          that.parent().parent().parent()[0].style.maxHeight =
            that.parent().parent().parent()[0].scrollHeight +
            panel.scrollHeight +
            "px";
        } else {
          $(this).children("i").text("check_circle_outline");
        }
      }
    });
  });
  $(".resource").each(function () {
    $(this).prepend(
      `<button class="btn bl prevresource" id="prevresource">Previous resource <i class="fas fa-arrow-up"></i></button>`
    );
    $(this).append(
      `<button class="btn bl nextresource" id="nextresource">Next resource <i class="fas fa-arrow-up rotated"></i></button>`
    );
  });
  $($(".resource")[0]).children("#prevresource").hide();
  $($(".resource")[$(".resource").length - 1])
    .children("#nextresource")
    .hide();
  $.each($(".slider"), function () {
    const this_slider = $(this);
    const slides = this_slider.find(".slideItem");
    const control_prev = this_slider.find(".prev");
    const control_next = this_slider.find(".next");
    let curID = this_slider.parent().attr("id");
    let slideshowHeight = [];
    if (slides.length > 1) {
      $("#" + curID + " .slideno").html("1 of " + slides.length);
      control_next.prop("disabled", false).removeClass("disabled");
      control_prev.prop("disabled", false).removeClass("disabled");
      $.each(slides, function () {
        $(this).find(".answer").show();
        slideshowHeight.push($(this).height());
      });

      $(this).children(".qHint").trigger("click");
      $.each(slides, function () {
        $(this).find(".answer").hide();
        $(this)
          .height(Math.max(...slideshowHeight) + 20)
          .attr("data-height", Math.max(...slideshowHeight) + 20);
      });
      $(this).children(".qHint").trigger("click");
    }
  });
  $("#expandAll").click(function (e) {
    e.preventDefault();
    $(".accordion:not('.active')").trigger("click");
  });
  $("#expandAll1").click(function (e) {
    e.preventDefault();
    $(".p1 .resources")
      .nextAll(".headings")
      .children(".accordion")
      .trigger("click");
  });
  $("#collapseAll").click(function (e) {
    e.preventDefault();
    $(".accordion").removeClass("active");
    $.each($(".accordion"), function () {
      $(this).children("i").text("help_outline");
      $(this).children("i").text("check_circle_outline");
      $(".accbody").attr("style", "");
    });
  });
  $("#collapseAll1").click(function (e) {
    e.preventDefault();
    $(".accordion").removeClass("active");
    $.each($(".accordion"), function () {
      $(this).children("i").text("help_outline");
      $(this).children("i").text("check_circle_outline");
      $(".accbody").attr("style", "");
    });
  });
  if ($(".vidplyr").length > 0) {
    const players = Array.from(document.querySelectorAll(".vidplyr")).map(
      (p) => new Plyr(p)
    );
  }
  $(".solution").each(function () {
    if ($(this).next().hasClass("solution")) {
      $(this).css("margin-bottom", "1px");
      // $(this).css("margin-bottom", "1px");
    }
  });
  // $(".answer").show();
  // resizeSlideshow(".slider");
  // $(".answer").hide();
});
if (mode) {
  mode.addEventListener("click", function validate() {
    const modeStatus = document.querySelector(".modeText");

    if (mode.checked) {
      mode2.checked = true;
      document.body.classList.add("presentation");
      document.body.classList.remove("planning");
      modeStatus.textContent = "Teaching";
      // resizeSlideshow(".slider");

      //$(mode2).prop("checked", false);
    } else {
      mode2.checked = false;
      document.body.classList.remove("presentation");
      document.body.classList.add("planning");
      modeStatus.textContent = "Planning";
      // resizeSlideshow(".slider");
      // $(mode2).prop("checked", true);
    }

    setTimeout(() => {
      $(".headers")[0].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }, 10);
    $(".accordion").removeClass("active");
    $.each($(".accordion"), function () {
      $(this).children("i").text("help_outline");
      $(this).children("i").text("check_circle_outline");
      $(".accbody").attr("style", "");
    });
  });
}
if (mode2) {
  mode2.addEventListener("click", function validate() {
    $(mode).trigger("click");
    setTimeout(() => {
      $(".headers")[0].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }, 10);
  });
}
$(document).on("click", ".prev", function () {
  let currentElm = $(this).parent().find(".slideItems").find(".active");
  const fulscrnsld = currentElm.parent().parent().parent().parent();
  const this_slider = $(this);
  const slides = this_slider.parent().find(".slideItem");
  let currentIdx = slides.index(currentElm);
  let prevIdx;
  let curslide;

  if (currentIdx == 0) {
    prevIdx = slides.length - 1;
    curslide = prevIdx;
    $(slides[curslide]).addClass("active");
  } else {
    curslide = currentIdx - 1;
    $(slides[curslide]).addClass("active");
  }

  currentElm
    .removeClass("active")
    .stop()
    .animate({ left: "100%" }, 500, function () {
      slides.css("left", 0).hide();

      $(slides[curslide]).show();
      slides
        .parent()
        .parent()
        .next()
        .find(".slideno")
        .html(curslide + 1 + " of " + slides.length);
    });
  let currentElm1 = $(
    $(this).parent().find(".slideItems").find(".active").children()[0]
  );

  if (fulscrnsld) {
    if (currentElm1.is(":header"))
      $(".fullScrnHeader h2").text(currentElm1.text());
  }
});
$(document).on("click", ".next", function () {
  let currentElm = $(this).parent().find(".slideItems").find(".active");
  const fulscrnsld = currentElm.parent().parent().parent().parent();

  const this_slider = $(this);
  const slides = this_slider.parent().find(".slideItem");
  let currentIdx = slides.index(currentElm);
  let nextIdx;
  let curslide;
  if (slides.length == currentIdx + 1) {
    nextIdx = 0;
    curslide = 1;
    $(slides[0]).addClass("active");
  } else {
    nextIdx = currentIdx + 1;
    curslide = nextIdx + 1;
    $(slides[nextIdx]).addClass("active");
  }

  currentElm
    .removeClass("active")
    .stop()
    .animate({ left: "-100%" }, 500, function () {
      slides.css("left", 0).hide();

      $(slides[nextIdx]).show();
      slides
        .parent()
        .parent()
        .next()
        .find(".slideno")
        .html(curslide + " of " + slides.length);
    });
  let currentElm1 = $(
    $(this).parent().find(".slideItems").find(".active").children()[0]
  );

  if (fulscrnsld) {
    if (currentElm1.is(":header"))
      $(".fullScrnHeader h2").text(currentElm1.text());
  }
  // setTimeout(() => {
  //   console.log(slides.parent().parent().next().find(".slideno").html());
  //   console.log(currentElm);
  // }, 100);
});

$(document).on("click", ".hint button", function () {
  $(this).next().toggleClass("notvisible");
});
$(document).on("click", ".revealAnswer", function () {
  $(this).hide();
  $(this).next().show();
});
$(document).on("click", ".hotspot", function () {
  $(".popupText").hide();
  $("." + $(this).attr("id")).fadeIn();
});

$(document).on("click", ".expand", function (e) {
  e.preventDefault();
  $(".mainContainer").hide();
  $(this).parent().parent().clone().appendTo(".fulsrcsldshw");
  lastvisited = $(this).parent().parent().prev().attr("id");
  if (!lastvisited) {
    $(this).parent().parent().prevUntil("h2").prev().attr("id");
  }
  $(".fulscreenContent").css("display", "flex");
  let currentElm1 = $($(".fulsrcsldshw .slideItem.active").children()[0]);
  console.log(currentElm1.text());
  if (currentElm1.is(":header")) {
    $(".fullScrnHeader").append("<h2></h2>");
    $(".fullScrnHeader h2").text(currentElm1.text());
  } else if ($($(".fulsrcsldshw .slideItem")[0]).children("h2").length > 0) {
    $($(".fulsrcsldshw .slideItem")[0])
      .children("h2")
      .hide()
      .clone()
      .show()
      .appendTo(".fullScrnHeader");
  }
  $(".fulscreenContent .slideItem").each(function () {
    $(this).css("height", "");
  });
});
$(document).on("click", ".collapse", function () {
  $(".fulscreenContent").css("display", "none");
  $(".fulsrcsldshw").html("");
  $(".fullScrnHeader").html("");
  $(".mainContainer").show();
  $("html, body").animate(
    {
      scrollTop: $("#" + lastvisited)
        .parent()
        .offset().top,
    },
    10
  );
  lastvisited = "";
});
$(document).on("click", ".tGuide", function (e) {
  e.preventDefault();
  let loc = $(this).attr("data-id");
  console.log(loc);
  $("html, body").animate(
    {
      scrollTop: $("#" + loc).offset().top,
    },
    100
  );
});

$(document).on("click", ".resr", function (e) {
  e.preventDefault();
  let loc = $(this).attr("data-id").slice(1);
  console.log($("#resource" + loc).offset().top);
  $("html, body").animate(
    {
      scrollTop: $("#resource" + loc).offset().top,
    },
    100
  );
});
$(document).on("click", ".res3", function (e) {
  e.preventDefault();

  let loc = $(this).attr("data-id");
  loc = loc.split("_");
  let url = loc[0] + ".html" + "#resource" + loc[1].slice(1);
  window
    .open(loc[0] + ".html" + "#resource" + loc[1].slice(1), "resources")
    .focus();

  //redirect(url);
});
$(document).on("click", ".downloadFile", function (e) {
  e.preventDefault();
  window.open($(this).attr("file"), "_blank");
  // window.open((window.location.href = ));
});

function redirect(url) {
  window.open(url, "_blank");
}

window.onscroll = function () {
  if (window.innerWidth > 400) {
    scrollFunction();
  }
  if (window.innerWidth < 400) {
    $("#btn-back-to-top").hide();
    $(".mode").hide();
  }
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    if (mode2) {
      if (mode2.checked) {
        mode.checked = true;
      } else {
        mode.checked = false;
      }
    }
    $(".mainContainer > .mode").show();
  } else {
    $(".mainContainer > .mode").hide();
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function resizeSlideshow(a) {
  $.each($(a), function () {
    let slideshows = $(this).find(".slideItem");
    console.log(slideshows);
    let slideshowHeight = [];
    $.each(slideshows, function () {
      $(this).removeAttr("style");
    });
    $.each(slideshows, function () {
      slideshowHeight.push($(this).height());
    });
    console.log(slideshowHeight);
    $.each(slideshows, function () {
      $(this)
        .height(Math.max(...slideshowHeight) + 20)
        .attr("data-height", Math.max(...slideshowHeight) + 20);
      console.log($(this).attr("data-height"));
    });
  });
}
$(document).on("click", ".tabs input", function () {
  console.log("called");
  //$(this).parent().parent().css("max-height", "");
  console.log();
  $(this)
    .parent()
    .parent()
    .parent()
    .css("max-height", $(this).parent().parent()[0].scrollHeight + 20 + "px");
});
$(document).on("click", "#prevresource", function (e) {
  e.preventDefault();

  let gotores = $(this).parent().prev()[0];

  gotores.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
});
$(document).on("click", "#nextresource", function (e) {
  e.preventDefault();

  let gotores = $(this).parent().next()[0];

  gotores.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
});

$(".sb").click(function (e) {
  e.preventDefault();
  let url = "";
  if ($(this).attr("data-id")) {
    url = "../studentbook/web/viewer.html#page=" + $(this).attr("data-id");
  } else {
    url = "../studentbook/web/viewer.html";
  }
  //redirect(url);
  window.open(url, "mybook").focus();
});

$(".sb1").click(function (e) {
  e.preventDefault();
  let url = "";
  if ($(this).attr("data-id")) {
    url = "../lessonPDF/web/viewer.html#page=" + $(this).attr("data-id");
  } else {
    url = "../lessonPDF/web/viewer.html";
  }
  //redirect(url);
  window.open(url, "lessons").focus();
});
$(".sb2").click(function (e) {
  e.preventDefault();
  let url = "";
  if ($(this).attr("data-id")) {
    url = "../answers/web/viewer.html#page=" + $(this).attr("data-id");
  } else {
    url = "../answers/web/viewer.html";
  }
  //redirect(url);
  window.open(url, "answers").focus();
});
$(".sb3").click(function (e) {
  e.preventDefault();
  let url = "";
  if ($(this).attr("data-id")) {
    url = "../labbook/web/viewer.html#page=" + $(this).attr("data-id");
  } else {
    url = "../labbook/web/viewer.html";
  }
  //redirect(url);
  window.open(url, "labbook").focus();
});
$(".sb4").click(function (e) {
  e.preventDefault();
  let url = "";
  if ($(this).attr("data-id")) {
    url = "../labanswers/web/viewer.html#page=" + $(this).attr("data-id");
  } else {
    url = "../labanswers/web/viewer.html";
  }
  //redirect(url);
  window.open(url, "labanswers").focus();
});
$(".div1, .div6").click(function (e) {
  $(".div2, .div3, .div7").css("opacity", "1");
});
$(".div3, .div7").click(function (e) {
  $(".div4, .div5, .div8").css("opacity", "1");
});

window.onresize = function (event) {
  if ($(".accordion.active").length > 0) {
    $(".accordion.active").each(function () {
      // if ($(".accordion.active").next().find(".tabs").length > 0) {
      //   $($(".accordion.active").next().find(".tabs").find("input")[0]).trigger(
      //     "click"
      //   );
      // }
      if ($(this).next().children(".bodycontent").length > 0) {
        console.log($(this).next().children(".bodycontent")[0].scrollHeight);
        $(this)
          .next()
          .css(
            "max-height",
            $(this).next().children(".bodycontent")[0].scrollHeight + 50 + "px"
          );
      } else {
        $(this)
          .next()
          .css("max-height", $(this).next()[0].scrollHeight + 50 + "px");
      }
    });
  }
};
