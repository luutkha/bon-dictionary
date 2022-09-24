import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { SplashCardProps } from "../../components/common/card/flash-card/interface";
import { Word } from "../../types/common.type";
import { splashCardAction } from "../action/splash-card.action";
const MAX_WORD_DASHBOARD = 5;
type SplashCardSliceProps = {
  currentListSplash: Word[];
  listWords: Word[];
  currentSplashCardDashBoard: SplashCardProps[];
  currentEnIndex: number | undefined;
  currrentViIndex: number | undefined;
};
const initialState: SplashCardSliceProps = {
  currentListSplash: [],
  listWords: [],
  currentSplashCardDashBoard: [
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
    {
      data: { eng: "", spelling: "", vie: "" },
      isSelected: false,
      otherSideId: -1,
      type: "En",
      isMatched: false,
    },
  ],
  currentEnIndex: undefined,
  currrentViIndex: undefined,
};

export const splashCardSlice = createSlice({
  name: "SplashCardSlice",
  initialState,
  reducers: {
    setCurrentListSplash: (state, action: PayloadAction<number>) => {
      const listWords = [...state.listWords];
      console.log(listWords);
      const nItems = _.sampleSize(listWords, action.payload);
      state.currentListSplash = nItems;
      state.currentSplashCardDashBoard.length = MAX_WORD_DASHBOARD * 2;
      const randomDataForDashBroad = [
        ..._.sampleSize(state.currentListSplash, MAX_WORD_DASHBOARD),
      ];
      console.log(randomDataForDashBroad);
      var dashbroadIndexListEng = Array.from(Array(MAX_WORD_DASHBOARD).keys());
      var dashbroadIndexListVie = Array.from(Array(MAX_WORD_DASHBOARD).keys());

      for (let index = 0; index < MAX_WORD_DASHBOARD; index++) {
        console.log(dashbroadIndexListEng);
        const word = randomDataForDashBroad[index];
        const get_random = (list: number[]) => {
          return list[Math.floor(Math.random() * list.length)];
        };
        let randomIndexEng = get_random(dashbroadIndexListEng);
        let randomIndexVie = get_random(dashbroadIndexListVie);

        console.log(randomIndexEng);
        if (randomIndexEng !== undefined && randomIndexVie !== undefined) {
          console.log("check");
          word.eng = word.eng.split("(")[0];
          state.currentSplashCardDashBoard[randomIndexEng * 2] = {
            data: word,
            isSelected: false,
            otherSideId: randomIndexVie * 2 + 1,
            type: "En",
            isMatched: undefined,
          };
          state.currentSplashCardDashBoard[randomIndexVie * 2 + 1] = {
            data: word,
            isSelected: false,
            otherSideId: randomIndexEng * 2,
            type: "Vi",
            isMatched: undefined,
          };
          dashbroadIndexListEng = [...dashbroadIndexListEng].filter(
            (e) => e !== randomIndexEng
          );
          dashbroadIndexListVie = [...dashbroadIndexListVie].filter(
            (e) => e !== randomIndexVie
          );
        } else {
          console.log("có undefine");
          console.log(randomIndexVie);
          console.log(randomIndexEng);
        }
      }
    },
    setListWords: (state, action: PayloadAction<Word[]>) => {
      state.listWords = action.payload;
    },
    updateCurrenrSplashCardDashBroad: (
      state,
      action: PayloadAction<number>
    ) => {
      state.currentSplashCardDashBoard.map((card, index) => {
        if (
          index !== state.currentEnIndex &&
          index !== state.currrentViIndex &&
          card.isMatched === false
        ) {
          card.isMatched = undefined;
        }
        return card;
      });
      const setCurrentIndex = (
        type: "En" | "Vi" | "All",
        value: undefined | number
      ) => {
        switch (type) {
          case "All":
            state.currentEnIndex = value;
            state.currrentViIndex = value;
            break;
          case "Vi":
            state.currrentViIndex = value;
            break;
          case "En":
            state.currentEnIndex = value;
            break;
        }
      };
      const id = action.payload;
      const currentCard = state.currentSplashCardDashBoard[id];

      if (currentCard.isSelected) {
        setCurrentIndex(currentCard.type, undefined);
        state.currentSplashCardDashBoard[id].isSelected = false;
      } else {
        currentCard.isSelected = true;
        state.currentSplashCardDashBoard[id] = currentCard;
        setCurrentIndex(currentCard.type, id);
        
        const checkOtherIdMatched = (type: "En" | "Vi", id: number) => {
          const otherSideId = currentCard.otherSideId;
          switch (type) {
            case "Vi":
              if (state.currentEnIndex === otherSideId) return true;
              return false;

            case "En":
              if (state.currrentViIndex === otherSideId) return true;
              return false;
          }
        };

        if (
          state.currentEnIndex !== undefined &&
          state.currrentViIndex !== undefined
        ) {
          if (checkOtherIdMatched(currentCard.type, id)) {
            console.log("match");
            state.currentSplashCardDashBoard[
              currentCard.otherSideId
            ].isMatched = true;
            state.currentSplashCardDashBoard[id].isMatched = true;
            setCurrentIndex("All", undefined);
          } else {
            console.log("un match cheked");
            state.currentSplashCardDashBoard[state.currentEnIndex].isSelected =
              false;
            state.currentSplashCardDashBoard[state.currrentViIndex].isSelected =
              false;
            state.currentSplashCardDashBoard[state.currentEnIndex].isMatched =
              false;
            state.currentSplashCardDashBoard[state.currrentViIndex].isMatched =
              false;
            setCurrentIndex("All", undefined);
          }
        } else {
          console.log("undefined check");
          console.log(state.currentEnIndex);
          console.log(state.currrentViIndex);

          //just do nothing
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(splashCardAction.getDataFromJson.pending, (state, _) => {
      state.listWords = [];
    });
    builder.addCase(
      splashCardAction.getDataFromJson.fulfilled,
      (state, action) => {
        state.listWords = action.payload;
      }
    );
    builder.addCase(splashCardAction.getDataFromJson.rejected, (state, _) => {
      state.listWords = [];
    });
  },
});

export const {
  setCurrentListSplash,
  setListWords,
  updateCurrenrSplashCardDashBroad,
} = splashCardSlice.actions;
export default splashCardSlice.reducer;
