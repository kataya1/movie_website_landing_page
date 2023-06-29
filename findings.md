### what are the ways to instantiate an image element?
1. Using the constructor:

```js
const img = new Image();
```

2. Creating an element and setting the type:

```js
const img = document.createElement('img');
```

**Some things to know about `<img>` elements:**

- You must set a `src` attribute to load an image
- You can listen for `load` and `error` events to know when an image finishes (or fails to) load
- The `decode()` method can be used to decode images earlier
- Attributes like `alt`, `width`, `height` etc can be set as needed

----
###  What does src setting do, is it an asynchronous operation is there a better way to do that?

 Setting the src attribute on an <img> tag tells the browser to load the image from that URL. It is an asynchronous operation.

Some key points:

- The browser will make a request for the image as soon as src is set
- The load will happen in the background, allowing other JS code to run
- You can listen for the 'load' event to know when the image has finished loading

**using img.src**

```js
const img = new Image();
img.src = 'path/to/image.png';
```
**Setting attribute directly:**

```js
const img = new Image();
img.setAttribute('src', 'image.png');
```

### what's the difference between the "load" event and decode()
The decode() method is used to decode an image file asynchronously. When an image is loaded in a web browser, it goes through a decoding process to convert the compressed image data into a usable format for rendering. The decode() method allows you to initiate this decoding process explicitly and receive a promise that resolves when the decoding is complete.

decode solves layout shift problems

can you use one before the other? yes
can you use both in parallel? yes (Promise.all())




