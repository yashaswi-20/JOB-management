import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: "",
        loading: false,
        currentPage: 1,
        totalPages: 1,
        totalCompanies: 0,
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setPagination: (state, action) => {
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalCompanies = action.payload.totalCompanies;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

export const { 
    setSingleCompany, 
    setCompanies, 
    setSearchCompanyByText, 
    setLoading, 
    setPagination, 
    setCurrentPage 
} = companySlice.actions;
export default companySlice.reducer;
