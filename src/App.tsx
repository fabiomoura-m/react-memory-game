import { useEffect, useState } from 'react';
import * as C from './App.styles';
import LogoImage from './assets/devmemory_logo.png';
import { Button } from './components/Button';
import { GridItem } from './components/GridItem';
import { InfoItem } from './components/InfoItem';
import { items } from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
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

    useEffect(() => {
        const timer = setInterval(() => {
            if (playing) {
                setTimeElapsed(state => state + 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [playing]);

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
        for (let w = 0; w < 2; w++) {
            for (let i = 0; i < items.length; i++) {
                let position = -1;
                while (position < 0 || temporaryGrid[position].item !== null) {
                    position = Math.floor(Math.random() * (items.length * 2));
                }
                temporaryGrid[position].item = i;
            }
        }

        // 2.3 - move to state
        setGridItems(temporaryGrid);

        // step 3 - start game
        setPlaying(true);
    };

    const handleItemClick = (index): number => {};

    return (
        <C.Container>
            <C.Info>
                <C.LogoLink href="">
                    <img src={LogoImage} alt="" width={200} />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem
                        label="Tempo"
                        value={formatTimeElapsed(timeElapsed)}
                    />
                    <InfoItem label="Movimentos" value="0" />
                </C.InfoArea>

                <Button
                    label="Reiniciar"
                    icon={RestartIcon}
                    onClick={resetAndCreateGrid}
                />
            </C.Info>
            <C.GridArea>
                <C.Grid>
                    {gridItems.map((item, index) => (
                        <GridItem
                            key={Math.random()}
                            item={item}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </C.Grid>
            </C.GridArea>
        </C.Container>
    );
}
