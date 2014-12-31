/**
 *
 * Created by Borbás Geri on 2/11/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


var EPPZSliderTrack = EPPZView.extend
({ className: 'EPPZSliderTrack' },{},EPPZViewPropertyMap);

var EPPZSliderKnob = EPPZView.extend
({
    className: 'EPPZSliderKnob',
    left: 0,
},{},EPPZViewPropertyMap);

var EPPZSlider = EPPZView.extend
({

    className: 'EPPZSlider',

    // Defaults.
    width: 300,
    height: 40,

    // Attributes.
    tint: 'white',

    // States.
    dragged: false,

    // Outlets.
    minimumTrack: null,
    maximumTrack: null,
    knob: null,

    construct: function()
    {
        log('Bilde.'+this.tint);
        this.super.construct();
    },

    build: function()
    {
        this.super.build();

        this.minimumTrack = new EPPZSliderTrack();
        this.maximumTrack = new EPPZSliderTrack();
        this.knob = new EPPZSliderKnob();

        this.addSubview(this.minimumTrack);
        this.addSubview(this.maximumTrack);
        this.addSubview(this.knob);
    },

    mouseDown: function(event)
    {
        log(event);
        if (event.srcElement == this.knob.div)
        {
            this.dragged = true;
            log(this.dragged);
        }
    },

    mouseMove: function(event)
    {
        if (this.dragged)
        {
            this.knob.left = event.layerX;
        }
    },

    mouseUp: function(event)
    {
        this.dragged = false;
    }

},{},EPPZViewPropertyMap);