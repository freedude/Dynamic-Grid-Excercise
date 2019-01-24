import $ from 'jquery';
import Ajax from './lib/xhr.js';

const defaultAjaxErr = 'We\'re Sorry, but Something has gone wrong. Please try again shortly.';

$("#testimonial-button").click(()=> {
    
    setTimeout(() => {
        const url = `http://api.icndb.com/jokes/random`;
        const req = new Ajax({
            url
        });
        req.onEvent('progress', val => onAjaxProgress(val));
        req.onEvent('success', data => onAjaxSuccess(data));
        req.onEvent('error', err => onAjaxError(err));
    }, 150);

});

// XHR Callbacks
const onAjaxError = (err, msg = defaultAjaxErr) => {
    $(".quote").html(msg);
};
const onAjaxSuccess = data => {
    const body = JSON.parse(data.response);
    console.log("DATA" + data.response);
    if (body.type !== 'success') {
        onAjaxError(null);
        return false;
    }

    $(".quote").html(body.value.joke);
    $(".category").text("Chuck Norris Jokes");
    

};
const onAjaxProgress = progress => {
    console.log("loading");
    let percentComplete = null;
    if (progress.lengthComputable) {
        percentComplete = Math.floor(progress.loaded / progress.total);
    } else {
        percentComplete = 0.85;
    }

};

