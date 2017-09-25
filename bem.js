(function (element) {

	'use strict';

	var BEM_MOD_DELIMETER = '--';
	var	BEM_ELEMENT_DELIMETER = '__';

	/**
	 * @return {String}
	 * */
	element.getBEMClass = function () {
		if ('undefined' !== typeof this.BEMCLass) {
			return this.BEMCLass;
		}

		var className = this.getAttribute('data-class-name');

		if (className) {
			return className;
		}

		var classes = this.className.split(' ');

		for (var i = 0; i < classes.length; i++) {
			if (!classes[i].length) { continue; }
			if (classes[i].indexOf(BEM_MOD_DELIMETER) === -1) {
				className = classes[i];
				break;
			}
		}

		this.BEMCLass = className;

		return className;
	};

	/**
	 * @param {String} name
	 * @return {NodeList}
	 * */
	element.getBEMElems = function (name) {
		return this.querySelectorAll('.' + this.getBEMClass() + BEM_ELEMENT_DELIMETER + name);
	};

	/**
	 * @param {String} mod
	 * @return {Boolean}
	 * */
	element.hasBEMMod = function (mod) {
		var className = this.getBEMClass() + BEM_MOD_DELIMETER + mod;
		return this.className.split(' ').indexOf(className) !== -1;
	};

	/**
	 * @param {String} mod
	 * */
	element.addBEMMod = function (mod) {
		var className = this.getBEMClass() + BEM_MOD_DELIMETER + mod;

		if (this.className.split(' ').indexOf(className) === -1) {
			this.classList.add(className);
		}
	};

	/**
	 * @param {Array} mods
	 * */
	element.addBEMMods = function (mods) {
		for (var i = 0; i < mods.length; i++) {
			this.addBEMMod(mods[i]);
		}
	};

	/**
	 * @param {String} mod
	 * */
	element.removeBEMMod = function (mod) {
		var className = this.getBEMClass() + BEM_MOD_DELIMETER + mod;

		if (this.className.split(' ').indexOf(className) !== -1) {
			this.classList.remove(className);
		}
	};

	/**
	 * @param {Array} mods
	 * */
	element.removeBEMMods = function (mods) {
		for (var i = 0; i < mods.length; i++) {
			this.removeBEMMod(mods[i]);
		}
	};

	/**
	 * @param {String} mod
	 * */
	element.toggleBEMMod = function (mod) {
		var className = this.getBEMClass() + BEM_MOD_DELIMETER + mod;

		if (this.className.split(' ').indexOf(className) === -1) {
			this.addBEMMod(mod);
		}
		else {
			this.removeBEMMod(mod);
		}
	};

	/**
	 * @param {String} childNodeName
	 * @param {String} childClassName
	 * @param {Boolean} doNotAppend
	 * @return {HTMLElement}
	 * */
	element.addBEMElement = function (childNodeName, childClassName, doNotAppend) {
		var className = this.getBEMClass();
		var child = document.createElement(childNodeName);

		child.classList.add(className + BEM_ELEMENT_DELIMETER + childClassName);

		if (!doNotAppend) {
			this.appendChild(child);
		}

		return child;
	};

	/**
	 * @param {String} mod
	 * @param {HTMLElement} parent
	 * */
	element.addBEMModOf = function (mod, parent) {
		// 'block__elem' or 'block--mod__elem' > [ 'block', 'elem' ]
		var separateClassName = this.getBEMClass().split(BEM_ELEMENT_DELIMETER);
		// 'elem'
		var elementClassName = separateClassName.pop();
		// 'block' + '--' + 'mod' + '__' + 'elem'
		var className = parent.getBEMClass() + BEM_MOD_DELIMETER + mod + BEM_ELEMENT_DELIMETER + elementClassName;

		this.classList.add(className);
	};


	/**
	 * @param {HTMLElement} potentialyParentElement
	 * @param {String} className
	 * @return {Boolean}
	 * */
	element.isBEMElementOf = function (potentialyParentElement, className) {

		if (!potentialyParentElement || !potentialyParentElement.nodeName) {
			return false;
		}

		if (!className) {
			className = this.getBEMClass().split(BEM_ELEMENT_DELIMETER)[1]
		}

		var potentialySiblings = potentialyParentElement.getBEMElems(className);

		for (var i = 0; i < potentialySiblings.length; i++) {
			if (potentialySiblings[i] === this) {
				return true;
			}
		}
		return false;
	};

})(Element.prototype);