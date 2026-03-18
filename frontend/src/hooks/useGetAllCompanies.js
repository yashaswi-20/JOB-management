import { setCompanies } from "@/redux/companySlice";
import api from "@/lib/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await api.get("/company/all", { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompanies();
    }, [dispatch])
}

export default useGetAllCompanies;
