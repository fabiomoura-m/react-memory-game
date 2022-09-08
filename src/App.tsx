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

    //verify if opened are equal
    useEffect(() => {
        if (shownCount === 2) {
            let opened = gridItems.filter(item => item.shown === true);
            if (opened.length === 2) {
                // if both are equal, make every "shown" permanent
                if (opened[0].item === opened[1].item) {
                    let templateGrid = [...gridItems];
                    for (let i in templateGrid) {
                        if (templateGrid[i].shown) {
                            templateGrid[i].permanentShown = true;
                            templateGrid[i].shown = false;
                        }
                    }
                    setGridItems(templateGrid);
                    setShownCount(0);
                } else {
                    // if they are not equal, close all "shown"
                    setTimeout(() => {
                        let templateGrid = [...gridItems];
                        for (let i in templateGrid) {
                            templateGrid[i].shown = false;
                        }
                        setGridItems(templateGrid);
                        setShownCount(0);
                    }, 1000);
                }

                setMoveCount(moveCount => moveCount + 1);
            }
        }
    }, [shownCount, gridItems]);

    //verify if game is over
    useEffect(() => {
        if (
            moveCount > 0 &&
            gridItems.every(item => item.permanentShown === true)
        ) {
            setPlaying(false);
        }
    }, [moveCount, gridItems]);

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

    const handleItemClick = (index: number) => {
        if (playing && index !== null && shownCount < 2) {
            let templateGrid = [...gridItems];

            if (
                templateGrid[index].permanentShown === false &&
                templateGrid[index].shown === false
            ) {
                templateGrid[index].shown = true;
                setShownCount(shownCount => shownCount + 1);
            }

            setGridItems(templateGrid);
        }
    };

    return (
        <>
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
                        <InfoItem
                            label="Movimentos"
                            value={moveCount.toString()}
                        />
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
            <C.Footer>Powered by Fabio Moura</C.Footer>
        </>
    );
}
