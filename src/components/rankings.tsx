"use client"

import dynamic from "next/dynamic";

const RankingSet = dynamic(() => import("./rankingSet"), { ssr: true });

const Rankings = () => {
    return (
        <div>
            <RankingSet />
        </div>
    );
};

export default Rankings;