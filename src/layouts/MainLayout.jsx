/* eslint-disable react/prop-types */
import MainNav from "./MainNav";
import MainFooter from "./MainFooter";
import { useEffect } from "react";
import color from '../theme/colors'

const MainLayout = ({children, title}) => {
    useEffect (() => {
        if(title){
            document.title = title;
        }
    }, [title]);


    return (
        <div style={{backgroundColor: color.platinum}}>
            <MainNav />
            {children}
            <MainFooter />
        </div>
    );
};

export default MainLayout;
