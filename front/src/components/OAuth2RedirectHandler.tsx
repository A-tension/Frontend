import { useLocation, useNavigate } from 'react-router-dom';
import {useEffect} from "react";

function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    const getUrlParameter = (name:string) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const accessToken = getUrlParameter('accessToken');
    const refreshToken = getUrlParameter('refreshToken');

    const error = getUrlParameter('error');

    useEffect(()=>{
        if (accessToken != null && refreshToken != null ) {
            console.log("accessToken : " + accessToken)
            console.log("refreshToken : " + refreshToken)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/');
            console.log("test")
        } else {
            navigate('/login', { state: { from: location, error: error } });
        }
    }, [])

    return null; // Since we're doing redirects, there's nothing to render
}

export default OAuth2RedirectHandler;