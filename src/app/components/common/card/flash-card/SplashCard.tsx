import React, { useEffect } from "react";
import { SplashCardProps } from "./interface";
import styled, { keyframes } from "styled-components";
import { DF_ENGLISH_CODE } from "../../../../constants/common";

export const SplashCard = ({
  data,
  type,
  isSelected,
  otherSideId,
  isMatched,
}: SplashCardProps) => {
  useEffect(() => { }, [isMatched]);

  return (
    <Container
      key={data.eng + isMatched}
      isSelected={isSelected}
      isMatched={isMatched}
    >
      <Content>{type === DF_ENGLISH_CODE ? data.eng : data.vie}</Content>
    </Container>
  );
};


const matchedAnimation = keyframes`
  0% {
  }
  50% {
    border: 2px solid #78b6fc;
    box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);

    border-top: 2px solid blueviolet;
    border-left: 2px solid blueviolet;
    border-bottom: 2px solid rgb(238, 103, 238);
    border-right: 2px solid rgb(238, 103, 238);
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px,
      rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px,
      rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
  }
  100% {
    opacity: 0;
    border: 2px solid #78b6fc;
    box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);

    border-top: 2px solid blueviolet;
    border-left: 2px solid blueviolet;
    border-bottom: 2px solid rgb(238, 103, 238);
    border-right: 2px solid rgb(238, 103, 238);
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px,
      rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px,
      rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
  }
 `;

const unMatchedAnimation = keyframes`
0%,10%,30%,50%,70% {
  border: 2px solid #78b6fc;
}

20%,40%,60%,80% {
  border: 2px solid red;

}  
100%{
  border: 2px solid #e0e0e0;
}
`;
const fadeOn = keyframes`
0%{
  opacity: 0;
}


100%{
  opacity: 1;
}
`;
const Container = styled.div<{
  isSelected: boolean;
  isMatched: boolean | undefined;
}>`
  width: 100%;
  max-width: 200px;
  padding: 20px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.isSelected === false ? `#e0e0e0` : `#78b6fc`)};

  animation-duration: 1.5s;
  animation-name: ${(props) =>
    props.isMatched === undefined
      ? fadeOn
      : props.isMatched === false
        ? unMatchedAnimation
        : matchedAnimation};
  pointer-events: ${(props) =>
    props.isMatched === undefined
      ? fadeOn
      : props.isMatched === false
        ? `none`
        : `none`};
  animation-fill-mode: forwards;
`;

const Content = styled.div`
  display: flex;
  font-family: "Utm Avo Bold";
  font-size: small;
  word-wrap: break-word;
  width: 100%;
  justify-content: center;
  align-items: center;
`;