# fSelect
Fully customizable ES6 select with variation between select and input.

### How to use

1. import this library by script:<br/>
`<script src="/path/to/your/js/folder/fselect.js"></script>`<br/>
or import it like module in `main.js`:<br/>
`import FSelect from './path/to/your/js/folder/fselect.js'`

2. initialize:<br/>
`var fselect = new FSelect(document.getElementById('your-select'));`

3. customize it or leave it, you can use it now :)

### Syntax
FSelect gets 3 arguments: select element, object with options and callback function:

`var fselect = new FSelect(document.getElementById('your-select'), {<br/>
  type: 'select' || 'input',          //  default: 'select'<br/>
  placeholder: 'Your placeholder',    //  default: first option<br/>
  className: 'your-classname'         //  default: 'fselect'<br/>
}, function() {<br/>
  console.log('works!');<br/>
}`

### Methods

**destroySelect**<br/>
Destroys select instace:

`FSelect.destroySelect(instance)`
