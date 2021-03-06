import { getDefaultOptions, request } from 'api/helpers';

const resource = 'api/tracks';

export const apiTrackGet = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};

export const apiTrackPost = async (serviceUrl, track) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'POST',
    body: track ? JSON.stringify(track) : null,
  };
  return request(url, options);
};

export const apiTrackPut = async (serviceUrl, track) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'PUT',
    body: track ? JSON.stringify(track) : null,
  };
  return request(url, options);
};

export const apiTrackDelete = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};
