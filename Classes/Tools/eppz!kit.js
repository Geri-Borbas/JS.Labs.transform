var classDelimiter = " ";

Element.prototype.hasClass = function(classname)
{
	if (this == null) return;

	//Search.
	return (this.className.split(' ').indexOf(classname) === -1) ? false : true;
}

Element.prototype.addClass = function(className)
{
	if (this == null) return;
	if (className == null || className == '') return;
	
	//Explode.
	var classes = this.className.split(classDelimiter);

		//Process.
		classes.push(className);

	//Implode.
	this.className = classes.join(classDelimiter);
}

Element.prototype.removeClass = function(className)
{ this.replaceClass(className, ''); }

Element.prototype.replaceClass = function(currentClassName, newClassName)
{
	if (this == null) return;
	if (currentClassName == null || currentClassName == '') return;
	
	//Explode.
	var classes = this.className.split(classDelimiter);

		//Process.
		var classIndex = classes.indexOf(currentClassName);
		if (classIndex == -1) return;
		if (newClassName == null || newClassName == '') classes.splice(classIndex, 1);
						  						   else classes.splice(classIndex, 1, newClassName);
	//Implode.
	this.className = classes.join(classDelimiter);
}

Element.prototype.replaceClass = function(currentClassName, newClassName)
{
	if (this == null) return;
	if (currentClassName == null || currentClassName == '') return;
	
	//Explode.
	var classes = this.className.split(classDelimiter);

		//Process.
		var classIndex = classes.indexOf(currentClassName);
		if (classIndex == -1) return;
		if (newClassName == null || newClassName == '') classes.splice(classIndex, 1);
						  						   else classes.splice(classIndex, 1, newClassName);

	//Implode.
	this.className = classes.join(classDelimiter);
}

Element.prototype.getClassContainig = function(token)
{
	if (this == null) return;
	if (token == null || token == '') return;

	//Explode.
	var classes = this.className.split(classDelimiter);

	//Look for token.
	for(eachIndex in classes)
	{
		eachClass = classes[eachIndex];
		if (eachClass.search(token) != -1)
		{		
			return eachClass;
			break;
		}
	}

	return null;
}	

Element.prototype.replaceClassContainig = function(token, newClassName)
{
	if (this == null) return;
	if (token == null || token == '') return;

	var foundAndReplaced = false; //Result.

	//Explode.
	var classes = this.className.split(classDelimiter);

	//Look for token.
	for(eachIndex in classes)
	{
		eachClass = classes[eachIndex];
		if (eachClass.search(token) != -1)
		{		
			//Process.
			if (newClassName == null || newClassName == '') classes.splice(eachIndex, 1);
							  						   else classes.splice(eachIndex, 1, newClassName);
			foundAndReplaced = true;
		}
	}

	//Implode.
	this.className = classes.join(classDelimiter);

	return foundAndReplaced;
}