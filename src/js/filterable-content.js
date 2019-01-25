import $ from "jquery";
import Isotope from "isotope-layout";

/* eslint-disable no-undef */
const data = require("./data/data.json");
let showGenreDropdown = true;
let showYearDropdown = true;

let filterReady = false;
let iso = null;

// Async function
export const getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.media);
        }, 1500);
    });
};

export const initialize = data => {
    
    // console.log("Initialize data" + JSON.stringify(data));
    const $dataGrid = $("#data-grid");
    
    // Load grid images from data file
    $dataGrid.html(getMediaGrid(data))
        .on("itemsready", () => onMediaGridReady($dataGrid))
        .find("img[data-src]")
        .each((i, item) => loadImage(i, item, $dataGrid, data.length));
};


const loadImage = (index, image, $grid, max) => {
    const $this = $(image);

    const dispatchReady = () => {
        if ((index + 1) === max) {
            $grid.trigger("itemsready");
        }
    };
    const load = () => {
        dispatchReady();
    };
    const error = () => {
        $this.addClass("is-error");
        dispatchReady();
    };
    $(image).on({
        load,
        error
    }).attr({
        src: $this.data("src")
    });
};

const getMediaGrid = (media, html = ``) => {
    media.forEach(item => html += getMediaItem(item));
    return html;
};

// Set up block for image to be loaded into
const getMediaItem = (info) => {

    
    $(".fc-choice--dropdown.genre").append("<option>" + info.genre.join(", ") + "</option>");
    $(".fc-choice--dropdown.year").append("<option>" + info.year + "</option>");
  
    return `<li class="fc-mediaitem" data-genre="${info.genre.join(", ")}" data-year="${info.year}" data-mediatype="${info.type}">
            <span class="fc-mediaitem--img">
              <img data-src="${info.poster}" alt="${info.title} Movie Poster">
            </span>
            <div class="fc-mediaitem--info">
              <h3>${info.title} <span>(${info.year})</span></h3>
              <h3>Genres: ${info.genre} </h3>
            </div>
         </li>`;
         
};


const onMediaGridReady = ($grid) => {

    iso = new Isotope($grid[0], {
        itemSelector: ".fc-mediaitem",
        getSortData: {
            // Sort Alphabetically
            mediaTitle: function (el) {
                const text = $(el).find("h3").text().toLowerCase();
                return text.replace(/the|a/, "").trim();
            }
        },
        sortBy: "mediaTitle",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.8)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        },
        transitionDuration: 300
    });
    
    setTimeout(() => {
        iso.layout();
        filterReady = true;
    }, 300);
};

// Radio Buttons
$("#movies-radio").click(function () {
    $("[data-mediatype=\"movie\"]").css("display", "block");
    $("[data-mediatype=\"book\"]").css("display", "none");
});

$("#books-radio").click(function () {
    $("[data-mediatype=\"book\"]").css("display", "block");
    $("[data-mediatype=\"movie\"]").css("display", "none");
});

$("#clear-filter").click(function () {
    $("#books-radio").prop("checked", false);
    $("#movies-radio").prop("checked", false);

    $("[data-mediatype=\"book\"]").css("display", "block");
    $("[data-mediatype=\"movie\"]").css("display", "block");
});


// Genre Dropdown
$(".genre").click(() => {

    if (showGenreDropdown){
        $(".fc-choice--dropdown.genre").css("display", "block");
        showGenreDropdown = false;
    } else {
        $(".fc-choice--dropdown.genre").css("display", "none");
        showGenreDropdown = true;
    }

    console.log("dropdown"+showGenreDropdown);
    
});

// Year Dropdown
$(".year").click(() => {

    if (showYearDropdown) {
        $(".fc-choice--dropdown.year").css("display", "block");
        showYearDropdown = false;
    } else {
        $(".fc-choice--dropdown.year").css("display", "none");
        showYearDropdown = true;
    }


});

