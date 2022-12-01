import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  /* grid-auto-rows: 1fr; */

  grid-template-columns: auto auto;
  padding: 10px;
  gap: 10px;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  /* height: 100%; */
  /* aspect-ratio: 1 / 1; */
`;
