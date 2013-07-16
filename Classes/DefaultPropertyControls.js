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

var Defaults =
{
    'defaultHeight' : 450,
    'maxHeight': 450,

    'defaultWidth' : 450,
    'maxWidth': 450,

    'defaultTop' : 20,
    'maxTop' : 450,

    'defaultLeft' : 20,
    'maxLeft' : 450,

    'defaultRotate' : 0,
    'maxRotate' : 1.0
};


var defaultPropertyControls =
[

    {
        'keyPath' : 'widthControl',
        'name' : 'width',
        'unit' : 'px',
        'url' : 'http://www.w3schools.com/cssref/pr_dim_width.asp',
        'title' : 'The width property sets the width of an element.',
        'min' : 0, 'max' : Defaults.maxWidth, 'value' : Defaults.defaultWidth,
        'delegate' : null
    },

    {
        'keyPath' : 'heightControl',
        'name' : 'height',
        'unit' : 'px',
        'url' : 'http://www.w3schools.com/cssref/pr_dim_height.asp',
        'title' : 'The height property sets the height of an element.',
        'min' : 0, 'max' : Defaults.maxHeight, 'value' : Defaults.defaultHeight,
        'delegate' : null
    },

    {
        'keyPath' : 'topControl',
        'name' : 'top',
        'unit' : 'px',
        'url' : 'http://www.w3schools.com/cssref/pr_pos_top.asp',
        'title' : 'For absolutely positioned elements, the top property sets the top edge of an element to a unit above/below the top edge of its containing element. For relatively positioned elements, the top property sets the top edge of an element to a unit above/below its normal position.',
        'min' : 0, 'max' : Defaults.maxTop, 'value' : Defaults.defaultTop,
        'delegate' : null
    },

    {
        'keyPath' : 'leftControl',
        'name' : 'left',
        'unit' : 'px',
        'url' : 'http://www.w3schools.com/cssref/pr_pos_left.asp',
        'title' : 'For absolutely positioned elements, the left property sets the left edge of an element to a unit to the left/right of the left edge of its containing element. For relatively positioned elements, the left property sets the left edge of an element to a unit to the left/right to its normal position.',
        'min' : 0, 'max' : Defaults.maxLeft, 'value' : Defaults.defaultLeft,
        'delegate' : null
    },

];

var defaultPropertyValueControls =
{
    '-webkit-transform' :
    [
        {
            'keyPath' : '-webkit-transform.rotateXControl',
            'name' : 'rotateX',
            'unit' : '',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a 3D rotation along the X-axis.',
            'min' : 0, 'max' : Defaults.maxRotate, 'value' : Defaults.defaultRotate, 'step' : 0.01,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'keyPath' : '-webkit-transform.rotateYControl',
            'name' : 'rotateY',
            'unit' : '',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a 3D rotation along the Y-axis.',
            'min' : 0, 'max' : Defaults.maxRotate, 'value' : Defaults.defaultRotate, 'step' : 0.01,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'keyPath' : '-webkit-transform.rotateZControl',
            'name' : 'rotateZ',
            'unit' : '',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a 3D rotation along the Z-axis.',
            'min' : 0, 'max' : Defaults.maxRotate, 'value' : Defaults.defaultRotate, 'step' : 0.01,
            'className' : 'TransformValueControl',
            'delegate' : null
        }
    ]

};
