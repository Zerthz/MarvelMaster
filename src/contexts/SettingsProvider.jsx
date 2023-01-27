import { useContext, useState } from "react";
import { createContext } from "react";

export const SettingsContext = createContext();

export const useSettings = () => {
    return useContext(SettingsContext);
}

const SettingsProvider = (props) => {
    const [showPriorNext, setShowPriorNext] = useState(true);

    const changePriorNext = () => {
        setShowPriorNext(!showPriorNext);
    }
    return (
        <SettingsContext.Provider value={{
            showPriorNext, changePriorNext
        }}>
            {props.children}
        </SettingsContext.Provider>
    );
}

export default SettingsProvider;