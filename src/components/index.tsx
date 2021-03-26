import Head from 'next/head';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useCanvasContext } from '../contsxts/canvas';
import { useLoader } from '../hooks/useLoader';
import * as PIXI from 'pixi.js';
import { Sprite, VideoResource } from 'pixi.js';

const FRAME_RATE = 60;

export default function Pixi() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [app, setApp] = useState<PIXI.Application>();
  const [sprite, setSprite] = useState<Sprite>();
  const [timer, setTimer] = useState(0);
  let isPlayer = false;

  const load = (file: File) => {
    const path = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = '';
    video.src = path;

    video.onloadeddata = () => {
      const videoSprite = PIXI.Sprite.from(video);
      videoSprite.width = app.screen.width;
      videoSprite.height = app.screen.height;
      // @ts-ignore
      videoSprite.texture.baseTexture.resource.source.pause();
      setSprite(videoSprite);
      app.stage.addChild(videoSprite);
    };
  };

  const renderer = (frame) => {
    const time = frame / FRAME_RATE;
    console.log('Current', time);
    // @ts-ignore
    sprite.texture.baseTexture.resource.source.currentTime = time;

    app.renderer.render(app.stage);
  };

  const player = (frame: number = 0) => {
    if (!isPlayer) return;
    renderer(frame);
    requestAnimationFrame(() => {
      player(++frame);
    });
  };

  const play = () => {
    // @ts-ignore
    // sprite.texture.baseTexture.resource.source.play();
    isPlayer = true;
    player(0);
  };

  const next = () => {
    // @ts-ignore
    sprite.texture.baseTexture.resource.source.currentTime += 2;
    sprite.texture.update();
  };

  const stop = () => {
    // @ts-ignore
    sprite.texture.baseTexture.resource.source.pause();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files.length) {
      console.error('not set asset');
      return;
    }
    load(e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (!ref) return;
    const pixiApp = new PIXI.Application({
      view: ref.current,
      backgroundColor: 0xffffff
    });
    setApp(pixiApp);
  }, [ref]);

  useEffect(() => {
    // @ts-ignore
    setTimer(sprite?.texture.baseTexture.resource.source.currentTime || 0);
  }, [
    // @ts-ignore
    sprite?.texture.baseTexture.resource.source.currentTime
  ]);


  return (
    <main
      style={{
        width: '90vw',
        height: '60vh',
        backgroundColor: '#3c3c3c',
        padding: '0 30px',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 800,
          height: '100%',
          position: 'relative',
          margin: 'auto'
        }}
      >
        <div
          style={{
            width: '100%',
            paddingTop: '56.25%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <canvas
            ref={ref}
            width={100}
            height={100}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '0',
              left: '0',
              backgroundColor: '#ffffff'
            }}
          ></canvas>
        </div>
      </div>
      <p>{timer}</p>
      <input type="file" onChange={handleChange} />
      <p>
        <button onClick={play}>再生</button>
      </p>
      <p>
        <button onClick={stop}>ストップ</button>
      </p>
      <p>
        <button onClick={next}>Next</button>
      </p>
    </main>
  );
}
