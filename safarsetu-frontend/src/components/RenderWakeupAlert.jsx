import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Cloud, Clock, Zap } from "lucide-react";

export default function RenderWakeupAlert() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Alert Button */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-300 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors duration-200 shadow-sm cursor-pointer"
            >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
        </span>
                Backend may be sleeping
            </button>

            {/* Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    className: "!rounded-2xl !max-w-sm !w-full !mx-4",
                }}
            >
                <DialogTitle className="!pb-0 !pt-5 !px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-amber-100 rounded-lg">
                                <Cloud className="text-amber-600 w-4 h-4" />
                            </div>
                            <span className="text-base font-semibold text-gray-800">
                Service Waking Up
              </span>
                        </div>
                        <IconButton
                            size="small"
                            onClick={() => setOpen(false)}
                            className="!text-gray-400 hover:!text-gray-600"
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                </DialogTitle>

                <DialogContent className="!px-6 !pt-4 !pb-6">
                    {/* Info box */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                        <div className="flex gap-3">
                            <Clock className="text-amber-500 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-amber-800 mb-1">
                                    1–2 minute startup time
                                </p>
                                <p className="text-sm text-amber-700 leading-relaxed">
                                    The backend is hosted on{" "}
                                    <span className="font-semibold">Render's free tier</span>,
                                    which spins down after inactivity. Your first request may take
                                    a moment while the server wakes up.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="flex items-start gap-3 px-1">
                        <Zap className="text-blue-400 w-4 h-4 mt-0.5 shrink-0" />
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Subsequent requests will be fast once the service is running. Just
                            wait a moment and try again if something doesn't load right away.
                        </p>
                    </div>

                    {/* Dismiss button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="mt-5 w-full py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                        Got it
                    </button>
                </DialogContent>
            </Dialog>
        </>
    );
}