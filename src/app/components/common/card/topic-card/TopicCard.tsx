import React from "react";
import styled from "styled-components";
import { TopicCardProps } from "./interface";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  border: 2px solid #e0e0e0;
  &:hover {
    border: 2px solid #78b6fc;
    box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 1px -2px 18px 3px rgba(0, 0, 0, 0.1);
  }
`;
const Title = styled.div`
  font-family: "Utm Avo bold";
  font-size: large;
`;
const Content = styled.div`
  font-family: "Utm Avo";
  font-size: small;
`;

const TopicCard = ({ content, route, title }: TopicCardProps) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`${route}`)}>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Container>
  );
};

export default TopicCard;
