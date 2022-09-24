import dataFileToeic from "../../data/toeic.json";
import { Word } from "../../types/common.type";

const getDataFromToeicFileAction = (): Promise<Word[]> => {
  return Promise.resolve(
    dataFileToeic.filter((w) => w.spelling && w.vie && w.eng)
  );
};

export const splashCardService = {
  getDataFromToeicFileAction,
};
