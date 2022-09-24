import { Word } from "../../../../types/common.type";

export interface SplashCardProps {
  data: Word;
  type: "En" | "Vi";
  isSelected: boolean;
  otherSideId: number;
  isMatched: boolean | undefined;
}
