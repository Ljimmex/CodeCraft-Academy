"use client";

import React, { useMemo } from "react";

interface ActivityData {
    date: Date;
    count: number;
}

interface ActivityHeatmapProps {
    data: ActivityData[];
}

export default function ActivityHeatmap({ data }: ActivityHeatmapProps) {
    // Process data to ensure we have a full calendar year (Jan 1 - Dec 31)
    const { weeks, monthLabels } = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31);

        // Align start date to the previous Sunday to maintain the grid structure
        const startDate = new Date(startOfYear);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        // Create a map for quick lookup
        const dataMap = new Map(data.map((d) => [d.date.toDateString(), d.count]));

        const weeks: { date: Date; count: number }[][] = [];
        let iterationDate = new Date(startDate);

        // Generate weeks until we pass the end of the year
        // We want to ensure we cover the full year. 53 weeks is usually enough.
        // We continue adding weeks as long as the week's start date is before or within the year
        // OR if the week contains days from the year.
        while (iterationDate <= endOfYear || (weeks.length > 0 && weeks[weeks.length - 1][6].date < endOfYear)) {
            // Safety break to prevent infinite loops if logic fails
            if (weeks.length > 54) break;

            const week = [];
            for (let d = 0; d < 7; d++) {
                week.push({
                    date: new Date(iterationDate),
                    count: dataMap.get(iterationDate.toDateString()) || 0,
                });
                iterationDate.setDate(iterationDate.getDate() + 1);
            }
            weeks.push(week);
        }

        // Calculate month labels
        const monthLabels: { label: string; colIndex: number }[] = [];
        let lastMonth = -1;

        weeks.forEach((week, colIndex) => {
            const firstDayOfWeek = week[0].date;
            // Only consider months for the current year to avoid labels for previous year's days in the first row
            if (firstDayOfWeek.getFullYear() === currentYear) {
                const month = firstDayOfWeek.getMonth();
                if (month !== lastMonth) {
                    monthLabels.push({
                        label: firstDayOfWeek.toLocaleString("default", { month: "short" }),
                        colIndex,
                    });
                    lastMonth = month;
                }
            }
        });

        return { weeks, monthLabels };
    }, [data]);

    const getColor = (count: number) => {
        if (count === 0) return "bg-slate-100";
        if (count < 2) return "bg-emerald-200";
        if (count < 4) return "bg-emerald-400";
        return "bg-emerald-600";
    };

    return (
        <div className="w-full overflow-x-auto pb-4"> {/* Added pb-4 to prevent tooltip clipping at bottom */}
            <div className="min-w-max">
                {/* Month Labels */}
                <div className="flex text-xs text-slate-400 mb-2 h-4 relative">
                    {monthLabels.map((m, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: `${m.colIndex * 14}px` // 12px width + 2px gap
                            }}
                        >
                            {m.label}
                        </div>
                    ))}
                </div>

                {/* Heatmap Grid */}
                <div className="flex gap-[2px]">
                    {weeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-[2px]">
                            {week.map((day, dIndex) => {
                                // Determine tooltip position based on grid position
                                const isLeftEdge = wIndex < 5;
                                const isRightEdge = wIndex > 45;
                                const isTopEdge = dIndex < 2;

                                let tooltipPositionClass = "bottom-full mb-2 left-1/2 -translate-x-1/2"; // Default: Top Center
                                let arrowPositionClass = "-bottom-1 left-1/2 -translate-x-1/2"; // Default: Bottom Center

                                if (isLeftEdge) {
                                    tooltipPositionClass = "bottom-full mb-2 left-0"; // Top Left
                                    arrowPositionClass = "-bottom-1 left-1"; // Bottom Left
                                } else if (isRightEdge) {
                                    tooltipPositionClass = "bottom-full mb-2 right-0"; // Top Right
                                    arrowPositionClass = "-bottom-1 right-1"; // Bottom Right
                                }

                                if (isTopEdge) {
                                    // If too close to top, show tooltip BELOW the cell
                                    if (isLeftEdge) {
                                        tooltipPositionClass = "top-full mt-2 left-0"; // Bottom Left
                                        arrowPositionClass = "-top-1 left-1"; // Top Left
                                    } else if (isRightEdge) {
                                        tooltipPositionClass = "top-full mt-2 right-0"; // Bottom Right
                                        arrowPositionClass = "-top-1 right-1"; // Top Right
                                    } else {
                                        tooltipPositionClass = "top-full mt-2 left-1/2 -translate-x-1/2"; // Bottom Center
                                        arrowPositionClass = "-top-1 left-1/2 -translate-x-1/2"; // Top Center
                                    }
                                }

                                return (
                                    <div
                                        key={dIndex}
                                        className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-all duration-200 hover:scale-125 hover:ring-2 hover:ring-slate-300 relative group cursor-pointer hover:z-30`}
                                    >
                                        {/* Tooltip */}
                                        <div
                                            className={`absolute ${tooltipPositionClass} hidden group-hover:block z-50 whitespace-nowrap`}
                                        >
                                            <div className="bg-slate-900 text-white text-xs rounded py-1 px-2 shadow-xl">
                                                <div className="font-bold text-slate-300 mb-0.5">
                                                    {day.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                                <div className="font-medium">
                                                    {day.count === 0 ? "No contributions" : `${day.count} contributions`}
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div
                                                className={`w-2 h-2 bg-slate-900 rotate-45 absolute ${arrowPositionClass}`}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-4 justify-end pr-4">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
                        <div className="w-3 h-3 rounded-sm bg-emerald-200"></div>
                        <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
                        <div className="w-3 h-3 rounded-sm bg-emerald-600"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}
