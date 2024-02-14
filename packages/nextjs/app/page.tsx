"use client";

import { useEffect, useState } from "react";
import { DataSet } from "./types/data";
import type { NextPage } from "next";
import ImpactVectorDisplay from "~~/components/impact-vector/ImpactVectorDisplay";
import ImpactVectorGraph from "~~/components/impact-vector/ImpactVectorGraph";
import ImpactVectorTable from "~~/components/impact-vector/ImpactVectorTable";
import { SearchBar } from "~~/components/impact-vector/SearchBar";

const Home: NextPage = () => {
  const [selectedVectors, setSelectedVectors] = useState<{ name: string; weight: number }[]>([]);
  const [impactData, setImpactData] = useState<DataSet[]>([]);

  useEffect(() => {
    // Initialize selected vectors with two vectorsWeights
    setSelectedVectors([
      { name: "OSO: Total Stars", weight: 50 },
      { name: "OSO: Total Onchain Users", weight: 100 },
    ]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if there are any selected vectors
        if (selectedVectors.length === 0) {
          return;
        }

        // Check if all selected vectors have valid names and weights
        const isValidSelection = selectedVectors.every(vector => vector.name.trim() !== "" && !isNaN(vector.weight));

        if (!isValidSelection) {
          return;
        }

        const queryString = selectedVectors
          .map(vector => `vector=${encodeURIComponent(vector.name)}&weight=${vector.weight}`)
          .join("&");

        const apiUrl = `/api/impact?${queryString}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: DataSet[] = await response.json();
        setImpactData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedVectors]);

  return (
    <main className="max-w-[1700px] mx-auto w-full flex flex-col gap-2 b-md:flex-row p-2">
      <div className="w-full min-w-[55%]">
        <h2 className="text-center">Impact Calculator 🌱</h2>
        <div className="flex w-full h-3/5 pb-2">{impactData.length > 0 && <ImpactVectorGraph data={impactData} />}</div>
        {/* still a work in progress */}
        <div className="mt-4">
          <ImpactVectorTable />
        </div>
      </div>

      <div className="max-h-[100dvh] overflow-hidden b-md:max-w-[34rem] w-full rounded-3xl p-6 border grid gap-6 ">
        <div className="rounded-xl grid grid-cols-2 bg-base-300 p-1">
          <button className={` bg-base-100 font-bold  py-3 text- rounded-xl text-center w-full`}>Impact Vectors</button>
          <button className={`py-3 text-customGray rounded-xl text-center w-full`}>List</button>
        </div>
        <SearchBar />
        <ImpactVectorDisplay />
      </div>
    </main>
  );
};

export default Home;
