import ButtonIcon from './ButtonIcon'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import useDarkMode from '../context/useDarkMode'
import { useEffect } from 'react';

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <ButtonIcon onClick={toggleDarkMode}>
             { isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    )
}
