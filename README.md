# bem-js
Реализация функций БЭМ на JavaScript

### void Element.addBEMMod(string: mod)
Добавить модификатор **mod** в классы элемента.

### void Element.removeBEMMod(string: mod)
Убрать модификатор **mod** из классов элемента.

### void Element.toggleBEMMod(string: mod)
Добавить/убрать модификатор **mod** при его отсутствии/наличии.

### bool Element.hasBEMMod(string: mod)
Проверить у элемента наличие модификатора **mod**.

### void Element.addBEMMods(array: mods), void Element.removeBEMMods(array: mods)
Выполняют те же действия, что и addBEMMod и removeBEMMod, но только с массивом модификаторов.

### Element Element.addBEMElement(string: tagName, string: elementName, bool: doNotAppend = false)
Создать дочерний элемент с тегом **tagName** и БЭМ-названием элемента **elementName** и добавить его при **doNotAppend = false** в DOM-узел. Возвращает создаваймый элемент.

### array Element.getBEMElems(string: name)
Получить дочерние элементы с БЭМ-названием **name**.