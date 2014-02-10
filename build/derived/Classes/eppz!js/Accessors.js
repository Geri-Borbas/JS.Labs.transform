/**
 *
 * Created by Borbás Geri on 1/16/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */



/**
 * Synthesizes array enumerators for the given object.
 *
 * Object have an array property called 'items'.
 * This call creates a method with the following signature.
 * 'function enumerateItems(callback)' where callback expects the following signature.
 * 'function(eachItem, eachIndex)'
 *
 * @param object Target object.
 */
function synthesizeEnumeratorsForObject(object)
{
    for (var eachPropertyName in object)
    {
        var eachProperty = object[eachPropertyName];
        if (eachProperty == null) continue;

        var isArray = Array.isArray(eachProperty);
        if (isArray)
        {
            var methodName = 'enumerate'+eachPropertyName.capitalize();
            object[methodName] = function(callback)
            {
                var array = arguments.callee._array;
                var callingInstance = arguments.callee._object;

                for (var index = 0; index < array.length; index++)
                {
                    var eachItem = array[index];
                    callback.apply(callingInstance, [eachItem, index]);
                }
            };
            object[methodName]._object = object;
            object[methodName]._array = eachProperty;
        }
    }
}



/**
 * Synthesizes accessors (getters and setter) for the given object along the passed property map.
 *
 * Property maps should include what properties to bind to what other property.
 *
 * @param object Target object.
 * @param propertyMap Property map to bind properties along.
 */
function synthesizeAccessorsWithPropertyMapForObject(object /* , propertyMap */)
{
    var propertyMap =
    {
        'top' : [ 'div.style.top', '%px' ],
        'left' : [ 'div.style.left', '%px' ],

        'width' : [ 'div.style.width', '%px' ],
        'height' : [ 'div.style.height', '%px' ],
    };

    for (var eachPropertyName in object)
    {
        var eachProperty = object[eachPropertyName];
        if (eachProperty == null) continue;

        // Look up if property is mapped.
        var mapped = (propertyMap[eachPropertyName] != null);
        if (mapped == false) continue;

        // Instance variable name.
        var eachInstanceVariableName = '_'+eachPropertyName;
        var eachBoundPropertyName = propertyMap[eachPropertyName][0];
        var eachBoundPropertyFormat = propertyMap[eachPropertyName][1];

        // Getter.
        var getter = function()
        {
            var instanceVariableName = arguments.callee._instanceVariableName;
            return this[instanceVariableName];
        };
        getter._instanceVariableName = eachInstanceVariableName;
        Object.defineProperty(object, eachPropertyName, { get : getter });

        // Setter.
        var setter = function(value)
        {
            var instanceVariableName = arguments.callee._instanceVariableName;
            var boundPropertyName = arguments.callee._boundPropertyName;
            var boundPropertyFormat = arguments.callee._boundPropertyFormat;

            // Set property.
            this[instanceVariableName] = value;

            // Set bound property.
            var boundValue = boundPropertyFormat.replace('%', value);
            this.setValueForKeyPath(boundValue, boundPropertyName);
        };
        setter._instanceVariableName = eachInstanceVariableName;
        setter._boundPropertyName = eachBoundPropertyName;
        setter._boundPropertyFormat = eachBoundPropertyFormat;
        Object.defineProperty(object, eachPropertyName, { set : setter });
    }
}