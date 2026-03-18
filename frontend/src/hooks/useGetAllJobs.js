import { setAllJobs } from "@/redux/jobSlice";
import api from "@/lib/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await api.get("/job/get", { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [dispatch])
}

export default useGetAllJobs;
