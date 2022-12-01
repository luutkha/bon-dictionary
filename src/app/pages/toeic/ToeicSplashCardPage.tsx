import { useEffect } from "react";
import styled from "styled-components";
import SplashCardDashbroadLayout from "../../components/layout/splash-card-dashbroad-Layout/SplashCardDashbroadLayout";
import toeicData from "../../data/toeic.json";
import { useAppDispatch } from "../../redux/hooks";
import {
  setCurrentListSplash,
  setListWords
} from "../../redux/slice/splash-card.slice";
import { useSplashCardStore } from "../../redux/store";
import { Word } from "../../types/common.type";
export const ToeicSplashCardPage = () => {
  const dispatch = useAppDispatch();
  const { listWords, currentSplashCardDashBoard, currentListSplash, listSplashCardMatched, targetSplashCardNeedToLearn } = useSplashCardStore();
  const data = toeicData as Word[];
  useEffect(() => {
    dispatch(setListWords(data.filter((c) => c.eng && c.spelling && c.vie)));
    if (listWords.length > 1) dispatch(setCurrentListSplash(6));
  }, [dispatch, listWords.length]);

  return (
    <div>
      <div>
        <div>
          {currentListSplash.length}
        </div>
        <div>
          {listSplashCardMatched.length}
        </div>
        {targetSplashCardNeedToLearn}
      </div>
      <SplashCardDashbroadLayout />
    </div>
  );
};
