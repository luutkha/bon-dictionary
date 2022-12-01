import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { SplashCardProps } from "../../components/common/card/flash-card/interface";
import {
  DF_CURRENT_SPLASH_CARD_DB_VALUE,
  MAX_WORD_DASHBOARD,
} from "../../constants/common";
import { Word } from "../../types/common.type";
import { splashCardAction } from "../action/splash-card.action";
type SplashCardSliceProps = {
  targetSplashCardNeedToLearn: number;
  currentListSplash: Word[];
  listWords: Word[];
  currentSplashCardDashBoard: SplashCardProps[];
  currentEnIndex: number | undefined;
  currrentViIndex: number | undefined;
  listSplashCardMatched: Word[];
};
const initialState: SplashCardSliceProps = {
  targetSplashCardNeedToLearn: 0,
  currentListSplash: [],
  listWords: [],
  currentSplashCardDashBoard: DF_CURRENT_SPLASH_CARD_DB_VALUE,
  currentEnIndex: undefined,
  currrentViIndex: undefined,
  listSplashCardMatched: [],
};

export const splashCardSlice = createSlice({
  name: "SplashCardSlice",
  initialState,
  reducers: {
    setCurrentListSplash: (state, action: PayloadAction<number>) => {
      state.targetSplashCardNeedToLearn = action.payload;
      const listWords = [...state.listWords];
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
      state.currentListSplash = state.currentListSplash.filter((sample) => {
        const lengthMatch = state.currentSplashCardDashBoard.filter(
          (c) => c.data === sample
        ).length;
        return lengthMatch === 0;
      });
    },
    setListWords: (state, action: PayloadAction<Word[]>) => {
      state.listWords = action.payload;
    },
    updateCurrenrSplashCardDashBroad: (
      state,
      action: PayloadAction<number>
    ) => {
      // fixed un-correct case (matched: false ===> undefined )
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

      const addNewCard = () => {
        const totalMatchedCard = state.currentSplashCardDashBoard.reduce(
          (returnValue, card) => {
            if (card.isMatched === true) return returnValue + 1;
            else return returnValue;
          },
          0
        );
        console.log("total matched card: ", totalMatchedCard);
        if (totalMatchedCard / 2 >= 3) {
          const listCard = [...state.currentSplashCardDashBoard];
          var dashbroadIndexListEng: number[] = [];
          var dashbroadIndexListVie: number[] = [];

          listCard.forEach((c, index) => {
            if (c.isMatched === true && index % 2 === 0) {
              dashbroadIndexListEng.push(index);
            }
          });

          listCard.forEach((c, index) => {
            if (c.isMatched === true && index % 2 === 1) {
              dashbroadIndexListVie.push(index);
            }
          });

          //start add new card to dashbroad
          const lengthToLoop = dashbroadIndexListEng.length;

          const randomDataForDashBroad = [
            ..._.sampleSize(
              state.currentListSplash,
              state.currentListSplash.length >= lengthToLoop
                ? lengthToLoop
                : state.currentListSplash.length
            ),
          ];
          console.log(state.currentListSplash);
          console.log(randomDataForDashBroad);
          for (let index = 0; index < lengthToLoop; index++) {
            const word = randomDataForDashBroad[index];
            const get_random = (list: number[]) => {
              return list[Math.floor(Math.random() * list.length)];
            };
            let randomIndexEng = get_random(dashbroadIndexListEng);
            let randomIndexVie = get_random(dashbroadIndexListVie);

            console.log(randomIndexEng);
            if (
              randomIndexEng !== undefined &&
              randomIndexVie !== undefined &&
              word
            ) {
              console.log("check");
              console.log(word);
              word.eng = word.eng.split("(")[0];
              state.currentSplashCardDashBoard[randomIndexEng] = {
                data: word,
                isSelected: false,
                otherSideId: randomIndexVie,
                type: "En",
                isMatched: undefined,
              };
              state.currentSplashCardDashBoard[randomIndexVie] = {
                data: word,
                isSelected: false,
                otherSideId: randomIndexEng,
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
        }
        state.currentListSplash = state.currentListSplash.filter((sample) => {
          const lengthMatch = state.currentSplashCardDashBoard.filter(
            (c) => c.data === sample
          ).length;
          return lengthMatch === 0;
        });
      };

      addNewCard();

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
      const clearOldCurrentIdIfSameType = (type: "En" | "Vi") => {
        switch (type) {
          case "En":
            if (state.currentEnIndex !== undefined) {
              state.currentSplashCardDashBoard[
                state.currentEnIndex
              ].isSelected = false;
            }
            break;
          case "Vi":
            if (state.currrentViIndex !== undefined) {
              state.currentSplashCardDashBoard[
                state.currrentViIndex
              ].isSelected = false;
            }
            break;
        }
      };
      const id = action.payload;
      const currentCard = state.currentSplashCardDashBoard[id];
      if (currentCard.isSelected) {
        setCurrentIndex(currentCard.type, undefined);
        state.currentSplashCardDashBoard[id].isSelected = false;
      } else {
        clearOldCurrentIdIfSameType(currentCard.type);
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
            state.listSplashCardMatched.push(currentCard.data);
          } else {
            console.log("unmatch check");
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
