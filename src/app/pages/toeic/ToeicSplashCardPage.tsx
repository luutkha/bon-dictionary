import { useEffect } from "react";
import styled from "styled-components";
import { SplashCard } from "../../components/common/card/flash-card/SplashCard";
import { splashCardAction } from "../../redux/action/splash-card.action";
import { useAppDispatch } from "../../redux/hooks";
import {
  setCurrentListSplash,
  setListWords,
  updateCurrenrSplashCardDashBroad,
} from "../../redux/slice/splash-card.slice";
import toeicData from "../../data/toeic.json";
import { useSplashCardStore } from "../../redux/store";
import { Word } from "../../types/common.type";
type Props = {};

export const ToeicSplashCardPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const data = toeicData as Word[];
  const { listWords, currentSplashCardDashBoard } = useSplashCardStore();
  useEffect(() => {
    dispatch(setListWords(data));
    if (listWords.length > 1) dispatch(setCurrentListSplash(50));
  }, [dispatch, listWords.length]);
  const handleCardClick = (id: number) => {
    dispatch(updateCurrenrSplashCardDashBroad(id));
  };
  return (
    <Container>
      {currentSplashCardDashBoard.map((w, index) => (
        <Item
          key={index + `${w.isMatched}`}
          onClick={() => handleCardClick(index)}
        >
          <SplashCard {...w} />
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  /* grid-auto-rows: 1fr; */

  grid-template-columns: auto auto;
  padding: 10px;
  gap: 10px;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  width: 100%;
  /* height: 100%; */
  /* aspect-ratio: 1 / 1; */
`;
