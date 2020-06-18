# Masalah Pada PWA

## Pemuatan gambar terlalu lama

Gunakan teknik _Lazy Loading Images_. Teknik _Lazy Loading_ adalah teknik untuk memuat gambar belakangan setelah HTML, CSS dan JS dimuat. Ada beberapa cara untuk mengatasinya, seperti yang dilansir di situs [Sitepoin](https://www.sitepoint.com/five-techniques-lazy-load-images-website-performance/), yaitu :

### Native Lazy Loading

Contoh penerapannya :

```html
    <img src="myimage.jpg" loading="lazy" alt="..." />
    <iframe src="content.html" loading="lazy"></iframe>
```

Attribute loading memiliki 3 pilihan, yaitu :
1. lazy -> Lazy Loading content
2. eager -> Mengintruksikan browser untuk memuat konten yang ditentukan dengan segera
3. auto -> Memberikan keputusan pada browser untuk lazy load atau tidak

Kelemahannya adalah tidak semua browser mendukung attribute _loading_

### Intersection Observer API

Readmore [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

Contoh :

```html
  <!-- File HTML -->
  <img data-src="image1.jpg" alt="test image">
  <img data-src="image2.jpg" alt="test image">
  <img data-src="image3.jpg" alt="test image">
```

```css
    /* File CSS */
    img {
      min-height: 100px;
      /* more styles here */
    }
```

```js
    // File config for Intersection

    // create config object: rootMargin and threshold
    // are two properties exposed by the interface
    const config = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0
    };

    // register the config object with an instance
    // of intersectionObserver
    let observer = new intersectionObserver(function(entries, self) {
      // iterate over each entry
      entries.forEach(entry => {
        // process just the images that are intersecting.
        // isIntersecting is a property exposed by the interface
        if(entry.isIntersecting) {
          // custom function that copies the path to the img
          // from data-src to src
          preloadImage(entry.target);
          // the image is now in place, stop watching
          self.unobserve(entry.target);
        }
      });
    }, config);
```

```js
    // Penerapan intersection
    const imgs = document.querySelectorAll('[data-src]');
    imgs.forEach(img => {
      observer.observe(img);
    });
```

### Lozad.js

Menggunakan library

Install :

`npm install --save lozad`

Import :

```js
    import lozad from 'lozad';
```
or
```html
    <script src="https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js"></script>
```

Instialisation on document

```js
    const observer = lozad();
    observer.observe();
```

Use in HTML :

```html
    <img class="lozad" data-src="img.jpg">
```

### With Blurred Image Effect

Lihat di [sitepoint](https://www.sitepoint.com/how-to-build-your-own-progressive-image-loader/) atau [github](https://github.com/craigbuckler/progressive-image.js)

### Yall.js

Package for lazy Loading

Implementation :

```html
    <script src="yall.min.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", yall);
    </script>
```

```html
  <img class="lazy" src="placeholder.jpg" data-src="image-to-lazy-load.jpg" alt="Alternative text to describe image.">
```


Lainnya https://medium.com/kode-dan-kodean/membuat-aplikasi-web-blog-wwwid-pwa-29d18dba3ff
