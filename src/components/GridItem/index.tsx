import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import Background from '../../icons/background.svg';
import { items } from '../../data/items';

type Props = {
    item: GridItemType;
    onClick: () => void;
};

export function GridItem({ item, onClick }: Props) {
    return (
        <C.Containter
            showBackground={item.permanentShown || item.shown}
            onClick={onClick}
        >
            {item.permanentShown === false && item.shown === false && (
                <C.Icon src={Background} alt="" opacity={0.6} />
            )}
            {(item.permanentShown || item.shown) && item.item !== null && (
                <C.Icon src={items[item.item].icon} alt="" />
            )}
        </C.Containter>
    );
}
