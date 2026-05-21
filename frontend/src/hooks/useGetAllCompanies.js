import { setAdminCompanies, setLoading, setPagination } from "@/redux/companySlice";
import api from "@/lib/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const { currentPage } = useSelector(store => store.company);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                dispatch(setLoading(true));
                const res = await api.get(`/company/get?page=${currentPage}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAdminCompanies(res.data.companies));
                    dispatch(setPagination({
                        currentPage: res.data.currentPage,
                        totalPages: res.data.totalPages,
                        totalCompanies: res.data.totalCompanies
                    }));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchCompanies();
    }, [dispatch, currentPage])
}

export default useGetAllCompanies;
