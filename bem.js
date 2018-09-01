/**
 * BEMJS
 * @author Fanil Zubairov <fannisco@gmail.com>
 * */
(function defineBemjs (global, fabric) {
	if (global && global.Element && global.Element.prototype) {
		fabric(global.Element.prototype);
	}
})(window, function bemjsFactory(elem) {

	// Modifier delimenter
	// Example: block--modifier
	const BEM_DELIMETER_MOD = '--';

	// Element delimeter
	// Example: block__element
	const BEM_DELIMETER_ELEMENT = '__';

	/**
	 * Create or get BEM-class from data-class-name attribute
	 * @return {String}
	 * */
	elem.getBEMClass = function () {
		if ('undefined' !== typeof this.BEMCLass) {
			return this.BEMCLass;
		}

		let className = this.getAttribute('data-class-name');

		if (className) {
			return className;
		}

		let classes = this.className.split(' ');

		for (let i = 0; i < classes.length; i++) {
			if (!classes[i].length) { continue; }
			if (classes[i].indexOf(BEM_DELIMETER_MOD) === -1) {
				className = classes[i];
				break;
			}
		}

		this.BEMCLass = className;

		return className;
	};

	/**
	 * Get all elements with BEM element name
	 * @param {String} name - BEM element name
	 * @return {NodeList}
	 * */
	elem.getBEMElems = function (name) {
		return this.querySelectorAll('.' + this.getBEMClass() + BEM_DELIMETER_ELEMENT + name);
	};

	/**
	 * Check if element has BEM modifier
	 * @param {String} mod
	 * @return {Boolean}
	 * */
	elem.hasBEMMod = function (mod) {
		let className = this.getBEMClass() + BEM_DELIMETER_MOD + mod;
		return this.hasClass(className);
	};

	/**
	 * Add modifier to the element
	 * @param {String} mod
	 * @return void
	 * */
	elem.addBEMMod = function (mod) {
		let className = this.getBEMClass() + BEM_DELIMETER_MOD + mod;

		if (!this.hasClass(className)) {
			this.classList.add(className);
		}
	};

	/**
	 * Add an array of modifiers to the element
	 * @param {Array} mods
	 * @return void
	 * */
	elem.addBEMMods = function (mods) {
		for (let i = 0; i < mods.length; i++) {
			this.addBEMMod(mods[i]);
		}
	};

	/**
	 * Remove modifier from the element
	 * @param {String} mod
	 * @return void
	 * */
	elem.removeBEMMod = function (mod) {
		let className = this.getBEMClass() + BEM_DELIMETER_MOD + mod;

		if (this.hasClass(className)) {
			this.classList.remove(className);
		}
	};

	/**
	 * Remove an array of modifiers to the element
	 * @param {Array} mods
	 * @return void
	 * */
	elem.removeBEMMods = function (mods) {
		for (let i = 0; i < mods.length; i++) {
			this.removeBEMMod(mods[i]);
		}
	};

	/**
	 * Add modifier if it isn't exist or remove if exist
	 * @param {String} mod
	 * @return void
	 * */
	elem.toggleBEMMod = function (mod) {
		let className = this.getBEMClass() + BEM_DELIMETER_MOD + mod;

		if (!this.hasClass(className)) {
			this.addBEMMod(mod);
		}
		else {
			this.removeBEMMod(mod);
		}
	};

	/**
	 * Add an element with specified tag name and BEM element name
	 * @param {String} tagName - tag name off adding element
	 * @param {String} elementName - BEM element name
	 * @param {Boolean} [doNotAppend] - set it to false if you do not want to append an element to the block
	 * @return {Element}
	 * */
	elem.addBEMElement = function (tagName, elementName, doNotAppend) {
		let bemClass = this.getBEMClass();
		let child = document.createElement(tagName);

		child.classList.add(bemClass + BEM_DELIMETER_ELEMENT + elementName);

		if (!doNotAppend) {
			this.appendChild(child);
		}

		return child;
	};

	/**
	 * Check if the element is an BEM element of specified node
	 * @param {Element} parent
	 * @param {String} className
	 * @return {Boolean}
	 * */
	elem.isBEMElementOf = function (parent, className) {
		if (parent) {
			return false;
		}

		if (!className) {
			className = this.getBEMClass().split(BEM_DELIMETER_ELEMENT)[1]
		}

		let potentialySiblings = parent.getBEMElems(className);

		for (let i = 0; i < potentialySiblings.length; i++) {
			if (potentialySiblings[i] === this) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Add new BEM class to the element
	 * @param {String} className
	 * @param {String} nameSpace
	 * */
	elem.addBEMClass = function (className, nameSpace) {
		this.classList.add(nameSpace + BEM_DELIMETER_ELEMENT + className);
	};

	/**
	 * Check if the element has specified class
	 * @param {String} className
	 * @return {Boolean}
	 * */
	elem.hasClass = elem.hasClass = function (className) {
		let classes = this.className.split(' ');

		for (let i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				return true;
			}
		}
		return false;
	};

});