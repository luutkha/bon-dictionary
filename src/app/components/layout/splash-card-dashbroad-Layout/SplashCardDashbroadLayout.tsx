import { useAppDispatch } from '../../../redux/hooks';
import { updateCurrenrSplashCardDashBroad } from '../../../redux/slice/splash-card.slice';
import { useSplashCardStore } from '../../../redux/store';
import { SplashCard } from '../../common/card/flash-card/SplashCard';
import CustomModal from '../../modal/CustomModal';
import { Container, Item } from './SplashCardDashbroadLayout.styles';

type Props = {}

const SplashCardDashbroadLayout = (props: Props) => {
    const dispatch = useAppDispatch();
    const { listWords, currentSplashCardDashBoard, currentListSplash, listSplashCardMatched, targetSplashCardNeedToLearn } = useSplashCardStore();
    const handleCardClick = (id: number) => {
        dispatch(updateCurrenrSplashCardDashBroad(id));
    };
    const customModalOnPage = (
        <CustomModal >
            <>
                <h2 >Hello</h2>
                <button>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </>

        </CustomModal>
    )
    return (
        <div>
            {customModalOnPage}
            {targetSplashCardNeedToLearn !== listSplashCardMatched.length ?
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
                : 'done'}

        </div>
    )
}

export default SplashCardDashbroadLayout