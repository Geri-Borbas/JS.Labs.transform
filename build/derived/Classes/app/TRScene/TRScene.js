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


/**
 *
 * Created by Borbás Geri on 2/10/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


var Matrix3D = Class.extend
(


    // Instance methods.
    {
        m11 : 1, m12 : 0, m13 : 0, m14 : 0,
        m21 : 0, m22 : 1, m23 : 0, m24 : 0,
        m31 : 0, m32 : 0, m33 : 1, m34 : 0,
        m41 : 0, m42 : 0, m43 : 0, m44 : 1,

        map:
            [
                'm11', 'm12', 'm13', 'm14',
                'm21', 'm22', 'm23', 'm24',
                'm31', 'm32', 'm33', 'm34',
                'm41', 'm42', 'm43', 'm44'
            ],

        string: '',
        div: null,

        construct: function(array)
        {
            // Initialize with an array if any.
            if (array != null)
            {
                this.enumerateMap(function(eachSlot, index)
                { this[eachSlot] = array[index]; });
            }
        },

        /**
         * Updates to UI.
         */

            update: function()
            { this.string = this.toCSSString(); }, // Applies to `div` trough bindings.

            toCSSString: function()
            {
                return 'matrix3d('+
                    this.m11+', '+this.m21+', '+this.m31+', '+this.m41+', '+
                    this.m12+', '+this.m22+', '+this.m32+', '+this.m42+', '+
                    this.m13+', '+this.m23+', '+this.m33+', '+this.m43+', '+
                    this.m14+', '+this.m24+', '+this.m34+', '+this.m44+
                    ')';
            },

        /**
         * Translation.
         */

            translate: function(x, y, z)
            {
                this.m14 = x;
                this.m24 = y;
                this.m34 = z;
                this.update();
            },

            translateX: function(x)
            {
                this.m14 = x;
                this.update();
            },

            translateY: function(y)
            {
                this.m24 = y;
                this.update();
            },

            translateZ: function(z)
            {
                this.m24 = z;
                this.update();
            },

        /**
         * Rotation.
         */

            degrees: function(radians)
            { return radians * (180 / Math.PI); },

            radians: function(degrees)
            { return degrees * (Math.PI / 180); },

            rotateX: function(degrees)
            {
                radians = this.radians(degrees);
                sin = Math.sin(radians);
                cos = Math.cos(radians);

                this.m22 = cos;
                this.m23 = -sin;
                this.m32 = sin;
                this.m33 = cos;
                this.update();
            },

            rotateY: function(degrees)
            {
                radians = this.radians(degrees);
                sin = Math.sin(radians);
                cos = Math.cos(radians);

                this.m11 = cos;
                this.m13 = sin;
                this.m31 = -sin;
                this.m33 = cos;
                this.update();
            },

            rotateZ: function(degrees)
            {
                radians = this.radians(degrees);
                sin = Math.sin(radians);
                cos = Math.cos(radians);

                this.m11 = cos;
                this.m12 = -sin;
                this.m21 = sin;
                this.m22 = cos;
                this.update();
            },
    },


    // Class methods.
    {
        identy: function()
        { return new this(); }
    },


    // Bindings.
    {
        // Bind matrix string to `div`.
        'string' : [ 'div.style.webkitTransform', '%' ],
    }


);


var EPPZViewPropertyMap =
{
    'top'       : [ 'div.style.top', '%px' ],
    'left'      : [ 'div.style.left', '%px' ],
    'width'     : [ 'div.style.width', '%px' ],
    'height'    : [ 'div.style.height', '%px' ],
    'color'     : [ 'div.style.backgroundColor', '%' ],
    'image'     : [ 'div.style.backgroundImage', 'url(%)'],
    'overflow'  : [ 'div.style.overflow', '%'],
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
    overflow: 'hidden',

    matrix3D: null,

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

        this.matrix3D = Matrix3D.identy();

        this.build();
        this.addActions();
        this.update();

        this.matrix3D.div = this.div;
    },

    /**
     * UI
     */

        build: function()
        {
            // Create.
            var div = elementOfType('div');
            if (this.id != null) div.id = this.id;

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

        addActions: function()
        {
            this.div.onmouseover = this.mouseOver.bind(this);
            this.div.onmouseout = this.mouseOut.bind(this);

            this.div.onclick = this.onClick.bind(this);

            this.div.onmousedown = this.mouseDown.bind(this);
            this.div.onmousemove = this.mouseMove.bind(this);
            this.div.onmouseup = this.mouseUp.bind(this);
        },

        mouseOver: function(event)
        { return false; },

        mouseOut: function(event)
        {
        },

        onClick: function(event)
        {
        },

        mouseDown: function(event)
        {
        },

        mouseMove: function(event)
        {
        },

        mouseUp: function(event)
        {
        },

});
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


/**
 *
 * Created by Borbás Geri on 2/10/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


var Matrix3D = Class.extend
(


    // Instance methods.
    {
        m11 : 1, m12 : 0, m13 : 0, m14 : 0,
        m21 : 0, m22 : 1, m23 : 0, m24 : 0,
        m31 : 0, m32 : 0, m33 : 1, m34 : 0,
        m41 : 0, m42 : 0, m43 : 0, m44 : 1,

        map:
            [
                'm11', 'm12', 'm13', 'm14',
                'm21', 'm22', 'm23', 'm24',
                'm31', 'm32', 'm33', 'm34',
                'm41', 'm42', 'm43', 'm44'
            ],

        string: '',
        div: null,

        construct: function(array)
        {
            // Initialize with an array if any.
            if (array != null)
            {
                this.enumerateMap(function(eachSlot, index)
                { this[eachSlot] = array[index]; });
            }
        },

        /**
         * Updates to UI.
         */

            update: function()
            { this.string = this.toCSSString(); }, // Applies to `div` trough bindings.

            toCSSString: function()
            {
                return 'matrix3d('+
                    this.m11+', '+this.m21+', '+this.m31+', '+this.m41+', '+
                    this.m12+', '+this.m22+', '+this.m32+', '+this.m42+', '+
                    this.m13+', '+this.m23+', '+this.m33+', '+this.m43+', '+
                    this.m14+', '+this.m24+', '+this.m34+', '+this.m44+
                    ')';
            },

        /**
         * Translation.
         */

            translate: function(x, y, z)
            {
                this.m14 = x;
                this.m24 = y;
                this.m34 = z;
                this.update();
            },

            translateX: function(x)
            {
                this.m14 = x;
                this.update();
            },

            translateY: function(y)
            {
                this.m24 = y;
                this.update();
            },

            translateZ: function(z)
            {
                this.m24 = z;
                this.update();
            },

        /**
         * Rotation.
         */

            degrees: function(radians)
            { return radians * (180 / Math.PI); },

            radians: function(degrees)
            { return degrees * (Math.PI / 180); },

            rotateX: function(degrees)
            {
                radians = this.radians(degrees);
                sin = Math.sin(radians);
                cos = Math.cos(radians);

                this.m22 = cos;
                this.m23 = -sin;
                this.m32 = sin;
                this.m33 = cos;
                this.update();
            },

            rotateY: function(degrees)
            {
                radians = this.radians(degrees);
                sin = Math.sin(radians);
                cos = Math.cos(radians);

                this.m11 = cos;
                this.m13 = sin;
                this.m31 = -sin;
                this.m33 = cos;
                this.update();
            },

            rotateZ: function(degrees)
            {
                radians = this.radians(degrees);
                sin = Math.sin(radians);
                cos = Math.cos(radians);

                this.m11 = cos;
                this.m12 = -sin;
                this.m21 = sin;
                this.m22 = cos;
                this.update();
            },
    },


    // Class methods.
    {
        identy: function()
        { return new this(); }
    },


    // Bindings.
    {
        // Bind matrix string to `div`.
        'string' : [ 'div.style.webkitTransform', '%' ],
    }


);


var EPPZViewPropertyMap =
{
    'top'       : [ 'div.style.top', '%px' ],
    'left'      : [ 'div.style.left', '%px' ],
    'width'     : [ 'div.style.width', '%px' ],
    'height'    : [ 'div.style.height', '%px' ],
    'color'     : [ 'div.style.backgroundColor', '%' ],
    'image'     : [ 'div.style.backgroundImage', 'url(%)'],
    'overflow'  : [ 'div.style.overflow', '%'],
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
    overflow: 'hidden',

    matrix3D: null,

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

        this.matrix3D = Matrix3D.identy();

        this.build();
        this.addActions();
        this.update();

        this.matrix3D.div = this.div;
    },

    /**
     * UI
     */

        build: function()
        {
            // Create.
            var div = elementOfType('div');
            if (this.id != null) div.id = this.id;

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

        addActions: function()
        {
            this.div.onmouseover = this.mouseOver.bind(this);
            this.div.onmouseout = this.mouseOut.bind(this);

            this.div.onclick = this.onClick.bind(this);

            this.div.onmousedown = this.mouseDown.bind(this);
            this.div.onmousemove = this.mouseMove.bind(this);
            this.div.onmouseup = this.mouseUp.bind(this);
        },

        mouseOver: function(event)
        { return false; },

        mouseOut: function(event)
        {
        },

        onClick: function(event)
        {
        },

        mouseDown: function(event)
        {
        },

        mouseMove: function(event)
        {
        },

        mouseUp: function(event)
        {
        },

});


var TRView = EPPZView.extend
({
    className: 'TRView',

    top: 0,
    left: 0,
    width: 320,
    height: 568,

    color: "#339d84",

},{},EPPZViewPropertyMap);


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


var TRScene = EPPZView.extend
({
    className: 'TRScene',
    id: 'scene',

    width: 480,
    height: 880,

    color: "transparent",
    image: "assets/devices/device_iPhone_5S.png",

    // Outlets.
    screen: null, /** @type EPPZView */

    construct: function(id)
    {
        this.super.construct(id);

        // Add screen.
        this.screen = new TRScreenView();
        this.addSubview(this.screen);
    },


},{},EPPZViewPropertyMap);