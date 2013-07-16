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

var ViewController = Class.extend
({

    //Creation.

        construct: function()
        {
            this.propertiesPanel = document.getElementById('propertiesPanel');
            this.cssTextArea = document.getElementById('cssTextArea');
            this.dummy = document.getElementById('dummy');

            //Property control colelction.
            this.properyControls = [];
            this.addPropertyControls(defaultPropertyControls);
            this.addPropertyValueControls(defaultPropertyValueControls);

            //Model.
            this.cssText = '';

            //Add wheel listening.
            this.mouseWheelListener = new MouseWheelListener(this.mouseDidRollWheel);
        },


    //Manage CSS properties.

        addNewPropertyControl: function(parameters)
        {
            //Create.
            var className = parameters['className'] || 'PropertyControl';
            control = new window[className](parameters);

            //Collect.
            this.properyControls[parameters['keyPath']] = control;

            //Add UI.
            this.propertiesPanel.appendChild(control.element);
        },

        addPropertyControls: function(propertyControlParameters)
        {
            for (eachIndex in propertyControlParameters)
            {
                eachControlParameters = propertyControlParameters[eachIndex];
                eachControlParameters.delegate = this; //Hook up callback for this ViewController.
                this.addNewPropertyControl(eachControlParameters);
            }
        },

        addNewPropertyValueControl: function(propertyName, parameters)
        {
            //Create a control.
            var className = parameters['className'] || 'PropertyControl';
            control = new window[className](parameters);

            //Collect.
            if (this.properyControls[propertyName] == null ) this.properyControls[propertyName] = [];
            //warning: Setter for keypath.
            this.properyControls.setObjectForKeypath(control, [parameters['keyPath']);

            //Add UI.
            this.propertiesPanel.appendChild(control.element);
        },

        addPropertyValueControls: function(propertyValueControls)
        {
            for (eachPropertyName in propertyValueControls)
            {
                eachPropertyValueControls = propertyValueControls[eachPropertyName];
                for (eachIndex in eachPropertyValueControls)
                {
                    eachControlParameters = eachPropertyValueControls[eachIndex];
                    eachControlParameters.delegate = this; //Hook up callback for this ViewController.
                    this.addNewPropertyValueControl(eachPropertyName, eachControlParameters);
                }
            }
        },

        controlForKeyPath: function(keyPath)
        {
            //warning: Getter for keypath.
            return this.properyControls[keyPath];
        },

        //Render CSS rule.
        cssRule: function()
        {

            log(this.properyControls);

            var cssRule = '';
            for (eachKey in this.properyControls)
            {
                eachControlOrPropertyValues = this.properyControls[eachKey];
                if (eachControlOrPropertyValues instanceof Array)
                {
                    //Property values.
                    var cssDefinition = '';
                    var cssValues = [];
                    for (eachIndex in eachControlOrPropertyValues)
                    {
                        eachValueControl = eachControlOrPropertyValues[eachIndex];
                        cssValues.push(eachValueControl.cssValue());
                    }
                    cssDefinition = cssValues.join(' ');
                    cssRule += eachKey + ': ' + cssDefinition + '; \n';
                }

                else
                {
                    //Simple properties.
                    eachControl = eachControlOrPropertyValues;
                    cssRule += eachControl.cssValue() + ' \n';
                }
            }
            return cssRule;
        },


    //User interactions.

        mouseDidRollWheel: function(delta)
        { log('Mouse delta ('+delta+')'); },

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