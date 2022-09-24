import { useNavigate } from "react-router-dom";
import "./App.css";
import styled from "styled-components";

import { TopicCardProps } from "./app/components/common/card/topic-card/interface";
import TopicCard from "./app/components/common/card/topic-card/TopicCard";
const listCard: TopicCardProps[] = [
  {
    title: "Basic",
    content: "Learn 1000 words on basic level",
    route: "/basic",
  },
  {
    title: "Toeic",
    content: "Learn 1000 words of Toeic",
    route: "/toeic",
  },
  {
    title: "Other",
    content: "",
    route: "/other",
  },
];

const ListCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
function App() {
  return (
    <div className="App">
      <ListCardContainer>
        {listCard.map((card) => (
          <TopicCard {...card} />
        ))}
      </ListCardContainer>
    </div>
  );
}

export default App;
