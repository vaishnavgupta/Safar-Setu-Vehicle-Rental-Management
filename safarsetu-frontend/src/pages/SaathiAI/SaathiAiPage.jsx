import React, { useState } from 'react';
import SaathiHero from './SaathiHero';
import TripForm from './TripForm';
import ResultCard from './ResultCard';
import LoadingSkeleton from './LoadingSkeleton';
import toast from "react-hot-toast";
import NavbarHome from "../Home/NavbarHome.jsx";
import {Toolbar} from "@mui/material";
import {getAISuggestion} from "../../services/saathiService..js";


const fetchSaathiRecommendation = async (formData) => {
    const data = {
        distanceKm: parseInt(formData.distanceKm),
        durationDays: parseInt(formData.durationDays),
        passengers: parseInt(formData.passengers),
        budget: parseFloat(formData.budget),
        tripType: formData.tripType,
        luggageRequired: formData.luggageRequired
    }
    const response = await getAISuggestion(data);
    return response.data;
};


const INITIAL_FORM = {
    distanceKm: '',
    durationDays: '',
    passengers: '',
    budget: '',
    tripType: 'CITY',
    luggageRequired: false,
};

const SaathiAiPage = () => {
    const [form, setForm] = useState(INITIAL_FORM);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setResult(null);
        try {
            const data = await fetchSaathiRecommendation(form);
            setResult(data);
        } catch (err) {
            console.error('Saathi AI error:', err);
            toast.error("Error Using Saathi AI")
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setForm(INITIAL_FORM);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <NavbarHome />
            <Toolbar />

            {/* Hero */}
            <SaathiHero />

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div
                    className={`grid gap-8 transition-all duration-500 ${
                        result || loading ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-2xl mx-auto'
                    }`}
                >
                    {/* Left: Form */}
                    <div>
                        <TripForm
                            form={form}
                            onChange={setForm}
                            onSubmit={handleSubmit}
                            loading={loading}
                        />

                        {/* Reset button shown after result */}
                        {result && (
                            <button
                                onClick={handleReset}
                                className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                            >
                                ↺ &nbsp; Start a new search
                            </button>
                        )}
                    </div>

                    {/* Right: Loading skeleton or Result */}
                    {loading && <LoadingSkeleton />}
                    {result && !loading && <ResultCard result={result} formData={form} />}
                </div>

                {/* Features strip */}
                {!result && !loading && (
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
                        {[
                            { icon: '🧠', title: 'Smart Matching', desc: 'AI analyses your trip profile and maps it to the best-fit vehicle in our fleet.' },
                            { icon: '💸', title: 'Budget Aware', desc: 'Saathi always stays within your budget and shows you the real estimated cost upfront.' },
                            { icon: '⚡', title: 'Instant Results', desc: 'Get a recommendation in seconds — no browsing, no comparing, just book.' },
                        ].map((f) => (
                            <div
                                key={f.title}
                                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                            >
                                <div className="text-3xl mb-3">{f.icon}</div>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SaathiAiPage;
