function arrayToHex() {
    let iv = window.crypto.getRandomValues(new Uint8Array(12));
    let hexStr = '';
    // eslint-disable-next-line prefer-const
    for (let i in iv) {
      if (iv[i] < 16) {
        hexStr += '0' + iv[i].toString(16);
      } else {
        hexStr += iv[i].toString(16);
      }
    }
    return hexStr;
  }

  function gcm(){
      try { 
          return window.crypto.subtle.generateKey({
              name: 'AES-GCM',
              length: 128
          },
          true,
          ['encrypt' , 'decrypt'])
      .then(key => {
          return.crypto.subtle.encrypt(
              {
                  name: 'AES-GCM',
                  iv: window.crypto.getRandomValues(new Uint8Array(12)),
                  data: window.crypto.getRandomValues(new Uint8Array(6)),
                  tag: 128
              },
              key,
              new ArrayBuffer(8)
          )
          .then(() => {
              return Promise.resolve();
          });
      })
      .catch( err => {
          return loadShim();
      });
      }catch(err){
          return loadShim();
      }
      function loadShim(){
        return new Promise((resolve, reject) => {
            const shim = document.createElement('script');
            shim.src = '/cryptofill.js';
            shim.addEventListener('load', resolve);
            shim.addEventListener('error', reject);
            document.head.appendChild(shim);
      });
  }
}

export = {
    gcm,
    arrayToHex
}