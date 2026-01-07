export interface GenerationState {
  isLoading: boolean;
  imageSrc: string | null;
  error: string | null;
}

export enum AspectRatio {
  SQUARE = '1:1',
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
  THREE_FOUR = '3:4',
  FOUR_THREE = '4:3',
}
