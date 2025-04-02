# Link to Stackblitz:

[<u>https://vite.new/react</u>](https://vite.new/react)

# 

# Example of updating a state variable based on a previous value

To update a state variable based on a previous value, use a functional
update:

*// the new wage is the old wage increased by 15%*

setHourlyWage((currWage)=\>{

return currWage \* 1.15

})

This is the equivalent of doing:

currWage = currWage \* 1.15

Examples: *to run these examples use StackBlitz:
[<u>https://vite.new/react</u>](https://vite.new/react)*

import { useState } from 'react';

import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';

import './App.css';

function App() {

const \[count, setCount\] = useState(0);

const \[mode, setMode\] = useState('dark');

const \[num, setNum\] = useState(100);

const updateCounter = () =\> {

setCount((currValue) =\> {

return currValue + 1;

});

};

const updateMode = () =\> {

setMode((currValue) =\> {

if (currValue === 'dark') {

return 'light';

} else {

return 'dark';

}

});

};

const flip = () =\> {

setNum((currValue) =\> {

return currValue \* -1;

});

};

return (

\<\>

\<div className="card"\>

\<button onClick={updateCounter}\>count is {count}\</button\>

\<button onClick={updateMode} className={mode}\>

current setting: {mode}

\</button\>

\<button onClick={flip}\>flip number: {num}\</button\>

\</div\>

\</\>

);

}

export default App;

*App.css*

.dark {

background-color: black;

color: white;

}

.light {

background-color: \#eee;

color: black;

}

Comparison:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>Non functional update</th>
<th>Functional update</th>
</tr>
<tr>
<th><p>const updateCounter = () =&gt; {</p>
<p>setCount(count + 1);</p>
<p>};</p></th>
<th><p>const updateCounter = () =&gt; {</p>
<p>setCount((currValue) =&gt; {</p>
<p>return currValue + 1;</p>
<p>});</p>
<p>};</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th style="text-align: left;">Non functional update</th>
<th style="text-align: left;"><em>Functional update</em></th>
</tr>
<tr>
<th><p>const updateMode = () =&gt; {</p>
<p>let curr = mode;</p>
<p>if (curr === 'dark') {</p>
<p>setMode('light');</p>
<p>} else {</p>
<p>setMode('dark');</p>
<p>}</p>
<p>};</p></th>
<th><p>const updateMode = () =&gt; {</p>
<p>setMode((currValue) =&gt; {</p>
<p>if (currValue === 'dark') {</p>
<p>return 'light';</p>
<p>} else {</p>
<p>return 'dark';</p>
<p>}</p>
<p>});</p>
<p>};</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Why should you use functional updates?

- State variables are updated asynchronously (as a background task.

- Therefore, you have *no guarantee* that when you access the state
  variable, you have its most up to date value.

<!-- -->

- In a functional update, React promises that you have the most updated
  value in the variable

Example of when you don’t always have the latest value;

import { useState } from 'react';

import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';

import './App.css';

function App() {

const \[count, setCount\] = useState(0);

const \[mode, setMode\] = useState('dark');

const \[num, setNum\] = useState(100);

const updateCounter = () =\> {

setCount((currValue) =\> {

return currValue + 1;

});

};

<span class="mark">const test = () =\> {</span>

<span class="mark">setCount(count + 1); *// count = 1 *</span>

<span class="mark">setCount(count + 1); *// count = 2 *</span>

<span class="mark">setCount(count + 1); *// count = 3*</span>

<span class="mark">};</span>

return (

\<\>

\<div className="card"\>

\<button onClick={test}\>count is {count}\</button\>

\</div\>

\</\>

);

}

export default App;

# The useRef variable

Used to remember the value of a variable in between state updates.

(updates a state variable without triggering a UI refresh.

Click here to see console

<img src="images/media11_4/image2.png"
style="width:7.13696in;height:5.12143in" />

Example of state that triggers a ui change:

import { useState, useEffect, useRef } from 'react';

import './App.css';

function App() {

const \[mode, setMode\] = useState('dark');

useEffect(() =\> {

console.log('mode change, refreshing UI');

}, \[mode\]);

const changeMode = () =\> {

setMode((curr) =\> {

if (curr === 'dark') {

return 'light';

} else {

return 'dark';

}

});

console.log('What is count? ' + count);

};

const \[count, setCount\] = useState(0);

useEffect(() =\> {

console.log('count changed, refreshing UI');

}, \[count\]);

const updateCount = () =\> {

setCount(count + 1);

};

return (

\<\>

\<div className="card"\>

\<button onClick={updateCount}\>Count is: {count}\</button\>

\<button onClick={changeMode} className={mode}\>

current mode is: {mode}

\</button\>

\</div\>

\</\>

);

}

export default App;

State variable does update and triggers a refresh

<img src="images/media11_4/image1.png"
style="width:5.72917in;height:2.41667in" />

**Example of using a ref variable to count**

import { useState, useEffect, useRef } from 'react';

import './App.css';

function App() {

const \[mode, setMode\] = useState('dark');

useEffect(() =\> {

console.log('mode change, refreshing UI');

}, \[mode\]);

const changeMode = () =\> {

setMode((curr) =\> {

if (curr === 'dark') {

return 'light';

} else {

return 'dark';

}

});

console.log('What is count? ' + count.current);

};

*// const \[count, setCount\] = useState(0);*

const count = useRef(0);

useEffect(() =\> {

console.log('count changed, refreshing UI');

}, \[count\]);

const updateCount = () =\> {

*// setCount(count + 1);*

count.current = count.current + 5;

console.log(\`new value of count: \${count.current}\`);

};

return (

\<\>

\<div className="card"\>

\<button onClick={updateCount}\>Count is: {count.current}\</button\>

\<button onClick={changeMode} className={mode}\>

current mode is: {mode}

\</button\>

\</div\>

\</\>

);

}

export default App;

Variable updated but does not produce a sate update.
