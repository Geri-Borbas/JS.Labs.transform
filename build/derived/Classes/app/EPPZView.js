/**
 *
 * Created by Borbás Geri on 2/8/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var EPPZViewPropertyMap =
{
    'top'       : [ 'div.style.top', '%px' ],
    'left'      : [ 'div.style.left', '%px' ],
    'width'     : [ 'div.style.width', '%px' ],
    'height'    : [ 'div.style.height', '%px' ],
    'color'     : [ 'div.style.backgroundColor', '%' ],
    'image'     : [ 'div.style.backgroundImage', 'url(%)'],
};

var EPPZView = Class.extend
({
    className: 'EPPZView',

    // Model.
    id: '',

    // Attributes.
    top: 0,
    left: 0,
    widht: 0,
    height: 0,
    color: 'black',
    image: null,

    // Outlets.
    div: null,
    superview: null,
    subviews: [],

    /**
     * @param id The controlled <div>'s id.
     */
    construct: function(id)
    {
        // Model.
        this.id = id;
        this.subviews = [];

        this.build();
        this.update();
    },

    /**
     * UI
     */

    build: function()
    {
        // Create.
        var div = elementOfType('div');
        div.id = this.id;

        div.className = this.className;

        // Styles.
        div.style.position = 'absolute';
        div.style.backgroundColor = this.color;

        if (this.image)
        { div.style.backgroundImage = 'url('+this.image+')'; }

        // Set.
        this.div = div;
        this.div.view = this;
    },

    update: function()
    {
    },

    /**
     * Composition
     */

    addToBody: function(element)
    {
        document.body.appendChild(this.div);
    },

    addSubview: function(view)
    {
        // Model.
        this.subviews.push(view);
        view.superview = this;

        // UI.
        this.div.appendChild(view.div);
    },

    /**
     * Interactions
     */

    touchedDown: function()
    {
    },

    touchMoved: function()
    {
    },

    touchedUp: function()
    {
    },

});