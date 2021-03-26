import { Dispatch, useState, FC, SetStateAction, MutableRefObject, useEffect } from 'react';
import { createCtx } from '../libs/createCtx';

type Canvas = MutableRefObject<HTMLCanvasElement> | null;

export interface ICanvasContext {
  canvas: Canvas;
  setCanvas: (ref: MutableRefObject<HTMLCanvasElement>) => void;
}

const [useCanvasContext, CanvasContext] = createCtx<ICanvasContext>();

const CanvasProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<Canvas>();

  return <CanvasContext.Provider value={{ canvas, setCanvas }}>{children}</CanvasContext.Provider>;
};

export { CanvasProvider, useCanvasContext };
