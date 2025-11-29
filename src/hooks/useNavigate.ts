import { useNavigate } from "react-router-dom";

export const useNavigator = () => {
    const navigate = useNavigate();
    const navigateTo = (path: string) => navigate(path);
    return navigateTo;
};