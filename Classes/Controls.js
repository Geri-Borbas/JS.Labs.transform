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

var PropertyControl = Class.extend
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
                    this.valueTextField.class = 'value';
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

var TransformValueControl = PropertyControl.extend
({
    cssValue: function()
    { return this.name+'('+this.value+this.unit+')'; }
});

var PercentValueControl = PropertyControl.extend
({
    cssValue: function()
    { return this.value+'%'; }
});