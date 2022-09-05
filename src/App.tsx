import { useEffect, useState } from 'react';
import * as C from './App.styles';
import LogoImage from './assets/devmemory_logo.png';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { items } from './data/items';
import RestartIcon from './icons/restart.svg';
import { GridItemType } from './types/GridItemType';

export function App() {
    const [playing, setPlaying] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [moveCount, setMoveCount] = useState<number>(0);
    const [shownCount, setShownCount] = useState<number>(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([]);

    useEffect(() => {
        resetAndCreateGrid();
    }, []);

    const resetAndCreateGrid = () => {
        // step 1 - reset the game
        setTimeElapsed(0);
        setMoveCount(0);
        setShownCount(0);

        // step 2 - create grid
        // 2.1 - create empty grid
        let temporaryGrid: GridItemType[] = [];
        for (let i = 0; i < items.length * 2; i++) {
            temporaryGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            });
        }
        // 2.2 - fill the grid

        // 2.3 - move to state
        setGridItems(temporaryGrid);

        // step 3 - start game
        setPlaying(true);
    };

    return (
        <C.Container>
            <C.Info>
                <C.LogoLink href="">
                    <img src={LogoImage} alt="" width={200} />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem label="Tempo" value="00:00" />
                    <InfoItem label="Movimentos" value="0" />
                </C.InfoArea>

                <Button
                    label="Reiniciar"
                    icon={RestartIcon}
                    onClick={resetAndCreateGrid}
                />
            </C.Info>
            <C.GridArea>
                <C.Grid></C.Grid>
            </C.GridArea>
        </C.Container>
    );
}
