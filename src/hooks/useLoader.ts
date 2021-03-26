// import { Loader, Texture } from 'pixi.js';

export const useLoader = () => {
  // const loader = Loader.shared;
  const loadAsset = (file: File) => {
    const path = URL.createObjectURL(file);
    // loader.add(file.name, path);

    // return new Promise((resolve, reject) => {
    //   loader.onLoad((_, resources) => {
    //     resolve(resources[file.name].texture);
    //   });

    //   loader.onError((err) => {
    //     reject(err);
    //   });
    // });
  };

  return { loadAsset };
};
