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


//Debug helper.
debugging = true;
function log(message)
{ if (debugging) console.log(message); }

function sender(event)
{
    var target;
    if (!event) var event = window.event;
    if (event.target) target = event.target;
    else if (event.srcElement) target = event.srcElement;
    if (target.nodeType == 3) target = target.parentNode; //Defeat Safari bug.
    return target;
}

//Lovely Point object.
var Point = Class.extend
({
    construct: function(first, second)
    {
        //Construct with another point.
        if (typeof(first) == "object" && first != null)
        {
            this.x = first.x;
            this.y = first.y;
            return;
        }

        //Construct with coordinates.
        this.x = first || 0;
        this.y = second || 0;
    },

    //Debug.
    stringValue: function()
    {
        return '['+this.x+','+this.y+']';
    }
});

Object.prototype.setValueForKeyPath_ = function(value, keyPath)
{
    dot = (keyPath == null || keyPath == '') ? '' : '.';
    var statement = 'this'+dot+keyPath+'=value;';
    eval(statement);
}

Object.prototype.valueForKeyPath_ = function(keyPath)
{
    dot = (keyPath == null || keyPath == '') ? '' : '.';
    var statement = 'this'+dot+keyPath;
    return eval(statement);
}

Object.prototype.setValueForKeyPath = function(value, keyPath)
{
    if (keyPath == null || keyPath == '') return;
    var path = keyPath.replace('.', '"]["');
    var statement = 'this["'+path+'"]=value;';
    log('eval('+statement+')');
    eval(statement);
}

Object.prototype.valueForKeyPath = function(keyPath)
{
    if (keyPath == null || keyPath == '') return;
    var path = keyPath.replace('.', '"]["');
    var statement = 'this["'+path+'"]';
    log('eval('+statement+')');
    return eval(statement);
}

Object.prototype.enumerate = function(callback)
{
    for (eachKey in this)
    {
        eachValue = this[eachKey];
        if (typeof(eachValue) != "function") //Exclude the KVC functions added above
            callback(eachValue, eachKey);
    }
}

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

/**
 *
 * Created by Borbás Geri on 7/16/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var TRPropertyControl = Class.extend
({

    //Creation.

        construct: function(parameters, parentPropertyName)
        {
            //Save (and some default values).
            this.parentPropertyName = parentPropertyName || '';
            var dot = (parentPropertyName) ? '.' : '';
            this.key = parameters['key'];
            this.keyPath = this.parentPropertyName+dot+this.key;

            this.name = parameters['name'];
            this.unit = parameters['unit'];
            this.url = parameters['url'];
            this.title = parameters['title'];
            this.min = parameters['min'];
            this.max = parameters['max'];
            this.step = parameters['step'] || 1;
            this.value = parameters['value'];
            this.delegate = parameters['delegate'];

            //Create HTML element.
            this.valueTextField = null;
            this.element = this.createElement();
        },

        createElement: function()
        {
            //Configure.
            var div = document.createElement('div');
                div.className = 'variable';

            var propertyNameWrapper = document.createElement('a');
                propertyNameWrapper.href = this.url;
                propertyNameWrapper.title = this.title;
                propertyNameWrapper.target = '_blank';

                var nameLabel = document.createElement('label');
                    nameLabel.className = 'name';
                    nameLabel.innerHTML = this.name;

                    this.slider = document.createElement('input');
                    this.slider.id = this.name+'Slider';
                    this.slider.className = 'range';
                    this.slider.type = 'range';
                    this.slider.min = this.min;
                    this.slider.max = this.max;
                    this.slider.step = this.step;
                    this.slider.value = this.value;

                    //Events, reference to control object.
                    this.slider.onchange = this.sliderValueChanged.bind(this);
                    this.slider.onmouseup = this.sliderReleased.bind(this);
                    this.slider.dataset.keyPath = this.keyPath;

                    this.valueTextField = document.createElement('input');
                    this.valueTextField.id = this.name+'ValueTextField';
                    this.valueTextField.className = 'value';
                    this.valueTextField.value = this.value;

                    //Events, reference to control object.
                    this.valueTextField.onchange = this.valueTextField.onkeydown = this.valueTextField.onkeyup =
                    this.textFieldValueChanged.bind(this);

                    this.valueTextField.dataset.keyPath = this.keyPath;


            var unitLabel = document.createElement('label');
                unitLabel.className = 'unit';
                unitLabel.innerHTML = this.unit;

            //Assemble.
            div.appendChild(propertyNameWrapper);
                propertyNameWrapper.appendChild(nameLabel);
            div.appendChild(this.slider);
            div.appendChild(this.valueTextField);
            div.appendChild(unitLabel);

            return div;
        },


    //Accessors.

        cssValue: function()
        { return this.name+': '+this.value+this.unit+';'; },


    //In-house UI logic.

        sliderValueChanged: function(event)
        {
            //References.
            slider = sender(event);

            log(slider.dataset.keyPath);

            control = viewController.controlForKeyPath(slider.dataset.keyPath);

            //Model.
            control.value = slider.value;

            //In-house UI.
            control.valueTextField.value = slider.value;

            //Report.
            control.delegate.sliderValueChanged(event);
        },

        sliderReleased: function(event)
        {
            //References.
            slider = sender(event);
            control = viewController.controlForKeyPath(slider.dataset.keyPath);

            //Report.
            control.delegate.sliderReleased(event);
        },

        textFieldValueChanged: function(event)
        {
            //References.
            textField = sender(event);
            control = viewController.controlForKeyPath(textField.dataset.keyPath);

            //Model.
            control.value = textField.value;

            //In-house UI.
            control.slider.value = textField.value;

            //Report.
            control.delegate.textFieldValueChanged(event);
        }

});

var TransformValueControl = TRPropertyControl.extend
({
    cssValue: function()
    { return this.name+'('+this.value+this.unit+')'; }
});

var PercentValueControl = TRPropertyControl.extend
({
    cssValue: function()
    { return this.value+'%'; }
});


var TRViewController = Class.extend
({

    //Creation.

        construct: function()
        {
            this.propertiesPanel = document.getElementById('propertiesPanel');
            this.cssTextArea = document.getElementById('cssTextArea');
            this.dummy = document.getElementById('dummy');

            //Property control colelction.
            this.properyControls = [];

            //Model.
            this.cssText = '';
        },

        build: function()
        {
            this.addPropertyControls(defaultPropertyControls);
            this.addPropertyValueControls(defaultPropertyValueControls);

            //Render CSS.
            this.sliderValueChanged();
        },

    //Manage CSS properties.

        addNewPropertyControl: function(parameters)
        {
            //Create.
            var className = parameters['className'] || 'TRPropertyControl';
            control = new window[className](parameters);

            //Collect.
            this.properyControls[control.keyPath] = control;

            //Add UI.
            this.propertiesPanel.appendChild(control.element);
        },

        addPropertyControls: function(propertyControlParameters)
        {
            propertyControlParameters.enumerate(function(eachControlParameters)
            {
                eachControlParameters.delegate = viewController; //Hook up callback for this ViewController.
                viewController.addNewPropertyControl(eachControlParameters);
            });
        },

        addNewPropertyValueControl: function(propertyName, parameters)
        {
            //Create a control.
            var className = parameters['className'] || 'TRTRPropertyControl';
            control = new window[className](parameters, propertyName);

            //Collect.
            if (this.properyControls[propertyName] == null) this.properyControls[propertyName] = [];
            this.properyControls.setValueForKeyPath(control, control.keyPath);

            //Add UI.
            this.propertiesPanel.appendChild(control.element);
        },

        addPropertyValueControls: function(propertyValueControls)
        {
            propertyValueControls.enumerate(function(eachPropertyValueControls, eachPropertyName)
            {
                eachPropertyValueControls.enumerate(function(eachControlParameters)
                {
                    eachControlParameters.delegate = viewController; //Hook up callback for this ViewController.
                    viewController.addNewPropertyValueControl(eachPropertyName, eachControlParameters);
                });
            });
        },

        controlForKeyPath: function(keyPath)
        { return this.properyControls.valueForKeyPath(keyPath); },

        //Render CSS rule.
        cssRule: function()
        {
            var cssRule = '';
            this.properyControls.enumerate(function(eachControlOrPropertyValues, eachKey)
            {
                log('eachControlOrPropertyValues: '+eachControlOrPropertyValues);
                if (eachControlOrPropertyValues instanceof Array)
                {
                    //Property values.
                    cssDefinition = '';
                    document.cssValues = [];
                    eachControlOrPropertyValues.enumerate(function(eachValueControl) { document.cssValues.push(eachValueControl.cssValue()); });
                    cssDefinition = document.cssValues.join(' ');
                    cssRule += eachKey + ': ' + cssDefinition + '; \n';
                }

                else
                {
                    //Simple properties.
                    eachControl = eachControlOrPropertyValues;
                    cssRule += eachControl.cssValue() + ' \n';
                }
            });
            return cssRule;
        },


    //User interactions.

        //Property sliders.
        sliderValueChanged: function(event)
        {
            //Refresh.
            this.cssText = this.cssRule();
            this.cssTextArea.value = this.cssText;
            this.apply();
        },

        sliderReleased: function(event)
        { },

        textFieldValueChanged: function(event)
        {
            //Refresh.
            this.cssText = this.cssRule();
            this.cssTextArea.value = this.cssText;
            this.apply();
        },


    //Render CSS properties.

        apply: function()
        {
            //Apply computed style.
            this.dummy.style.cssText = this.cssRule();
        }

});