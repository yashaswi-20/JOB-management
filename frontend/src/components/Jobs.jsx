import React from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const Jobs = () => {
    const dispatch = useDispatch();
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);

    const filteredJobs = allJobs.filter(job => {
        if (!searchedQuery) return true;
        const query = searchedQuery.toLowerCase();
        return (
            job?.title?.toLowerCase().includes(query) || 
            job?.description?.toLowerCase().includes(query) ||
            job?.location?.toLowerCase().includes(query) ||
            job?.company?.name?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="pt-32 px-6 max-w-7xl mx-auto w-full pb-20 flex-1">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground">
                        Explore Opportunities
                    </h1>
                    <p className="text-muted-foreground mt-3 font-light text-lg">
                        Find and apply to exactly what you are looking for.
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Filter Sidebar Placeholder */}
                    <div className="hidden lg:block w-64 shrink-0 space-y-6">
                        <div className="p-6 border border-border/50 rounded-2xl bg-card">
                            <h2 className="font-semibold text-lg mb-4 tracking-tight">Filter Jobs</h2>
                            <p className="text-sm text-muted-foreground">Filters coming soon...</p>
                        </div>
                    </div>

                    {/* Job Grid */}
                    <div className="flex-1">
                        {allJobs.length === 0 ? (
                            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-muted/5">
                                <p className="text-muted-foreground font-light mb-4 text-center px-4">
                                    No live jobs found right now. Check back later!
                                </p>
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-muted/5">
                                <p className="text-muted-foreground font-light mb-4 text-center px-4">
                                    No jobs found matching "{searchedQuery}".
                                </p>
                                <Button 
                                    variant="link" 
                                    onClick={() => dispatch(setSearchedQuery(""))}
                                    className="text-primary hover:underline"
                                >
                                    Clear Search
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredJobs.map((job) => (
                                    <Job key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Jobs;
