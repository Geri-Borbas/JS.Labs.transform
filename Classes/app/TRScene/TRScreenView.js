/**
 *
 * Created by Borbás Geri on 2/9/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


include('TRView.js');


var TRScreenView = EPPZView.extend
({
    className: 'TRScreenView',

    top: 160,
    left: 80,
    width: 320,
    height: 568,
    overflow: 'hidden',

    color: "transparent",

    // Outlets.
    a: null, /** @type EPPZView */
    b: null, /** @type EPPZView */

    construct: function()
    {
        this.super.construct('screen');

        // Add views.
        this.a = new TRView('a');
        this.b = new TRView('b');
        this.b.color = "teal";

        this.addSubview(this.a);
        this.addSubview(this.b);
    },

    mouseMove: function(event)
    {
        // Location.
        x = event.layerX;
        y = event.layerY;

        // To matrices of the views.
        this.a.matrix3D.rotateY(x);
        this.b.matrix3D.rotateZ(x);
    }

},{},EPPZViewPropertyMap);