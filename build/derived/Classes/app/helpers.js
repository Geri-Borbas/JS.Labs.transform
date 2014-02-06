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
