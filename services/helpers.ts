import { Injectable } from '@angular/core';
import { deepObjectExtend } from './deepCopy';
import { environment } from '../../../environments/environment';

const doc: any = document;

@Injectable({
    providedIn: 'root'
})
export class Helpers {
    root: any = doc.body;
    deepObjectExtend:any = deepObjectExtend;

    /**
     *
     * @param selector
     * @param parent
     * @returns {Element}
     */
    qs (selector, parent = this.root) {
        return parent.querySelector(selector)
    }

    /**
     *
     * @param selectors
     * @param parent
     * @returns {NodeList}
     */
    qsa (selectors, parent = this.root) {
        return parent.querySelectorAll(selectors)
    }

    /**
     *
     * @param htmlString
     * @param src
     */
    wrap (htmlString, src) {
        let wrapper = this.createElement(htmlString);

        [...src.children].forEach(child => wrapper.appendChild(child));

        return wrapper
    }

    /**
     *
     * @param element
     * @returns {*}
     */
    findDeepest (element) {
        while(element.children.length > 0) {
            element = element.children[0]
        }

        return element
    }

    /**
     *
     * @param extended
     * @param src
     * @returns {{}}
     */
    extend (extended = {}, src) {
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                extended[prop] = src[prop]
            }
        }

        return extended
    }

    /**
     * Create Node element from given str;
     * @param str
     * @returns {HTMLElement}
     */
    createElement (str) {
        let holder = doc.createElement('div');
        holder.innerHTML = str;

        if (holder.children.length > 1) {
            let temp = doc.createElement('div');
            temp.appendChild(holder.children[0].cloneNode());

            console.info(`
                String must contain only the 1 wrapper, ${holder.children.length} given. ${temp.innerHTML} will be returned
            `)
        }

        return holder.children[0]
    }

    /**
     * I return crossbrowser matches function
     * @returns {*}
     */
    get matches () {
        return (doc.body.matchesSelector || doc.body.webkitMatchesSelector
            || doc.body.mozMatchesSelector || doc.body.msMatchesSelector
            || doc.body.webkitMatchesSelector || doc.body.matchesSelector);

    }

    /**
     *
     * @param el
     * @param selector
     * @returns {null}
     */
    findParent (el, selector) {

        let parent;

        const matchEl = () => {
            if ( typeof selector === 'string') {
                return this.matches.call(parent, selector)
            } else if ( selector instanceof HTMLElement ) {
                return parent === selector
            }
        };

        while(el) {
            parent = el.parentElement;

            if (parent && matchEl()) {
                return parent
            }

            el = parent;
        }




        return null

    }



    /**
     *
     * @param iterable
     * @param callback
     * @param {boolean} linkParent
     */
    recursive (iterable, callback, linkParent = true) {
        let stop;

        function breakRecursion () {
            stop = true;
        }

        recurse(iterable, callback);

        function recurse (iterable, callback, parent?) {
            if (Array.isArray(iterable) && !stop) {

                for (let i = 0; i < iterable.length; i++) {
                    recurse(iterable[i], callback);
                    if (parent && linkParent) {
                        iterable[i].parent = parent;
                    }
                }

            }

            if (toString.apply(iterable) === '[object Object]' && !stop) {

                if (typeof callback === 'function') {
                    callback.call(this, iterable, breakRecursion);
                }

                if (iterable.hasOwnProperty('children') && !stop) {
                    recurse(iterable.children, callback, iterable)
                }

            }
        }


    }

    getSelectedText () {
        let text = "";

        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (doc.selection && doc.selection.type != "Control") {
            text = doc.selection.createRange().text;
        }

        return text
    }

    /**
     *
     * @param text
     */
    copyToClipboard (text) {
        const input = doc.createElement('textarea');
        input.value = text;
        doc.body.appendChild(input);

        input.select();

        doc.execCommand('copy');

        input.parentNode.removeChild(input);
    }


    /**
     *
     * @param url
     */
    extractHostname (url) {
        let hostname;
        //find & remove protocol (http, ftp, etc.) and get the hostname
        if (url.indexOf("://") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }


        return hostname;
    }

    /**
     *
     * @param href
     * @returns {{host: (*|string), hostname: (*|string), protocol: (*|string), pathname: (*|string), origin: (*|string)}}
     */
    divideUrlOnParts (href) {
        const a: any = doc.createElement('a');
        a.href = href;

        return {
            host: a.hostname,
            hostname: a.hostname,
            protocol: a.protocol,
            pathname: a.pathname,
            origin: a.origin
        }
    }

    /**
     *
     * @param url
     * @param filename
     */
    public downloadFileByUrl(url, filename) {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', url);
        anchor.setAttribute('download', filename);
        document.body.appendChild(anchor);
        anchor.click();
    }

}
