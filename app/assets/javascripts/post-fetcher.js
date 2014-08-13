/*********************************************************************
*  #### Twitter Post Fetcher v11.0 ####
*  Coded by Jason Mayes 2013. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here: 
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/


var twitterFetcher = function() {
    function v(a) {
        return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, f) {
            return f
        }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
    }

    function l(a, c) {
        for (var f = [], g = new RegExp("(^| )" + c + "( |$)"), b = a.getElementsByTagName("*"), h = 0, e = b.length; h < e; h++) g.test(b[h].className) && f.push(b[h]);
        return f
    }
    var w = "",
        k = 20,
        x = !0,
        m = [],
        q = !1,
        n = !0,
        p = !0,
        r = null,
        s = !0,
        y = !0,
        t = null,
        z = !0;
    return {
        fetch: function(a) {
            void 0 === a.maxTweets && (a.maxTweets = 20);
            void 0 === a.enableLinks && (a.enableLinks = !0);
            void 0 === a.showUser && (a.showUser = !0);
            void 0 === a.showTime && (a.showTime = !0);
            void 0 === a.dateFunction && (a.dateFunction = "default");
            void 0 === a.showRetweet && (a.showRetweet = !0);
            void 0 === a.customCallback && (a.customCallback = null);
            void 0 === a.showInteraction && (a.showInteraction = !0);
            if (q) m.push(a);
            else {
                q = !0;
                w = a.domId;
                k = a.maxTweets;
                x = a.enableLinks;
                p = a.showUser;
                n = a.showTime;
                y = a.showRetweet;
                r = a.dateFunction;
                t = a.customCallback;
                z = a.showInteraction;
                var c = document.createElement("script");
                c.type = "text/javascript";
                c.src = "//cdn.syndication.twimg.com/widgets/timelines/" + a.id + "?&lang=" + (a.lang || "en") + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random();
                document.getElementsByTagName("head")[0].appendChild(c)
            }
        },
        callback: function(a) {
            var c = document.createElement("div");
            c.innerHTML = a.body;
            "undefined" === typeof c.getElementsByClassName && (s = !1);
            a = [];
            var f = [],
                g = [],
                b = [],
                h = [],
                e = 0;
            if (s)
                for (c = c.getElementsByClassName("tweet"); e < c.length;) {
                    0 < c[e].getElementsByClassName("retweet-credit").length ?
                        b.push(!0) : b.push(!1);
                    if (!b[e] || b[e] && y) a.push(c[e].getElementsByClassName("e-entry-title")[0]), h.push(c[e].getAttribute("data-tweet-id")), f.push(c[e].getElementsByClassName("p-author")[0]), g.push(c[e].getElementsByClassName("dt-updated")[0]);
                    e++
                } else
                    for (c = l(c, "tweet"); e < c.length;) a.push(l(c[e], "e-entry-title")[0]), h.push(c[e].getAttribute("data-tweet-id")), f.push(l(c[e], "p-author")[0]), g.push(l(c[e], "dt-updated")[0]), 0 < l(c[e], "retweet-credit").length ? b.push(!0) : b.push(!1), e++;
            a.length > k && (a.splice(k,
                a.length - k), f.splice(k, f.length - k), g.splice(k, g.length - k), b.splice(k, b.length - k));
            c = [];
            e = a.length;
            for (b = 0; b < e;) {
                if ("string" !== typeof r) {
                    var d = new Date(g[b].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                        d = r(d);
                    g[b].setAttribute("aria-label", d);
                    if (a[b].innerText)
                        if (s) g[b].innerText = d;
                        else {
                            var u = document.createElement("p"),
                                A = document.createTextNode(d);
                            u.appendChild(A);
                            u.setAttribute("aria-label", d);
                            g[b] = u
                        } else g[b].textContent = d
                }
                d = "";
                x ? (p && (d += '<div class="user">' + v(f[b].innerHTML) +
                    "</div>"), d += '<p class="tweet">' + v(a[b].innerHTML) + "</p>", n && (d += '<p class="timePosted">' + g[b].getAttribute("aria-label") + "</p>")) : a[b].innerText ? (p && (d += '<p class="user">' + f[b].innerText + "</p>"), d += '<p class="tweet">' + a[b].innerText + "</p>", n && (d += '<p class="timePosted">' + g[b].innerText + "</p>")) : (p && (d += '<p class="user">' + f[b].textContent + "</p>"), d += '<p class="tweet">' + a[b].textContent + "</p>", n && (d += '<p class="timePosted">' + g[b].textContent + "</p>"));
                z && (d += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' +
                    h[b] + '" class="twitter_reply_icon">Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + h[b] + '" class="twitter_retweet_icon">Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + h[b] + '" class="twitter_fav_icon">Favorite</a></p>');
                c.push(d);
                b++
            }
            if (null === t) {
                a = c.length;
                f = 0;
                g = document.getElementById(w);
                for (h = "<ul>"; f < a;) h += "<li>" + c[f] + "</li>", f++;
                g.innerHTML = h + "</ul>"
            } else t(c);
            q = !1;
            0 < m.length && (twitterFetcher.fetch(m[0]), m.splice(0, 1))
        }
    }
}();
/*
* ### HOW TO CREATE A VALID ID TO USE: ###
* Go to www.twitter.com and sign in as normal, go to your settings page.
* Go to "Widgets" on the left hand side.
* Create a new widget for what you need eg "user time line" or "search" etc.
* Feel free to check "exclude replies" if you don't want replies in results.
* Now go back to settings page, and then go back to widgets page, you should
* see the widget you just created. Click edit.
* Now look at the URL in your web browser, you will see a long number like this:
* 345735908357048478
* Use this as your ID below instead!
*/

/**
 * How to use TwitterFetcher's fetch function:
 * @param {Object} An object containing at minimum the following two properties:
 * id {string} The ID of the Twitter widget you wish to grab data from
 *    (see above for how to generate this number).
 * domId {string} The ID of the DOM element you want to write results to.
 *
 * You may then also specify the following (case sensitive) properties if you
 * desire:
 *
 * maxTweets {int} Optional - the maximum number of tweets you want returned.
 *     Must be a number between 1 and 20.
 * enableLinks {boolean} Optional - set true if you want urls and hash tags to
 *     be hyperlinked!
 * showUser {boolean} Optional - Set false if you don't want user photo / name
 *     for tweet to show.
 * showTime {boolean} Optional - Set false if you don't want time of tweet
 *     to show.
 * dateFunction {function/string} Optional - A function you can specify to 
 *     format tweet date/time however you like. This function takes a JavaScript
 *     date as a parameter and returns a String representation of that date.
 * showRetweet {boolean} Optional - Show retweets or not. Set false to not show.
 * customCallback {function/string} Optional - A function to call when data is
 *     ready. It also passes the data to this function should you wish to
 *     manipulate it yourself before outputting. If you specify this parameter
 *     you must output data yourself!
 * showInteraction {boolean} Optional - Show links for reply, retweet,
 *     favourite. Set false to not show.
 */

// ##### Simple example 1 #####
// A simple example to get my latest tweet and write to a HTML element with
// id "tweets". Also automatically hyperlinks URLS and user mentions and
// hashtags.
var config1 = {
  "id": '345170787868762112',
  "domId": 'example1',
  "maxTweets": 1,
  "enableLinks": true
};
twitterFetcher.fetch(config1);


// ##### Simple example 2 #####
// A simple example to get my latest 5 of my favourite tweets and write to a
// HTML element with id "talk". Also automatically hyperlinks URLS and user
// mentions and hashtags but does not display time of post. We also make the
// request to Twitter specifiying we would like results where possible in
// English language (eg for Twitter phrases like "posted on" or "time ago").
var config2 = {
  "id": '347099293930377217',
  "domId": 'example2',
  "maxTweets": 5,
  "enableLinks": true, 
  "showUser": true,
  "showTime": true,
  "lang": 'en'
};
twitterFetcher.fetch(config2);


// ##### Advanced example #####
// An advance example to get latest 5 posts using hashtag #API and write to a
// HTML element with id "tweets2" without showing user details and using a
// custom format to display the date/time of the post, and does not show
// retweets.
var config3 = {
  "id": '345690956013633536',
  "domId": 'example3',
  "maxTweets": 3,
  "enableLinks": true,
  "showUser": false,
  "showTime": true,
  "dateFunction": dateFormatter,
  "showRetweet": false
};

// For advanced example which allows you to customize how tweet time is
// formatted you simply define a function which takes a JavaScript date as a
// parameter and returns a string!
// See http://www.w3schools.com/jsref/jsref_obj_date.asp for properties
// of a Date object.
function dateFormatter(date) {
  return date.toTimeString();
}

twitterFetcher.fetch(config3);


// ##### Advanced example 2 #####
// Similar as previous, except this time we pass a custom function to render the
// tweets ourself! Useful if you need to know exactly when data has returned or
// if you need full control over the output.

var config4 = {
  "id": '345690956013633536',
  "domId": '',
  "maxTweets": 3,
  "enableLinks": true, 
  "showUser": true,
  "showTime": true,
  "dateFunction": '',
  "showRetweet": false,
  "customCallback": handleTweets,
  "showInteraction": false
};

function handleTweets(tweets){
    var x = tweets.length;
    var n = 0;
    var element = document.getElementById('example4');
    var html = '<ul>';
    while(n < x) {
      html += '<li>' + tweets[n] + '</li>';
      n++;
    }
    html += '</ul>';
    element.innerHTML = html;
}

twitterFetcher.fetch(config4);
