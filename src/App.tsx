import * as C from './App.styles';
import LogoImage from './assets/devmemory_logo.png';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import RestartIcon from './icons/restart.svg';

export function App() {
    const resetAndCreateGrid = () => {};
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
            <C.GridArea>...</C.GridArea>
        </C.Container>
    );
}
