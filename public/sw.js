self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1')
    .then(cache => {
      return cache.addAll([
        '/favicon.ico',
        '/fonts/iconfont/codepoints',
        '/fonts/iconfont/material-icons.css',
        '/fonts/iconfont/MaterialIcons-Regular.eot',
        '/fonts/iconfont/MaterialIcons-Regular.ijmap',
        '/fonts/iconfont/MaterialIcons-Regular.svg',
        '/fonts/iconfont/MaterialIcons-Regular.ttf',
        '/fonts/iconfont/MaterialIcons-Regular.woff',
        '/fonts/iconfont/MaterialIcons-Regular.woff2',
        '/fonts/indie-flower-v9-latin-regular.eot',
        '/fonts/indie-flower-v9-latin-regular.svg',
        '/fonts/indie-flower-v9-latin-regular.ttf',
        '/fonts/indie-flower-v9-latin-regular.woff',
        '/fonts/indie-flower-v9-latin-regular.woff2',
        '/fonts/kavivanar-v3-latin-regular.eot',
        '/fonts/kavivanar-v3-latin-regular.svg',
        '/fonts/kavivanar-v3-latin-regular.ttf',
        '/fonts/kavivanar-v3-latin-regular.woff',
        '/fonts/kavivanar-v3-latin-regular.woff2',
        '/fonts/lobster-v20-latin-regular.eot',
        '/fonts/lobster-v20-latin-regular.svg',
        '/fonts/lobster-v20-latin-regular.ttf',
        '/fonts/lobster-v20-latin-regular.woff',
        '/fonts/lobster-v20-latin-regular.woff2',
        '/fonts/sedgwick-ave-v3-latin-regular.eot',
        '/fonts/sedgwick-ave-v3-latin-regular.svg',
        '/fonts/sedgwick-ave-v3-latin-regular.ttf',
        '/fonts/sedgwick-ave-v3-latin-regular.woff',
        '/fonts/sedgwick-ave-v3-latin-regular.woff2',
        '/fonts/Roboto-Black.ttf',
        '/fonts/Roboto-BlackItalic.ttf',
        '/fonts/Roboto-Bold.ttf',
        '/fonts/Roboto-BoldItalic.ttf',
        '/fonts/Roboto-Italic.ttf',
        '/fonts/Roboto-Light.ttf',
        '/fonts/Roboto-LightItalic.ttf',
        '/fonts/Roboto-Medium.ttf',
        '/fonts/Roboto-MediumItalic.ttf',
        '/fonts/Roboto-Regular.ttf',
        '/fonts/Roboto-Thin.ttf',
        '/fonts/Roboto-ThinItalic.ttf'
      ])
    })
    .then(() => console.log('Static resources cashed succeeded.'))
  );
});

self.addEventListener('fetch', event => {
  const { destination } = event.request;
  if (destination && destination !== 'script' && destination !== 'fetch') {
    event.respondWith(caches.match(event.request)
      .then(res => {
        if (res !== undefined) {
          return res;
        } else {
          return fetch(event.request)
            .then(res => {
              const resposeClone = res.clone();
              caches.open('v1').then(cache => {
                cache.put(event.request, resposeClone);
              })
  
              return res;
            });
        }
      })
    );
  }
});