import {clear} from 'idb-keyval';

const dependencies = [];

self.addEventListener('install', (event) => {
  const loadDependencies = self.caches.open('app')
      .then((cache) => cache.addAll(dependencies));

  event.waitUntil(loadDependencies);
});

self.addEventListener('activate', (event) => {
  const promiseClearIDB = clear();

  const promiseClearCache = self.caches.open('app')
      .then((cache) => cache.keys()
          .then(((cacheKeys) => Promise.all(cacheKeys.map((request) => {
            const canDelete = !dependencies.includes(request.url);
            return canDelete ? cache.delete(request, {ignoreVary: true}) :
              Promise.resolve();
          })))));

  const promiseClearAll = Promise.all([promiseClearIDB, promiseClearCache])
      .catch((err) => console.error(err));

  event.waitUntil(promiseClearAll);
});

self.addEventListener('fetch', (event) => {
  console.log('In fetch event');
});
