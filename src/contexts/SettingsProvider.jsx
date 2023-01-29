import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const SettingsContext = createContext();

export const useSettings = () => {
    return useContext(SettingsContext);
}

const SettingsProvider = (props) => {
    const [showPriorNext, setShowPriorNext] = useState(true);

    const changePriorNext = () => {
        setShowPriorNext(!showPriorNext);
        storeSettings();
    }

    const storeSettings = () => {
        let settings = {
            showPriorNext: !showPriorNext
        };
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    const retrieveSettings = () => {
        let settings = JSON.parse(localStorage.getItem("settings"));
        return settings;
    }
    useEffect(() => {
        try {
            let settings = retrieveSettings();
            if (settings) {
                setShowPriorNext(settings.showPriorNext);
            }
            else {
                storeSettings();
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <SettingsContext.Provider value={{
            showPriorNext, changePriorNext
        }}>
            {props.children}
        </SettingsContext.Provider>
    );
}

export default SettingsProvider;