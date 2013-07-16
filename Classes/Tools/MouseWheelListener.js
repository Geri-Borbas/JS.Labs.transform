/**
 *
 * Created by Borbás Geri on 7/6/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var MouseWheelListener = Class.extend
({
    construct: function(callback)
    {
        //Stick the handler to document element.
        document.callback = callback;

        if (document.addEventListener)
        {
            //IE9, Chrome, Safari, Opera.
            document.addEventListener("mousewheel", this.MouseWheelHandler, false);
            //Firefox.
            document.addEventListener("DOMMouseScroll", this.MouseWheelHandler, false);
        }
        //IE 6/7/8.
        else document.attachEvent("onmousewheel", this.MouseWheelHandler);
    },

    MouseWheelHandler: function(event)
    {
        //Cross-browser wheel delta.
        var event = window.event || event; //Old IE support.
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        //Invoke callback.
        document.callback(delta);

        return false;
    }
});