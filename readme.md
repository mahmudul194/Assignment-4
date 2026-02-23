1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer : getElementById selects an element by id, getElementsByClassName selects an element by it's class name, querySelector uses css selector, querySelectorAll selects all matching elements.

2. How do you create and insert a new element into the DOM?
Answer : element creation : document.createElement('tag'), adding element : element.textContent = "Hello", Insert into DOM : parent.appendChild(element);

3. What is Event Bubbling? And how does it work?
Answer : When you click a child element, the event happens on that element first, then it goes up to its parent, then to the parent's parent, and keeps going up.

4. What is Event Delegation in JavaScript? Why is it useful?
Answer : Adding an event listener to a parent element instead of multiple child elements.

5. What is the difference between preventDefault() and stopPropagation() methods?
Answer : preventDefault() stops browser's default behaviour. And stopPropagation() stops the event from moving to parent elements.
