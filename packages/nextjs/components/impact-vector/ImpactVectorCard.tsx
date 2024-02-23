"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { trim } from "lodash";
import { MdCheck } from "react-icons/md";
import { useGlobalState } from "~~/services/store/store";

interface ImpactVectorCardProps {
  name: string;
  description: string;
  sourceName: string;
}
const ImpactVectorCard = ({ name, description, sourceName }: ImpactVectorCardProps) => {
  //the route is hard coded for now
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const { selectedVectors, setSelectedVectors } = useGlobalState();

  const handleAddVector = (vectorName: string) => {
    // Check if the vector is not already selected
    if (!selectedVectors.find(vector => vector.name === vectorName)) {
      const newSelectedVectors = [...selectedVectors, { name: vectorName, weight: 100 }];
      setSelectedVectors(newSelectedVectors);
    }
  };
  useEffect(() => {
    const selected = selectedVectors.find(vector => vector.name === name);
    setIsSelected(selected ? true : false);
  }, [selectedVectors]);

  return (
    <div
      onClick={() => router.push("/impact/1")}
      className="mr-1 cursor-pointer rounded-xl text-sm border-[0.2px] border-secondary-text/50 p-4 bg-base-300 flex flex-col justify-between gap-4 my-2"
    >
      <h2 className=" m-0 font-bold"> {trim(name.split(":")[1])}</h2>
      <div className="flex items-center justify-between">
        <div className=" text-base-content-100   ">
          <p className="m-0 p-0">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
        </div>
        {isSelected ? (
          <div
            onClick={e => e.stopPropagation()}
            className="flex items-center cursor-pointer  p-4 border border-[#7F56D9] rounded-lg"
          >
            <MdCheck size={24} className="text-[#7F56D9] w-5 h-5" />
          </div>
        ) : (
          <div className="">
            <button
              disabled={isSelected}
              onClick={e => {
                e.stopPropagation();
                handleAddVector(name);
              }}
              className="rounded-xl bg-primary hover:bg-red-600 p-4"
            >
              <Image
                className="w-5 h-5"
                src="assets/svg/folderPlusIcon.svg"
                alt="folder plus icon"
                width={24}
                height={24}
              />
            </button>
          </div>
        )}
      </div>
      <p className=" text-base-content-100  m-0">@{sourceName}</p>
    </div>
  );
};

export default ImpactVectorCard;
