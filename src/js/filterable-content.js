import $ from 'jquery';
import Isotope from 'isotope-layout';

const data = require('./data/data.json');

let filterReady = false;
let iso = null;

// Async function
export const getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.media);
            console.log("getData happened");
            console.log(data.media);
        }, 1500);
    });
};

export const initialize = data => {
    console.log("initialize happened");
    console.log("initialize happened data" + JSON.stringify(data));

    const $dataGrid = $('#data-grid');
   
    $dataGrid.html(getMediaGrid(data))
        .on('itemsready', () => onMediaGridReady($dataGrid))
        .find('img[data-src]')
        .each((i, item) => loadImage(i, item, $dataGrid, data.length));

};

const loadImage = (index, image, $grid, max) => {
    const $this = $(image);

    const dispatchReady = () => {
        if ((index + 1) === max) {
            $grid.trigger('itemsready');
        }
    };
    const load = () => {
        dispatchReady();
    };
    const error = () => {
        $this.addClass('is-error');
        dispatchReady();
    };
    $(image).on({
        load,
        error
    }).attr({
        src: $this.data('src')
    });
};

const getMediaGrid = (media, html = ``) => {
    console.log("getMediaGrid happened");
    console.log("getMediaGrid HTML" + html);
    media.forEach(item => html += getMediaItem(item));
    
    return html;
};


const getMediaItem = (info) => {
    
    return `<li class="fc-mediaitem" data-genre="${info.genre.join(', ')}" data-year="${info.year}" data-mediatype="${info.type}">
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
        itemSelector: '.fc-mediaitem',
        getSortData: {
            // Sort Alphabetically
            mediaTitle: function (el) {
                const text = $(el).find('h3').text().toLowerCase();
                return text.replace(/the|a/, '').trim();
            }
        },
        sortBy: 'mediaTitle',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.8)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },
        transitionDuration: 300
    });
    
    setTimeout(() => {
        iso.layout();
        filterReady = true;
    }, 300);
};






