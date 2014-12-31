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