import React, { memo } from "react";
import { Handle, Position } from "reactflow";

type Props = {
  data: {
    codigo: string;
    anio: number;
    ciclo: string;
    cuatrimestre: number;
    condicion: "carrera" | "electiva";
    materia: string;
    formato_didactico: string;
    ch_semanal: number;
    ch_cuatrimestral: number;
    creditos: number;
    correlativas: string | null;
    ch_presencial: number;
    ch_distancia: number;
    ch_total: number;
    descripcion: string;
  };
};

const CustomNode = ({ data }: Props) => {
  const getHoursString = () => {
    let msg = "";

    if (data.ch_presencial > 0) {
      msg += `${data.ch_presencial}hrs presenciales`;
    }

    if (data.ch_distancia > 0) {
      if (msg.length > 0) {
        msg += " + ";
      }
      msg += `${data.ch_distancia}hrs distancia`;
    }

    if (msg.length === 0) {
      msg = "Horas no especificadas";
    }

    return msg;
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <div className="ml-2">
          <div className="text-lg font-bold">
            {data.materia} {data.codigo && `(${data.codigo})`}
          </div>
          <div className="text-gray-500">
            Cuatrimestre {data.cuatrimestre} - {data.anio}° año -&nbsp;
            {data.creditos} créditos
          </div>
          <div className="text-gray-500">{getHoursString()}</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-purple-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-purple-500"
      />
    </div>
  );
};

export default memo(CustomNode);
