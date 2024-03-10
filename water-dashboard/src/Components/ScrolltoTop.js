import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnNavigate() {
    const location = useLocation();

    useEffect(() => {
        var element = document.getElementById("sidebar");
        element?.classList?.toggle("active");
        window.scrollTo(0, 0);
    }, [location]);

    return null;
}


export default ScrollToTopOnNavigate;