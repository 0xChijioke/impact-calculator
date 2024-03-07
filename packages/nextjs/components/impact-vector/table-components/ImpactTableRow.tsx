"use client";

import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Vector } from "~~/app/types/data";
import { useGlobalState } from "~~/services/store/store";

interface Props {
  vector: Vector;
  updateWeight: (newWeight: number) => void;
}

const ImpactTableRow = ({ vector, updateWeight }: Props) => {
  const { selectedVectors, setSelectedVectors } = useGlobalState();
  const [weight, setWeight] = useState<number>(vector.weight);

  useEffect(() => {
    setWeight(vector.weight);
  }, [vector]);

  const handleRemoveVector = () => {
    const updatedSelectedVectors = selectedVectors.filter(existingVector => existingVector.name !== vector.name);
    setSelectedVectors(updatedSelectedVectors);
  };

  return (
    <tr key={vector.name}>
      <td className="py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm ">
        <div className="flex flex-col ">
          <span className="font-semibold">{vector.name.split(":")[1].substring(1)}</span>
          <span className="text-gray-500">{vector.name}</span>
        </div>
      </td>
      <td className="px-3 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-sm ">
        <div className="flex items-center justify-center gap-2">
          <input
            type="range"
            min={0}
            max="100"
            value={weight}
            className="range range-primary range-xs  w-full bg-[#F9F5FF] h-2"
            onChange={e => setWeight(parseInt(e.target.value, 10))}
            onMouseUp={() => updateWeight(weight)}
          />
          <span>{weight}</span>
        </div>
      </td>
      <td className="pr-2 lg:pr-6 py-2 sm:py-4 whitespace-nowrap ">
        <div className="grid gap-2 items-center justify-end grid-flow-col">
          <div className="flex gap-1 sm:gap-3 ">
            <button className="w-[20px]">
              <FiTrash2 size={20} onClick={handleRemoveVector} />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ImpactTableRow;
