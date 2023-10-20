import { useState, useEffect } from "react";
import { IMission } from "../Types/Types";

function useDataLoader(
  rocketName: string | null,
  missionStatus: string | null,
  upcoming: boolean
) {
  const [data, setData] = useState<IMission[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  console.log(total);
  useEffect(() => {
    setLoading(true);
    let uri = `https://api.spacexdata.com/v3/`;
    if (upcoming) {
      uri += `launches/upcoming`;
    } else {
      uri += `launches?limit=${pageSize}&offset=${(page - 1) * pageSize}&`;
    }
    if (rocketName) {
      uri += `rocket_name=${rocketName}&`;
    }
    if (missionStatus) {
      uri += `launch_success=${missionStatus}&`;
    }
    if (missionStatus) {
      uri += `upcoming=${upcoming}&`;
    }

    try {
      fetch(uri)
        .then((res) => res.json())
        .then((data) => {
          const formattedData = data.map((sMission: any) => {
            return {
              id: sMission.flight_number,
              mission_name: sMission.mission_name,
              rocket_name: sMission.rocket.rocket_name, // Check API response structure
              upcoming: sMission.upcoming,
              status: sMission.launch_success, // Check API response structure
              date: sMission.launch_date_local,
              photo: sMission.links.mission_patch_small,
            };
          });
          setData(formattedData);
          setTotal(data.length);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [rocketName, missionStatus, upcoming]);

  return { data, loading, total };
}

export default useDataLoader;
