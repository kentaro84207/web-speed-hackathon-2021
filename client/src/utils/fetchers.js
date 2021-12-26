import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/octet-stream',
    },
  });
  return await result.arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return await result.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: file,
  });
  return await result.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: compressed,
  });
  return await result.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
