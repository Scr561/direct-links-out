// ==UserScript==
// @name        Direct links out
// @name:ru     Прямые ссылки наружу
// @description Removes all "You are leaving our site" and redirection stuff from links in social networks
// @description:ru Убирает "Бла-бла-бла, Вы покидаете наш сайт" и переадресации из ссылок наружу из соц. сетей
// @namespace   https://github.com/nokeya
//deviantart
// @include     http://deviantart.com/*
// @include     https://deviantart.com/*
// @include     http://*.deviantart.com/*
// @include     https://*.deviantart.com/*
// @match       http://deviantart.com/*
// @match       https://deviantart.com/*
// @match       http://*.deviantart.com/*
// @match       https://*.deviantart.com/*
//joyreactor
// @include     http://joyreactor.cc/*
// @include     https://joyreactor.cc/*
// @include     http://reactor.cc/*
// @include     https://reactor.cc/*
// @include     http://*.joyreactor.cc/*
// @include     https://*.joyreactor.cc/*
// @include     http://*.reactor.cc/*
// @include     https://*.reactor.cc/*
// @match       http://joyreactor.cc/*
// @match       https://joyreactor.cc/*
// @match       http://reactor.cc/*
// @match       https://reactor.cc/*
// @match       http://*.joyreactor.cc/*
// @match       https://*.joyreactor.cc/*
// @match       http://*.reactor.cc/*
// @match       https://*.reactor.cc/*
//vk
// @include     http://vk.com/*
// @include     https://vk.com/*
// @include     http://m.vk.com/*
// @include     https://m.vk.com/*
// @match       http://vk.com/*
// @match       https://vk.com/*
// @match       http://m.vk.com/*
// @match       https://m.vk.com/*
//ok
// @include     http://ok.ru/*
// @include     https://ok.ru/*
// @include     http://*.ok.ru/*
// @include     https://*.ok.ru/*
// @match       http://ok.ru/*
// @match       https://ok.ru/*
// @match       http://*.ok.ru/*
// @match       https://*.ok.ru/*
//steam
// @include     http://steamcommunity.com/*
// @include     https://steamcommunity.com/*
// @include     http://*.steamcommunity.com/*
// @include     https://*.steamcommunity.com/*
// @match       http://steamcommunity.com/*
// @match       https://steamcommunity.com/*
// @match       http://*.steamcommunity.com/*
// @match       https://*.steamcommunity.com/*
//facebook
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @match       http://facebook.com/*
// @match       https://facebook.com/*
// @match       http://*.facebook.com/*
// @match       https://*.facebook.com/*
//twitter
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @include     http://*.twitter.com/*
// @include     https://*.twitter.com/*
// @match       http://twitter.com/*
// @match       https://twitter.com/*
// @match       http://*.twitter.com/*
// @match       https://*.twitter.com/*
//
// @update      https://github.com/nokeya/direct-links-out/raw/master/direct-links-out.user.js
// @icon        https://raw.githubusercontent.com/nokeya/direct-links-out/master/icon.png
// @version     1.5
// @grant       none
// ==/UserScript==
(function() {
    //
    var anchor;
    var after;
    //
    (function ()
    {
        if (window.location.hostname.indexOf('facebook') != -1) {
            anchor = 'u=';
            after = '&h=';
        }
        else if (window.location.hostname.indexOf('vk') != -1) {
            anchor = 'to=';
            after = '&post=';
        }
        else if (window.location.hostname.indexOf('ok') != -1) {
            anchor = 'st.link=';
            after = '&st.name=';
        }
        else if (window.location.hostname.indexOf('deviantart') != -1) {
            anchor = 'outgoing?';
        }
        else if (window.location.hostname.indexOf('reactor') != -1) {
            anchor = 'url=';
        }
        else if (window.location.hostname.indexOf('steam') != -1) {
            anchor = 'url=';
        }
    })();

    // rewrite outgoing link (if needed)
    function rewriteLink(link)
    {
        var ndx = link.href.indexOf(anchor);
        if (ndx != -1){
            link.href = unescape(link.href.substring(ndx + anchor.length));
            if (after){
                ndx = link.href.indexOf(after);
                if (ndx != -1){
                    link.href = link.href.substring(0, ndx);
                }
            }
        }
    }

    // rewrites all links in document
    function rewriteAllLinks()
    {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; ++i){
            rewriteLink(links[i]);
        }
    }

    function rewriteLinksTwitter(){
        var links = document.getElementsByClassName('twitter-timeline-link');
        for (var i = 0; i < links.length; ++i)
        {
            if (links[i].hasAttribute('data-expanded-url')){
                links[i].href = links[i].getAttribute('data-expanded-url');
                links[i].removeAttribute('data-expanded-url');
            }
        }
    }
    //TODO: find better solution
    function removeMouseIntercept(){
        if (window.location.hostname.indexOf('facebook') != -1) {
            LinkshimAsyncLink.swap = function() {};
            LinkshimAsyncLink.referrer_log = function() {};
        }
    }
    function makeDirect() {
        if (window.location.hostname.indexOf('facebook') != -1) {
            rewriteAllLinks();
            removeMouseIntercept();
        }
        else if (window.location.hostname.indexOf('twitter') != -1) {
            rewriteLinksTwitter();
        }
        else
            rewriteAllLinks();
    }
    document.addEventListener('DOMNodeInserted', makeDirect, true);
    makeDirect();
})();
