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

    'defaultPerspective' : 10000,
    'maxPerspective' : 10000,

    'defaultRotate' : 0,
    'maxRotate' : 360,

    'defaultTranslate' : 0,
    'maxTranslate' : 450,

    'defaultOrigin' : 50,
    'maxOrigin' : 100
};


var defaultPropertyControls =
[
    {
        'key' : 'widthControl',
        'name' : 'width',
        'unit' : 'px',
        'url' : 'http://www.w3schools.com/cssref/pr_dim_width.asp',
        'title' : 'The width property sets the width of an element.',
        'min' : 0, 'max' : Defaults.maxWidth, 'value' : Defaults.defaultWidth,
        'delegate' : null
    },

    {
        'key' : 'heightControl',
        'name' : 'height',
        'unit' : 'px',
        'url' : 'http://www.w3schools.com/cssref/pr_dim_height.asp',
        'title' : 'The height property sets the height of an element.',
        'min' : 0, 'max' : Defaults.maxHeight, 'value' : Defaults.defaultHeight,
        'delegate' : null
    },

    {
        'key' : 'topControl',
        'name' : 'top',
        'unit' : 'px',
        'url' : 'http://www.w3schools.com/cssref/pr_pos_top.asp',
        'title' : 'For absolutely positioned elements, the top property sets the top edge of an element to a unit above/below the top edge of its containing element. For relatively positioned elements, the top property sets the top edge of an element to a unit above/below its normal position.',
        'min' : 0, 'max' : Defaults.maxTop, 'value' : Defaults.defaultTop,
        'delegate' : null
    },

    {
        'key' : 'leftControl',
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
            'key' : 'perspectiveControl',
            'name' : 'perspective',
            'unit' : '',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a perspective view for a 3D transformed element',
            'min' : 0, 'max' : Defaults.maxPerspective, 'value' : Defaults.defaultPerspective,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'key' : 'rotateXControl',
            'name' : 'rotateX',
            'unit' : 'deg',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a 3D rotation along the X-axis.',
            'min' : 0, 'max' : Defaults.maxRotate, 'value' : Defaults.defaultRotate,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'key' : 'rotateYControl',
            'name' : 'rotateY',
            'unit' : 'deg',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a 3D rotation along the Y-axis.',
            'min' : 0, 'max' : Defaults.maxRotate, 'value' : Defaults.defaultRotate,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'key' : 'rotateZControl',
            'name' : 'rotateZ',
            'unit' : 'deg',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a 3D rotation along the Z-axis.',
            'min' : 0, 'max' : Defaults.maxRotate, 'value' : Defaults.defaultRotate,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'key' : 'translateXControl',
            'name' : 'translateX',
            'unit' : 'px',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a translation, using only the value for the X-axis.',
            'min' : 0, 'max' : Defaults.maxTranslate, 'value' : Defaults.defaultTranslate,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'key' : 'translateYControl',
            'name' : 'translateY',
            'unit' : 'px',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a translation, using only the value for the X-axis.',
            'min' : 0, 'max' : Defaults.maxTranslate, 'value' : Defaults.defaultTranslate,
            'className' : 'TransformValueControl',
            'delegate' : null
        },

        {
            'key' : 'translateZControl',
            'name' : 'translateZ',
            'unit' : 'px',
            'url' : 'http://www.w3schools.com/css3/css3_3dtransforms.asp',
            'title' : 'Defines a 3D translation, using only the value for the Z-axis.',
            'min' : 0, 'max' : Defaults.maxTranslate, 'value' : Defaults.defaultTranslate,
            'className' : 'TransformValueControl',
            'delegate' : null
        }
    ],

    '-webkit-transform-origin' :
        [

            {
                'key' : 'originXControl',
                'name' : 'originX',
                'unit' : '%',
                'url' : 'http://www.w3schools.com/cssref/css3_pr_transform-origin.asp',
                'title' : "Set a rotated element's base placement.",
                'min' : 0, 'max' : Defaults.maxOrigin, 'value' : Defaults.defaultOrigin,
                'className' : 'PercentValueControl',
                'delegate' : null
            },

            {
                'key' : 'originYControl',
                'name' : 'originY',
                'unit' : '%',
                'url' : 'http://www.w3schools.com/cssref/css3_pr_transform-origin.asp',
                'title' : "Set a rotated element's base placement.",
                'min' : 0, 'max' : Defaults.maxOrigin, 'value' : Defaults.defaultOrigin,
                'className' : 'PercentValueControl',
                'delegate' : null
            }
        ]

};
